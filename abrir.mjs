import { spawn } from 'node:child_process';
import { preview } from 'vite';

const server = await preview({ preview: { host: '127.0.0.1', port: 4173, open: false } });
const url = server.resolvedUrls.local[0];
console.log('Nuestro pequeño universo: ' + url);
console.log('Cierra esta ventana para detener la vista previa.');
if (!process.argv.includes('--sin-navegador')) {
  const browser = spawn('explorer.exe', [url], { stdio: 'ignore' });
  browser.on('error', () => console.log('Abre la dirección anterior en tu navegador.'));
}
