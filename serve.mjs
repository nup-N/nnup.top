import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.mjs': 'application/javascript' };
http.createServer((req, res) => {
  const fp = path.join(__dirname, req.url === '/' ? 'index.html' : decodeURIComponent(req.url));
  const ct = mime[path.extname(fp)] || 'text/plain';
  fs.readFile(fp, (e, d) => { res.writeHead(e ? 404 : 200, { 'Content-Type': ct }); res.end(e ? 'Not found' : d); });
}).listen(8000, '127.0.0.1', () => console.log('Dev server on http://127.0.0.1:8000'));
