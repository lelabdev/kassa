import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('PWA Manifest', () => {
	let manifest: Record<string, unknown>;

	beforeAll(() => {
		const manifestPath = path.resolve('./static/manifest.json');
		const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
		manifest = JSON.parse(manifestContent);
	});

	it('should have required manifest fields', () => {
		const requiredFields = ['name', 'short_name', 'description', 'start_url', 'display', 'theme_color', 'background_color', 'scope'];
		requiredFields.forEach((field) => {
			expect(manifest).toHaveProperty(field);
			expect(manifest[field]).toBeTruthy();
		});
	});

	it('should have correct name and short_name', () => {
		expect(manifest.name).toBe('Kassa');
		expect(manifest.short_name).toBe('Kassa');
	});

	it('should have correct description', () => {
		expect(manifest.description).toContain('fruit and vegetable vendors');
	});

	it('should have standalone display mode', () => {
		expect(manifest.display).toBe('standalone');
	});

	it('should have proper theme colors', () => {
		expect(manifest.theme_color).toBe('#000000');
		expect(manifest.background_color).toBe('#ffffff');
	});

	it('should have start_url set to root', () => {
		expect(manifest.start_url).toBe('/');
	});

	it('should have scope set to root', () => {
		expect(manifest.scope).toBe('/');
	});

	it('should have portrait-primary orientation', () => {
		expect(manifest.orientation).toBe('portrait-primary');
	});

	it('should have at least one icon defined', () => {
		expect(Array.isArray(manifest.icons)).toBe(true);
		expect(manifest.icons).toHaveLength(2);
	});

	it('should have valid icon definitions', () => {
		const icons = manifest.icons as Array<Record<string, unknown>>;
		icons.forEach((icon) => {
			expect(icon).toHaveProperty('src');
			expect(icon).toHaveProperty('type');
			expect(icon.src).toBeTruthy();
			expect(icon.type).toBeTruthy();
		});
	});

	it('should have SVG icons', () => {
		const icons = manifest.icons as Array<Record<string, unknown>>;
		icons.forEach((icon) => {
			expect(icon.type).toBe('image/svg+xml');
			expect(icon.src).toContain('favicon.svg');
		});
	});

	it('should have at least one maskable icon', () => {
		const icons = manifest.icons as Array<Record<string, unknown>>;
		const maskableIcon = icons.find((icon) => icon.purpose === 'maskable');
		expect(maskableIcon).toBeDefined();
	});

	it('should have valid categories', () => {
		expect(Array.isArray(manifest.categories)).toBe(true);
		expect(manifest.categories).toContain('productivity');
		expect(manifest.categories).toContain('business');
	});

	it('should have shortcuts defined', () => {
		expect(Array.isArray(manifest.shortcuts)).toBe(true);
		expect(manifest.shortcuts).toHaveLength(1);
	});

	it('should have valid shortcut structure', () => {
		const shortcuts = manifest.shortcuts as Array<Record<string, unknown>>;
		const newOrderShortcut = shortcuts[0];
		expect(newOrderShortcut.name).toBe('New Order');
		expect(newOrderShortcut.short_name).toBe('Order');
		expect(newOrderShortcut.url).toBe('/');
		expect(Array.isArray(newOrderShortcut.icons)).toBe(true);
	});
});
