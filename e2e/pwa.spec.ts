import { test, expect } from '@playwright/test';

test.describe('PWA Service Worker', () => {
	test('should register service worker on load', async ({ page, context }) => {
		// Navigate to the app
		await page.goto('/');

		// Check service worker registration
		const swRegistration = await page.evaluate(() => {
			if ('serviceWorker' in navigator) {
				return navigator.serviceWorker.getRegistrations().then((registrations) => {
					return registrations.length > 0;
				});
			}
			return false;
		});

		expect(swRegistration).toBe(true);
	});

	test('should have manifest available', async ({ page }) => {
		await page.goto('/');

		const response = await page.request.get('/manifest.json');
		expect(response.ok()).toBe(true);

		const manifest = await response.json();
		expect(manifest.name).toBe('Kassa');
		expect(manifest.display).toBe('standalone');
	});

	test('should cache assets for offline use', async ({ page }) => {
		// First visit to populate cache
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Get all cached resources
		const cachedResources = await page.evaluate(() => {
			return caches.keys().then((cacheNames) => {
				const cached: string[] = [];
				return Promise.all(
					cacheNames.map((cacheName) => {
						return caches.open(cacheName).then((cache) => {
							return cache.keys().then((requests) => {
								requests.forEach((request) => {
									cached.push(request.url);
								});
							});
						});
					})
				).then(() => cached);
			});
		});

		// Should have some cached resources
		expect(cachedResources.length).toBeGreaterThan(0);
	});

	test('should serve favicon from cache', async ({ page }) => {
		await page.goto('/');

		// Check that favicon.svg is served
		const faviconResponse = await page.request.get('/favicon.svg');
		expect(faviconResponse.ok()).toBe(true);
	});

	test('should have PWA meta tags', async ({ page }) => {
		await page.goto('/');

		// Check for manifest link
		const manifestLink = page.locator('link[rel="manifest"]');
		await expect(manifestLink).toHaveAttribute('href', '/manifest.json');

		// Check for theme-color
		const themeColor = page.locator('meta[name="theme-color"]');
		await expect(themeColor).toHaveAttribute('content', '#000000');

		// Check for apple-mobile-web-app-capable
		const appCapable = page.locator('meta[name="apple-mobile-web-app-capable"]');
		await expect(appCapable).toHaveAttribute('content', 'true');

		// Check for apple-mobile-web-app-title
		const appTitle = page.locator('meta[name="apple-mobile-web-app-title"]');
		await expect(appTitle).toHaveAttribute('content', 'Kassa');
	});

	test('should have installable app configuration', async ({ page }) => {
		await page.goto('/');

		const manifest = await page.evaluate(() => {
			const link = document.querySelector('link[rel="manifest"]');
			if (link) {
				return fetch(link.getAttribute('href')!).then((r) => r.json());
			}
			return null;
		});

		expect(manifest).not.toBeNull();
		expect(manifest.display).toBe('standalone');
		expect(manifest.scope).toBe('/');
		expect(manifest.start_url).toBe('/');
		expect(manifest.icons).toBeDefined();
		expect(manifest.icons.length).toBeGreaterThan(0);
	});

	test('should precache favicon and manifest', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const precachedFiles = await page.evaluate(() => {
			return caches.open('workbox-precache-v2').then((cache) => {
				return cache.keys().then((requests) => {
					return requests.map((r) => r.url);
				});
			});
		});

		// Check if favicon.svg is precached
		const hasFavicon = precachedFiles.some((url) => url.includes('favicon.svg'));
		expect(hasFavicon).toBe(true);

		// Check if manifest is precached
		const hasManifest = precachedFiles.some((url) => url.includes('manifest'));
		expect(hasManifest).toBe(true);
	});
});
