import { NextResponse } from "next/server";

const STATUS_STEPS = {
  "En Cola": 1,
  "En Proceso": 2,
  "Listo para Recojo": 4,
  Entregado: 5,
  Cancelado: 5,
};

const STATUS_NAMES = {
  1: "Pedido recibido",
  2: "En proceso",
  3: "Control de calidad",
  4: "Listo para recoger",
  5: "Entregado",
};

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function formatDate(value, fallback = "Pendiente") {
  if (!value) return fallback;

  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium",
    timeZone: "America/Lima",
  }).format(new Date(value));
}

function buildHistory(order, currentStep) {
  const events = [
    { step: 1, date: order.creado_en, desc: "Orden registrada en el sistema." },
    { step: 2, date: order.iniciado_en, desc: "El laboratorio inició el trabajo de la orden." },
    { step: 3, date: order.completado_en, desc: "La orden pasó por control de calidad." },
    { step: 4, date: order.completado_en, desc: "Disponible para recojo en tienda." },
    { step: 5, date: null, desc: "Entrega final registrada en tienda." },
  ];

  return events.map((event) => ({
    step: event.step,
    name: STATUS_NAMES[event.step],
    date: event.date ? formatDate(event.date) : event.step > currentStep ? "Pendiente" : "Pendiente de actualización",
    desc: event.desc,
  }));
}

function mapOrder(order) {
  const currentStep = STATUS_STEPS[order.estado] || 1;
  const sale = order.ventas || {};
  const patient = sale.pacientes || {};
  const branch = sale.sucursales || {};

  return {
    code: order.numero_ticket,
    customer: [patient.nombres, patient.apellido_paterno, patient.apellido_materno].filter(Boolean).join(" ") || "Cliente registrado",
    receivedDate: formatDate(order.creado_en),
    estimatedDate: formatDate(sale.fecha_entrega, "Por confirmar"),
    service: [sale.montura_descripcion, sale.luna_descripcion].filter(Boolean).join(" + ") || "Servicio óptico registrado",
    branch: branch.direccion || "Sede de entrega por confirmar",
    currentStep,
    history: buildHistory(order, currentStep),
  };
}

export async function GET(request, { params }) {
  const code = (await params).code?.trim().toUpperCase();

  if (!code || !/^[-A-Z0-9]{3,30}$/.test(code)) {
    return NextResponse.json({ error: "Código de seguimiento inválido." }, { status: 400 });
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return NextResponse.json({ error: "Supabase no está configurado en el entorno de Next.js." }, { status: 503 });
  }

  const query = new URL("/rest/v1/ordenes_laboratorio", SUPABASE_URL);
  query.searchParams.set(
    "select",
    "numero_ticket,estado,creado_en,iniciado_en,completado_en,ventas(numero_ticket,fecha_entrega,montura_descripcion,luna_descripcion,pacientes(nombres,apellido_paterno,apellido_materno),sucursales(direccion))"
  );
  query.searchParams.set("numero_ticket", `eq.${code}`);
  query.searchParams.set("limit", "1");

  try {
    const response = await fetch(query, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "No se pudo consultar Supabase." }, { status: 502 });
    }

    const orders = await response.json();
    if (!orders.length) {
      return NextResponse.json({ error: "No encontramos ese código." }, { status: 404 });
    }

    return NextResponse.json(mapOrder(orders[0]), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Supabase local no está disponible." }, { status: 503 });
  }
}