import { readFileSync } from 'fs';
import { join } from 'path';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve: svelteResolve }) => {
	// In development, serve the service worker and workbox files from dev-dist
	const pathname = event.url.pathname;

	if (pathname === '/sw.js' || pathname.match(/^\/workbox-.+\.js$/)) {
		const filename = pathname.slice(1); // Remove leading /
		const filePath = join(process.cwd(), 'dev-dist', filename);

		try {
			const content = readFileSync(filePath, 'utf-8');
			return new Response(content, {
				headers: {
					'Content-Type': 'application/javascript; charset=utf-8',
					'Service-Worker-Allowed': '/',
					'Cache-Control': 'no-cache'
				}
			});
		} catch (error) {
			console.log(`Could not find ${filename}:`, error);
			// File not found, continue to SvelteKit
		}
	}

	return svelteResolve(event);
};
