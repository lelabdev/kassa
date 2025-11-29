import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ProductForm from './ProductForm.svelte';
import type { Product } from '$lib/types/interfaces';

describe('ProductForm.svelte', () => {
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
		}
	];

	describe('Form Rendering', () => {
		it('should render the form with all input fields', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const form = page.getByRole('form');
			await expect.element(form).toBeInTheDocument();

			expect.hasAssertions();
		});

		it('should render product select dropdown', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const productSelect = page.getByRole('combobox', { name: /product/i });
			await expect.element(productSelect).toBeInTheDocument();

			expect.hasAssertions();
		});

		it('should display all available products in dropdown', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const productSelect = page.getByRole('combobox', { name: /product/i });
			await productSelect.click();

			for (const product of mockProducts) {
				const option = page.getByRole('option', { name: new RegExp(product.name, 'i') });
				await expect.element(option).toBeInTheDocument();
			}

			expect.hasAssertions();
		});

		it('should render quantity input field', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const quantityInput = page.getByRole('spinbutton', { name: /quantity/i });
			await expect.element(quantityInput).toBeInTheDocument();

			expect.hasAssertions();
		});

		it('should render purchase price input field', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const purchaseInput = page.getByRole('spinbutton', { name: /purchase.*price/i });
			await expect.element(purchaseInput).toBeInTheDocument();

			expect.hasAssertions();
		});

		it('should render sale price input field', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const saleInput = page.getByRole('spinbutton', { name: /sale.*price|selling.*price/i });
			await expect.element(saleInput).toBeInTheDocument();

			expect.hasAssertions();
		});

		it('should render margin display (amount)', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const marginDisplay = page.getByText(/margin/i);
			await expect.element(marginDisplay).toBeInTheDocument();

			expect.hasAssertions();
		});

		it('should render margin percentage display', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const percentDisplay = page.getByText(/%|profit.*percent/i);
			await expect.element(percentDisplay).toBeInTheDocument();

			expect.hasAssertions();
		});

		it('should render Add button', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const addButton = page.getByRole('button', { name: /add/i });
			await expect.element(addButton).toBeInTheDocument();

			expect.hasAssertions();
		});

		it('should render Cancel button', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const cancelButton = page.getByRole('button', { name: /cancel/i });
			await expect.element(cancelButton).toBeInTheDocument();

			expect.hasAssertions();
		});
	});

	describe('Initial State', () => {
		it('should have empty/default values initially', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const quantityInput = page.getByRole('spinbutton', { name: /quantity/i }) as any;
			const value = await quantityInput.getAttribute('value');
			expect(value).toBeFalsy();

			expect.hasAssertions();
		});

		it('should display zero margin initially', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const marginDisplay = page.getByText(/margin.*0/i);
			await expect.element(marginDisplay).toBeInTheDocument();

			expect.hasAssertions();
		});

		it('should have Add button disabled initially', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const addButton = page.getByRole('button', { name: /add/i }) as any;
			const disabled = await addButton.getAttribute('disabled');
			expect(disabled !== null).toBe(true);

			expect.hasAssertions();
		});
	});

	describe('Input Validation', () => {
		it('should require product selection', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const quantityInput = page.getByRole('spinbutton', { name: /quantity/i });
			await quantityInput.fill('5');

			const addButton = page.getByRole('button', { name: /add/i }) as any;
			const disabled = await addButton.getAttribute('disabled');
			expect(disabled !== null).toBe(true);

			expect.hasAssertions();
		});

		it('should require quantity > 0', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const productSelect = page.getByRole('combobox', { name: /product/i });
			await productSelect.click();
			const option1 = page.getByRole('option', { name: /apples/i });
			await option1.click();

			const quantityInput = page.getByRole('spinbutton', { name: /quantity/i });
			await quantityInput.fill('0');

			const addButton = page.getByRole('button', { name: /add/i }) as any;
			const disabled = await addButton.getAttribute('disabled');
			expect(disabled !== null).toBe(true);

			expect.hasAssertions();
		});

		it('should accept valid form input', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const productSelect = page.getByRole('combobox', { name: /product/i });
			await productSelect.click();
			const option1 = page.getByRole('option', { name: /apples/i });
			await option1.click();

			const quantityInput = page.getByRole('spinbutton', { name: /quantity/i });
			await quantityInput.fill('5');

			const purchaseInput = page.getByRole('spinbutton', { name: /purchase.*price/i });
			await purchaseInput.fill('10');

			const saleInput = page.getByRole('spinbutton', { name: /sale.*price|selling.*price/i });
			await saleInput.fill('15');

			const addButton = page.getByRole('button', { name: /add/i }) as any;
			const disabled = await addButton.getAttribute('disabled');
			expect(disabled === null).toBe(true);

			expect.hasAssertions();
		});

		it('should require sale price >= purchase price', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const productSelect = page.getByRole('combobox', { name: /product/i });
			await productSelect.click();
			const option1 = page.getByRole('option', { name: /apples/i });
			await option1.click();

			const quantityInput = page.getByRole('spinbutton', { name: /quantity/i });
			await quantityInput.fill('5');

			const purchaseInput = page.getByRole('spinbutton', { name: /purchase.*price/i });
			await purchaseInput.fill('20');

			const saleInput = page.getByRole('spinbutton', { name: /sale.*price|selling.*price/i });
			await saleInput.fill('10');

			const addButton = page.getByRole('button', { name: /add/i }) as any;
			const disabled = await addButton.getAttribute('disabled');
			expect(disabled !== null).toBe(true);

			expect.hasAssertions();
		});

		it('should accept decimal quantities', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const productSelect = page.getByRole('combobox', { name: /product/i });
			await productSelect.click();
			const option1 = page.getByRole('option', { name: /apples/i });
			await option1.click();

			const quantityInput = page.getByRole('spinbutton', { name: /quantity/i });
			await quantityInput.fill('2.5');

			const purchaseInput = page.getByRole('spinbutton', { name: /purchase.*price/i });
			await purchaseInput.fill('10');

			const saleInput = page.getByRole('spinbutton', { name: /sale.*price|selling.*price/i });
			await saleInput.fill('15');

			const addButton = page.getByRole('button', { name: /add/i }) as any;
			const disabled = await addButton.getAttribute('disabled');
			expect(disabled === null).toBe(true);

			expect.hasAssertions();
		});
	});

	describe('Real-time Calculations', () => {
		it('should calculate and display margin amount', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const productSelect = page.getByRole('combobox', { name: /product/i });
			await productSelect.click();
			const option1 = page.getByRole('option', { name: /apples/i });
			await option1.click();

			const quantityInput = page.getByRole('spinbutton', { name: /quantity/i });
			await quantityInput.fill('2');

			const purchaseInput = page.getByRole('spinbutton', { name: /purchase.*price/i });
			await purchaseInput.fill('10');

			const saleInput = page.getByRole('spinbutton', { name: /sale.*price|selling.*price/i });
			await saleInput.fill('15');

			// Expected: (2 * 15) - (2 * 10) = 30 - 20 = 10.00
			const marginDisplay = page.getByText(/margin: 10/i);
			await expect.element(marginDisplay).toBeInTheDocument();

			expect.hasAssertions();
		});

		it('should calculate and display margin percentage', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const productSelect = page.getByRole('combobox', { name: /product/i });
			await productSelect.click();
			const option1 = page.getByRole('option', { name: /apples/i });
			await option1.click();

			const quantityInput = page.getByRole('spinbutton', { name: /quantity/i });
			await quantityInput.fill('2');

			const purchaseInput = page.getByRole('spinbutton', { name: /purchase.*price/i });
			await purchaseInput.fill('10');

			const saleInput = page.getByRole('spinbutton', { name: /sale.*price|selling.*price/i });
			await saleInput.fill('15');

			// Expected: margin = 10, revenue = 30, percentage = (10 / 30) × 100 = 33.33%
			const percentDisplay = page.getByText(/margin percentage: 33/i);
			await expect.element(percentDisplay).toBeInTheDocument();

			expect.hasAssertions();
		});

		it('should handle zero margin when purchase equals sale price', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const productSelect = page.getByRole('combobox', { name: /product/i });
			await productSelect.click();
			const option1 = page.getByRole('option', { name: /apples/i });
			await option1.click();

			const quantityInput = page.getByRole('spinbutton', { name: /quantity/i });
			await quantityInput.fill('5');

			const purchaseInput = page.getByRole('spinbutton', { name: /purchase.*price/i });
			await purchaseInput.fill('10');

			const saleInput = page.getByRole('spinbutton', { name: /sale.*price|selling.*price/i });
			await saleInput.fill('10');

			const marginDisplay = page.getByText(/margin: 0\.00/i);
			await expect.element(marginDisplay).toBeInTheDocument();

			expect.hasAssertions();
		});
	});

	describe('Form Submission', () => {
		it('should reset form after submission', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const productSelect = page.getByRole('combobox', { name: /product/i });
			await productSelect.click();
			const option1 = page.getByRole('option', { name: /apples/i });
			await option1.click();

			const quantityInput = page.getByRole('spinbutton', { name: /quantity/i });
			await quantityInput.fill('5');

			const purchaseInput = page.getByRole('spinbutton', { name: /purchase.*price/i });
			await purchaseInput.fill('10');

			const saleInput = page.getByRole('spinbutton', { name: /sale.*price|selling.*price/i });
			await saleInput.fill('15');

			const addButton = page.getByRole('button', { name: /add/i });
			await addButton.click();

			// After submission, form should be reset
			const quantityValue = await (quantityInput as any).getAttribute('value');
			expect(quantityValue).toBeFalsy();

			expect.hasAssertions();
		});

		it('should reset form when Cancel button is clicked', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const quantityInput = page.getByRole('spinbutton', { name: /quantity/i });
			await quantityInput.fill('5');

			const cancelButton = page.getByRole('button', { name: /cancel/i });
			await cancelButton.click();

			const quantityValue = await (quantityInput as any).getAttribute('value');
			expect(quantityValue).toBeFalsy();

			expect.hasAssertions();
		});

		it('should disable Add button until form is valid', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const addButton = page.getByRole('button', { name: /add/i }) as any;

			// Initially disabled
			let disabled = await addButton.getAttribute('disabled');
			expect(disabled !== null).toBe(true);

			// After selecting product and entering all fields
			const productSelect = page.getByRole('combobox', { name: /product/i });
			await productSelect.click();
			const option1 = page.getByRole('option', { name: /apples/i });
			await option1.click();

			const quantityInput = page.getByRole('spinbutton', { name: /quantity/i });
			await quantityInput.fill('5');

			const purchaseInput = page.getByRole('spinbutton', { name: /purchase.*price/i });
			await purchaseInput.fill('10');

			const saleInput = page.getByRole('spinbutton', { name: /sale.*price|selling.*price/i });
			await saleInput.fill('15');

			// Should be enabled
			disabled = await addButton.getAttribute('disabled');
			expect(disabled === null).toBe(true);

			expect.hasAssertions();
		});

		it('should accept decimal prices', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const productSelect = page.getByRole('combobox', { name: /product/i });
			await productSelect.click();
			const option1 = page.getByRole('option', { name: /apples/i });
			await option1.click();

			const quantityInput = page.getByRole('spinbutton', { name: /quantity/i });
			await quantityInput.fill('1.5');

			const purchaseInput = page.getByRole('spinbutton', { name: /purchase.*price/i });
			await purchaseInput.fill('10.50');

			const saleInput = page.getByRole('spinbutton', { name: /sale.*price|selling.*price/i });
			await saleInput.fill('15.75');

			const addButton = page.getByRole('button', { name: /add/i }) as any;
			const disabled = await addButton.getAttribute('disabled');
			expect(disabled === null).toBe(true);

			expect.hasAssertions();
		});
	});

	describe('Edge Cases', () => {
		it('should handle very large quantities', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const productSelect = page.getByRole('combobox', { name: /product/i });
			await productSelect.click();
			const option1 = page.getByRole('option', { name: /apples/i });
			await option1.click();

			const quantityInput = page.getByRole('spinbutton', { name: /quantity/i });
			await quantityInput.fill('999999');

			const purchaseInput = page.getByRole('spinbutton', { name: /purchase.*price/i });
			await purchaseInput.fill('10');

			const saleInput = page.getByRole('spinbutton', { name: /sale.*price|selling.*price/i });
			await saleInput.fill('15');

			const addButton = page.getByRole('button', { name: /add/i }) as any;
			const disabled = await addButton.getAttribute('disabled');
			expect(disabled === null).toBe(true);

			expect.hasAssertions();
		});

		it('should handle empty products array gracefully', async () => {
			render(ProductForm, { props: { products: [] } });

			const productSelect = page.getByRole('combobox', { name: /product/i });
			await expect.element(productSelect).toBeInTheDocument();

			expect.hasAssertions();
		});

		it('should handle changing product selection', async () => {
			render(ProductForm, { props: { products: mockProducts } });

			const productSelect = page.getByRole('combobox', { name: /product/i });
			await productSelect.click();
			let option1 = page.getByRole('option', { name: /apples/i });
			await option1.click();

			const quantityInput = page.getByRole('spinbutton', { name: /quantity/i });
			const purchaseInput = page.getByRole('spinbutton', { name: /purchase.*price/i });
			const saleInput = page.getByRole('spinbutton', { name: /sale.*price|selling.*price/i });

			await quantityInput.fill('5');
			await purchaseInput.fill('10');
			await saleInput.fill('15');

			// Change product
			await productSelect.click();
			const option2 = page.getByRole('option', { name: /oranges/i });
			await option2.click();

			const addButton = page.getByRole('button', { name: /add/i }) as any;
			const disabled = await addButton.getAttribute('disabled');
			expect(disabled === null).toBe(true);

			expect.hasAssertions();
		});
	});
});
