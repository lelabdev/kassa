/// <reference lib="webworker" />
declare let self: ServiceWorkerGlobalScope;

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheExpiration } from 'workbox-expiration';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache manifest is injected by vite-plugin-pwa
precacheAndRoute(self.__WB_MANIFEST);

// Cache images with CacheFirst strategy
registerRoute(
	({ request }) => request.destination === 'image',
	new CacheFirst({
		cacheName: 'images',
		plugins: [new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 })]
	})
);

// Cache fonts with CacheFirst strategy
registerRoute(
	({ request }) => request.destination === 'font',
	new CacheFirst({
		cacheName: 'fonts',
		plugins: [new ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 })]
	})
);

// Cache CSS and JS with StaleWhileRevalidate
registerRoute(
	({ request }) => request.destination === 'style' || request.destination === 'script',
	new StaleWhileRevalidate({
		cacheName: 'static-resources'
	})
);

// Network first for documents (pages) to ensure fresh content
registerRoute(
	({ request }) => request.mode === 'navigate',
	new NetworkFirst({
		cacheName: 'pages',
		plugins: [new ExpirationPlugin({ maxAgeSeconds: 60 * 60 * 24 })]
	})
);

// Listen for messages from the app
self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});

// Clean up old caches on activate
self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const cacheNames = await caches.keys();
			const cacheWhitelist = ['images', 'fonts', 'static-resources', 'pages'];
			await Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			);
		})()
	);
});
