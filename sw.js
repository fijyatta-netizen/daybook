/* Daybook offline support: keeps a copy of the app on the phone so it opens with no connection.
   Your log entries are never sent anywhere; they stay in the phone's storage. */
const CACHE = 'daybook-v20';
const FILES = [
  './', './index.html', './manifest.webmanifest',
  './fonts/bricolage.woff2', './fonts/atkinson-400.woff2', './fonts/atkinson-700.woff2', './fonts/plexmono-500.woff2',
  './icons/j-180.png', './icons/j-192.png', './icons/j-512.png', './icons/j-maskable-512.png', './apple-touch-icon.png', './apple-touch-icon-precomposed.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    /* app page: use the network when there is one (to pick up updates), otherwise the saved copy */
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return res; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })));
});
