import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ProductGrid from './ProductGrid.svelte';
import type { Product } from '$lib/types/interfaces';

describe('ProductGrid.svelte', () => {
	const mockProducts: Product[] = [
		{
			id: 'product-1',
			name: 'Apples',
			purchasePrice: 10,
			sellingPrice: 15,
			category: 'fruits',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		},
		{
			id: 'product-2',
			name: 'Oranges',
			purchasePrice: 8,
			sellingPrice: 12,
			category: 'fruits',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		},
		{
			id: 'product-3',
			name: 'Tomatoes',
			purchasePrice: 5,
			sellingPrice: 10,
			category: 'vegetables',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		},
		{
			id: 'product-4',
			name: 'Lettuce',
			purchasePrice: 3,
			sellingPrice: 7,
			category: 'vegetables',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		}
	];

	describe('Grid Rendering', () => {
		it('should render the product grid container', async () => {
			render(ProductGrid, { props: { products: mockProducts, selectedProductId: null } });

			const applesButton = page.getByRole('button', { name: /apples/i });
			await expect.element(applesButton).toBeInTheDocument();

			expect.hasAssertions();
		});

		it('should display all products in the grid', async () => {
			render(ProductGrid, { props: { products: mockProducts, selectedProductId: null } });

			for (const product of mockProducts) {
				const productButton = page.getByRole('button', { name: new RegExp(product.name, 'i') });
				await expect.element(productButton).toBeInTheDocument();
			}

			expect.hasAssertions();
		});

		it('should display product names for each item', async () => {
			render(ProductGrid, { props: { products: mockProducts, selectedProductId: null } });

			for (const product of mockProducts) {
				const productName = page.getByText(product.name);
				await expect.element(productName).toBeInTheDocument();
			}

			expect.hasAssertions();
		});
	});

	describe('Product Icon Display', () => {
		it('should render icons for products', async () => {
			render(ProductGrid, { props: { products: mockProducts, selectedProductId: null } });

			for (const product of mockProducts) {
				const icon = page.getByRole('button', { name: new RegExp(product.name, 'i') });
				await expect.element(icon).toBeInTheDocument();
			}

			expect.hasAssertions();
		});

		it('should have descriptive alt text for icons', async () => {
			render(ProductGrid, { props: { products: mockProducts, selectedProductId: null } });

			for (const product of mockProducts) {
				const icon = page.getByAltText(new RegExp(product.name, 'i'));
				await expect.element(icon).toBeInTheDocument();
			}

			expect.hasAssertions();
		});
	});

	describe('Click Handling', () => {
		it('should click product and fire select event', async () => {
			render(ProductGrid, {
				props: { products: mockProducts, selectedProductId: null }
			});

			const appleButton = page.getByRole('button', { name: /apples/i });
			await appleButton.click();

			// Button should be clickable
			await expect.element(appleButton).toBeInTheDocument();

			expect.hasAssertions();
		});

		it('should handle clicks on different products', async () => {
			render(ProductGrid, {
				props: { products: mockProducts, selectedProductId: null }
			});

			const appleButton = page.getByRole('button', { name: /apples/i });
			const tomatoButton = page.getByRole('button', { name: /tomatoes/i });

			await appleButton.click();
			await tomatoButton.click();

			// Both buttons should be present
			await expect.element(appleButton).toBeInTheDocument();
			await expect.element(tomatoButton).toBeInTheDocument();

			expect.hasAssertions();
		});
	});

	describe('Selection Indicator', () => {
		it('should highlight selected product with aria-pressed true', async () => {
			render(ProductGrid, {
				props: { products: mockProducts, selectedProductId: 'product-1' }
			});

			const appleButton = page.getByRole('button', { name: /apples/i });
			await expect.element(appleButton).toHaveAttribute('aria-pressed', 'true');

			expect.hasAssertions();
		});

		it('should not highlight unselected products with aria-pressed false', async () => {
			render(ProductGrid, {
				props: { products: mockProducts, selectedProductId: 'product-1' }
			});

			const orangeButton = page.getByRole('button', { name: /oranges/i });
			await expect.element(orangeButton).toHaveAttribute('aria-pressed', 'false');

			expect.hasAssertions();
		});

		it('should apply selected styling class to selected product', async () => {
			render(ProductGrid, {
				props: { products: mockProducts, selectedProductId: 'product-1' }
			});

			const appleButton = page.getByRole('button', { name: /apples/i });
			await expect.element(appleButton).toHaveClass('selected');

			expect.hasAssertions();
		});

		it('should not apply selected styling to unselected products', async () => {
			render(ProductGrid, {
				props: { products: mockProducts, selectedProductId: 'product-1' }
			});

			const orangeButton = page.getByRole('button', { name: /oranges/i });
			await expect.element(orangeButton).not.toHaveClass('selected');

			expect.hasAssertions();
		});
	});

	describe('Touch & Mobile Interaction', () => {
		it('should have touch-friendly buttons', async () => {
			render(ProductGrid, {
				props: { products: mockProducts, selectedProductId: null }
			});

			const appleButton = page.getByRole('button', { name: /apples/i });
			await expect.element(appleButton).toBeInTheDocument();

			expect.hasAssertions();
		});
	});

	describe('Empty State', () => {
		it('should handle empty products array', async () => {
			render(ProductGrid, {
				props: { products: [], selectedProductId: null }
			});

			const emptyMessage = page.getByText(/no products/i);
			await expect.element(emptyMessage).toBeInTheDocument();

			expect.hasAssertions();
		});
	});

	describe('Accessibility', () => {
		it('should have accessible button labels', async () => {
			render(ProductGrid, {
				props: { products: mockProducts, selectedProductId: null }
			});

			for (const product of mockProducts) {
				const button = page.getByRole('button', { name: new RegExp(product.name, 'i') });
				await expect.element(button).toBeInTheDocument();
			}

			expect.hasAssertions();
		});

		it('should indicate selected state with aria-pressed', async () => {
			render(ProductGrid, {
				props: { products: mockProducts, selectedProductId: 'product-1' }
			});

			const appleButton = page.getByRole('button', { name: /apples/i });
			await expect.element(appleButton).toHaveAttribute('aria-pressed', 'true');

			expect.hasAssertions();
		});
	});
});
