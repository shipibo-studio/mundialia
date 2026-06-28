const CACHE_NAME = "mundialia-v1";

// Recursos a precachear al instalar
const PRECACHE_URLS = [
  "/",
  "/manifest.json",
  "/icons/icon.svg",
];

// Al instalar el SW, precacheamos recursos críticos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Al activar, limpiamos caches viejos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Estrategia: Network First con fallback a cache
self.addEventListener("fetch", (event) => {
  // Solo interceptamos GET requests
  if (event.request.method !== "GET") return;

  // No cacheamos requests de API ni datos dinámicos
  const url = new URL(event.request.url);
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/_next/") ||
    url.pathname.includes("tailwind")
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cacheamos respuestas válidas
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, servimos desde cache
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          // Fallback: servir la página principal para navegación
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
          return new Response("Offline", { status: 503 });
        });
      })
  );
});
