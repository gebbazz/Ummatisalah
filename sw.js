const CACHE = 'ummahsalah-v15-20261126-0705';
const CORE = ['./', './index.html', './manifest.json', './version.json', './icon-512.jpg'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      Promise.all(CORE.map((u) => c.add(new Request(u, { cache: 'reload' })).catch(() => {})))
    )
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  if (u.origin !== self.location.origin) return;
  if (
    e.request.mode === 'navigate' ||
    u.pathname === '/' ||
    u.pathname.endsWith('/index.html') ||
    u.pathname.endsWith('/manifest.json') ||
    u.pathname.endsWith('/version.json')
  ) {
    e.respondWith(
      fetch(new Request(e.request.url, { cache: 'no-store' }))
        .then((r) => {
          if (r && r.ok) {
            const cl = r.clone();
            caches.open(CACHE).then((c) => c.put(e.request, cl));
          }
          return r;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }
  e.respondWith(caches.match(e.request).then((cached) => cached || fetch(e.request)));
});
