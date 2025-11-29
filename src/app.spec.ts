import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('PWA Meta Tags in app.html', () => {
	let appHtml: string;

	beforeAll(() => {
		const appHtmlPath = path.resolve('./src/app.html');
		appHtml = fs.readFileSync(appHtmlPath, 'utf-8');
	});

	it('should have manifest link', () => {
		expect(appHtml).toContain('link rel="manifest"');
		expect(appHtml).toContain('href="/manifest.json"');
	});

	it('should have favicon icon link', () => {
		expect(appHtml).toContain('link rel="icon"');
		expect(appHtml).toContain('type="image/svg+xml"');
		expect(appHtml).toContain('href="/favicon.svg"');
	});

	it('should have apple-touch-icon link', () => {
		expect(appHtml).toContain('link rel="apple-touch-icon"');
	});

	it('should have theme-color meta tag', () => {
		expect(appHtml).toContain('meta name="theme-color"');
		expect(appHtml).toContain('content="#000000"');
	});

	it('should have description meta tag', () => {
		expect(appHtml).toContain('meta name="description"');
		expect(appHtml).toContain('content="Mobile-first POS app');
	});

	it('should have mobile-web-app-capable meta tag', () => {
		expect(appHtml).toContain('meta name="mobile-web-app-capable"');
		expect(appHtml).toContain('content="true"');
	});

	it('should have apple-mobile-web-app-capable meta tag', () => {
		expect(appHtml).toContain('meta name="apple-mobile-web-app-capable"');
	});

	it('should have apple-mobile-web-app-title meta tag', () => {
		expect(appHtml).toContain('meta name="apple-mobile-web-app-title"');
		expect(appHtml).toContain('content="Kassa"');
	});

	it('should have apple-mobile-web-app-status-bar-style meta tag', () => {
		expect(appHtml).toContain('meta name="apple-mobile-web-app-status-bar-style"');
		expect(appHtml).toContain('content="black-translucent"');
	});

	it('should have service worker registration script', () => {
		expect(appHtml).toContain('navigator.serviceWorker');
		expect(appHtml).toContain('register');
		expect(appHtml).toContain('sw.js');
	});
});
