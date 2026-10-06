import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 8080;
const ORDERS_FILE = path.join(process.cwd(), 'orders.json');
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

function readOrders() {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
  } catch (error) {
    return {};
  }
}

function writeOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch (error) { reject(error); }
    });
    req.on('error', reject);
  });
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (requestUrl.pathname === '/api/admin/login') {
    if (req.method === 'OPTIONS') return sendJson(res, 204, {});
    if (req.method === 'POST') {
      readRequestBody(req).then((creds) => {
        const u = String(creds.username || creds.dni || '').trim().toLowerCase();
        const p = String(creds.password || creds.pin || '').trim();
        if ((u === 'admin' || u === 'optometrista' || u === '12345678') && (p === 'lensgroup2026' || p === '2026' || p === 'admin')) {
          return sendJson(res, 200, {
            success: true,
            user: {
              name: u === 'admin' ? 'Gerencia General' : 'Dr. Optómetra Trujillo',
              role: u === 'admin' ? 'Director Ejecutivo' : 'Especialista en Refracción',
              branch: 'Galería San Antonio, Jr. Gamarra N° 778'
            }
          });
        }
        return sendJson(res, 401, { error: 'Credenciales inválidas. Usa el usuario demo o tu PIN autorizado.' });
      }).catch(() => sendJson(res, 400, { error: 'Formato inválido.' }));
      return;
    }
  }

  if (requestUrl.pathname === '/api/orders' || requestUrl.pathname.startsWith('/api/orders/')) {
    if (req.method === 'OPTIONS') return sendJson(res, 204, {});
    if (req.method === 'GET') return sendJson(res, 200, readOrders());

    if (req.method === 'PATCH' || req.method === 'PUT') {
      readRequestBody(req).then((data) => {
        const code = data.code || requestUrl.pathname.replace('/api/orders/', '').trim();
        if (!code) return sendJson(res, 400, { error: 'Se requiere código de orden.' });
        const orders = readOrders();
        if (!orders[code]) return sendJson(res, 404, { error: 'Orden no encontrada.' });
        orders[code] = { ...orders[code], ...data };
        writeOrders(orders);
        return sendJson(res, 200, orders[code]);
      }).catch(() => sendJson(res, 400, { error: 'Error procesando datos.' }));
      return;
    }

    readRequestBody(req).then((order) => {
      if (!order.code) return sendJson(res, 400, { error: 'El pedido necesita un código.' });
      const orders = readOrders();
      orders[order.code] = order;
      writeOrders(orders);
      sendJson(res, 200, order);
    }).catch(() => sendJson(res, 400, { error: 'Datos de pedido inválidos.' }));
    return;
  }

  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  const resolveFilePath = (targetPath) => {
    const candidate = path.join(process.cwd(), targetPath);
    const ext = path.extname(candidate).toLowerCase();
    if (ext) return candidate;

    const htmlCandidate = `${candidate}.html`;
    if (fs.existsSync(htmlCandidate)) return htmlCandidate;
    return candidate;
  };

  const filePath = resolveFilePath(reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const fallbackPath = path.join(process.cwd(), `${reqPath}.html`);
      fs.stat(fallbackPath, (fallbackErr, fallbackStats) => {
        if (fallbackErr || !fallbackStats.isFile()) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('404 Not Found');
          return;
        }

        const ext = path.extname(fallbackPath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
        });

        fs.createReadStream(fallbackPath).pipe(res);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
