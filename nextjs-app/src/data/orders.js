/* ==========================================================================
   LENS GROUP TRUJILLO — ORDER TRACKING DATA
   ========================================================================== */

export const WHATSAPP_STORE_PHONE = '51958169535';

export const ORDERS_DB = {
  'LGT-2025-0342': {
    code: 'LGT-2025-0342',
    customer: 'Carlos Mendoza Quispe',
    receivedDate: '08 de Marzo, 2026',
    estimatedDate: '10 de Marzo, 2026',
    service: 'Montura Ray-Ban Round Metal + Cristales Antirreflejo Blue Protect UV400',
    branch: 'Galería San Antonio, Jr. Gamarra N° 778, Trujillo 13001',
    currentStep: 4,
    statusTitle: '¡Listo para Recoger en Tienda!',
    statusBadgeText: 'Listo para Recoger',
    statusBadgeClass: 'state-badge-ready',
    statusBoxClass: 'status-box-ready',
    statusDesc: '¡Excelentes noticias! Tus lentes han sido minuciosamente calibrados y pasaron el control de calidad oftálmico. Ya se encuentran en nuestro mostrador listos para tu entrega y ajuste facial personalizado.',
    showPickupBanner: true,
    history: [
      { step: 1, name: 'Pedido recibido', date: '08 Mar - 10:30 AM', desc: 'Receta registrada en sistema y montura asignada.' },
      { step: 2, name: 'En proceso', date: '08 Mar - 03:15 PM', desc: 'Tallado digital y biselado de cristales en laboratorio.' },
      { step: 3, name: 'Control de calidad', date: '09 Mar - 04:30 PM', desc: 'Certificación UV400, antirreflejo y montaje preciso.' },
      { step: 4, name: 'Listo para recoger', date: '10 Mar - 09:00 AM', desc: 'Disponible en tienda para prueba y ajuste anatómico.' },
      { step: 5, name: 'Entregado', date: 'Pendiente de recojo', desc: 'Entrega final con paño de microfibra y garantía oficial.' }
    ]
  },
  'LGT-2025-0210': {
    code: 'LGT-2025-0210',
    customer: 'Roberto Castillo Díaz',
    receivedDate: '09 de Marzo, 2026',
    estimatedDate: '11 de Marzo, 2026',
    service: 'Cristales Fotocromáticos Transition Gen 8 + Montura Titanio Flexible',
    branch: 'Galería San Antonio, Jr. Gamarra N° 778, Trujillo 13001',
    currentStep: 3,
    statusTitle: 'En Control de Calidad Oftálmico',
    statusBadgeText: 'Control de Calidad',
    statusBadgeClass: 'state-badge-progress',
    statusBoxClass: 'status-box-progress',
    statusDesc: 'Tus cristales fotosensibles están en etapa de pruebas de activación solar, verificación de dioptrías y chequeo de eje óptico con lensómetro digital de alta precisión.',
    showPickupBanner: false,
    history: [
      { step: 1, name: 'Pedido recibido', date: '09 Mar - 11:00 AM', desc: 'Receta oftalmológica validada por optómetra.' },
      { step: 2, name: 'En proceso', date: '09 Mar - 05:20 PM', desc: 'Biselado de precisión computarizado finalizado.' },
      { step: 3, name: 'Control de calidad', date: '10 Mar - 10:15 AM', desc: 'Pruebas de filtrado UV y alineación de montura.' },
      { step: 4, name: 'Listo para recoger', date: 'Estimado: 11 Mar', desc: 'Pronto notificaremos su disponibilidad.' },
      { step: 5, name: 'Entregado', date: 'Pendiente', desc: 'Garantía oficial y certificado de autenticidad.' }
    ]
  },
  'LGT-2025-0105': {
    code: 'LGT-2025-0105',
    customer: 'Mariana Paredes Silva',
    receivedDate: '09 de Marzo, 2026',
    estimatedDate: '12 de Marzo, 2026',
    service: 'Lunas Progresivas Digitales FreeForm + Montura Vogue Eyewear',
    branch: 'Galería San Antonio, Jr. Gamarra N° 778, Trujillo 13001',
    currentStep: 2,
    statusTitle: 'En Proceso de Fabricación',
    statusBadgeText: 'En Fabricación',
    statusBadgeClass: 'state-badge-progress',
    statusBoxClass: 'status-box-progress',
    statusDesc: 'Tus lunas progresivas multifocales se encuentran en tallado punto a punto con tecnología FreeForm de alta definición para una visión nítida a toda distancia.',
    showPickupBanner: false,
    history: [
      { step: 1, name: 'Pedido recibido', date: '09 Mar - 04:00 PM', desc: 'Toma de medidas pupilares y registro de receta.' },
      { step: 2, name: 'En proceso', date: '10 Mar - 08:30 AM', desc: 'Tallado de curvas progresivas en laboratorio.' },
      { step: 3, name: 'Control de calidad', date: 'Estimado: 11 Mar', desc: 'Inspección de campos visuales y tratamientos.' },
      { step: 4, name: 'Listo para recoger', date: 'Estimado: 12 Mar', desc: 'Listo en Galería San Antonio, Jr. Gamarra 778.' },
      { step: 5, name: 'Entregado', date: 'Pendiente', desc: 'Acompañamiento en proceso de adaptación visual.' }
    ]
  },
  'LGT-2025-0450': {
    code: 'LGT-2025-0450',
    customer: 'Andrea Fernández Ruiz',
    receivedDate: '10 de Marzo, 2026',
    estimatedDate: '13 de Marzo, 2026',
    service: 'Gafas de Sol Oakley Polarizadas con Graduación Espejada',
    branch: 'Galería San Antonio, Jr. Gamarra N° 778, Trujillo 13001',
    currentStep: 1,
    statusTitle: 'Pedido Recibido en Óptica',
    statusBadgeText: 'Pedido Recibido',
    statusBadgeClass: 'state-badge-progress',
    statusBoxClass: 'status-box-progress',
    statusDesc: 'Hemos recepcionado tu prescripción médica y la montura seleccionada. Se ha generado la orden de trabajo para ingresar al laboratorio óptico.',
    showPickupBanner: false,
    history: [
      { step: 1, name: 'Pedido recibido', date: '10 Mar - 09:45 AM', desc: 'Orden confirmada y materiales solicitados.' },
      { step: 2, name: 'En proceso', date: 'Estimado: 11 Mar', desc: 'Tallado y polarizado de cristales solares.' },
      { step: 3, name: 'Control de calidad', date: 'Estimado: 12 Mar', desc: 'Test de transmisión lumínica y protección UV.' },
      { step: 4, name: 'Listo para recoger', date: 'Estimado: 13 Mar', desc: 'Aviso por WhatsApp para recojo.' },
      { step: 5, name: 'Entregado', date: 'Pendiente', desc: 'Entrega con estuche original y garantía de fábrica.' }
    ]
  },
  'LGT-2025-0500': {
    code: 'LGT-2025-0500',
    customer: 'Jorge Luis Vásquez',
    receivedDate: '04 de Marzo, 2026',
    estimatedDate: '07 de Marzo, 2026',
    service: 'Montura Ultraligera de Titanio + Cristales Monofocales Crizal',
    branch: 'Galería San Antonio, Jr. Gamarra N° 778, Trujillo 13001',
    currentStep: 5,
    statusTitle: 'Pedido Entregado con Éxito',
    statusBadgeText: 'Entregado',
    statusBadgeClass: 'state-badge-done',
    statusBoxClass: 'status-box-done',
    statusDesc: '¡Tu orden ha sido entregada con éxito en nuestra sede! Recuerda que cuentas con 1 año de garantía oficial y mantenimiento preventivo gratuito de por vida (ajuste de tornillos y limpieza ultrasónica).',
    showPickupBanner: false,
    history: [
      { step: 1, name: 'Pedido recibido', date: '04 Mar - 11:15 AM', desc: 'Orden registrada.' },
      { step: 2, name: 'En proceso', date: '05 Mar - 02:30 PM', desc: 'Laboratorio y biselado.' },
      { step: 3, name: 'Control de calidad', date: '06 Mar - 11:00 AM', desc: 'Inspección aprobada.' },
      { step: 4, name: 'Listo para recoger', date: '07 Mar - 10:00 AM', desc: 'Notificado al cliente.' },
      { step: 5, name: 'Entregado', date: '07 Mar - 06:40 PM', desc: 'Entregado con conformidad en tienda.' }
    ]
  }
};

export const STEP_ICONS = {
  1: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  2: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
  3: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`,
  4: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
  5: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
};

export const CHECK_ICON = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
