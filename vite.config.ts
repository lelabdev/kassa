import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { sveltekit } from '@sveltejs/kit/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// Plugin to fix service worker accessibility on Cloudflare
// Remove /sw.js from route exclusions so it's handled by the Worker
const fixCloudflareServiceWorkerPlugin = {
	name: 'fix-cloudflare-sw',
	apply: 'build',
	async closeBundle() {
		try {
			const routesPath = resolve('.svelte-kit/cloudflare/_routes.json');
			const routes = JSON.parse(readFileSync(routesPath, 'utf-8'));

			// Remove /sw.js from exclusions so it's handled by the Worker
			routes.exclude = routes.exclude.filter((pattern) => pattern !== '/sw.js');

			writeFileSync(routesPath, JSON.stringify(routes, null, '\t'));
			console.log('✓ Fixed Cloudflare _routes.json to include /sw.js');
		} catch (error) {
			console.warn('⚠ Could not fix Cloudflare _routes.json:', error);
		}
	}
};

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		devtoolsJson(),
		fixCloudflareServiceWorkerPlugin,
		VitePWA({
			strategies: 'generateSW',
			manifest: {
				name: 'Kassa',
				short_name: 'Kassa',
				description: 'Mobile-first POS app for small fruit and vegetable vendors',
				theme_color: '#000000',
				background_color: '#ffffff',
				display: 'standalone',
				scope: '/',
				start_url: '/',
				orientation: 'portrait-primary',
				icons: [
					{
						src: '/favicon.svg',
						sizes: 'any',
						type: 'image/svg+xml',
						purpose: 'any'
					},
					{
						src: '/favicon.svg',
						sizes: 'any',
						type: 'image/svg+xml',
						purpose: 'maskable'
					}
				],
				categories: ['productivity', 'business']
			},
			workbox: {
				globPatterns: ['client/**/*.{js,css,html}', 'prerendered/**/*.html'],
				runtimeCaching: [
					{
						urlPattern: ({ request }) =>
							request.destination === 'image' || request.destination === 'font',
						handler: 'CacheFirst',
						options: {
							cacheName: 'assets-cache',
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 60 * 60 * 24 * 30
							}
						}
					},
					{
						urlPattern: ({ request }) => request.destination === 'document',
						handler: 'NetworkFirst',
						options: {
							cacheName: 'document-cache',
							expiration: {
								maxAgeSeconds: 60 * 60 * 24
							}
						}
					}
				]
			},
			devOptions: {
				enabled: true,
				type: 'module'
			}
		})
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
