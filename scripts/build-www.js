// Copies the web app into www/ so the iPhone app gets the same files GitHub Pages serves.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), out = path.join(root, 'www');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);
const files = ['index.html', 'manifest.webmanifest', 'apple-touch-icon.png', 'apple-touch-icon-precomposed.png'];
for (const f of files) fs.copyFileSync(path.join(root, f), path.join(out, f));
// app only: add Capacitor's script (gives the page registerPlugin for notifications, storage, sharing, Strava login)
fs.copyFileSync(path.join(root, 'node_modules/@capacitor/core/dist/capacitor.js'), path.join(out, 'capacitor.js'));
const page = path.join(out, 'index.html');
let html = fs.readFileSync(page, 'utf8');
const at = html.indexOf('<script>', html.indexOf('</style>'));
if (at < 0) throw new Error('main script not found');
html = html.slice(0, at) + '<script src="capacitor.js"></script>\n' + html.slice(at);
fs.writeFileSync(page, html);
for (const dir of ['fonts', 'icons']) fs.cpSync(path.join(root, dir), path.join(out, dir), { recursive: true });
console.log('Built www/ for the app');
