import { describe, it, expect } from 'vitest';
import {
	calculateItemCost,
	calculateItemRevenue,
	calculateMargin,
	calculateProfitPercentage,
	calculateOrderTotals
} from './calculations';
import type { OrderItem } from '$lib/types/interfaces';

describe('Calculation Functions', () => {
	describe('calculateItemCost', () => {
		it('should calculate item cost by multiplying quantity and price per unit', () => {
			const result = calculateItemCost(5, 10);
			expect(result).toBe(50);
		});

		it('should handle decimal quantities', () => {
			const result = calculateItemCost(2.5, 20);
			expect(result).toBe(50);
		});

		it('should handle decimal prices', () => {
			const result = calculateItemCost(10, 10.5);
			expect(result).toBe(105);
		});

		it('should return 0 when quantity is 0', () => {
			const result = calculateItemCost(0, 100);
			expect(result).toBe(0);
		});

		it('should handle zero price', () => {
			const result = calculateItemCost(5, 0);
			expect(result).toBe(0);
		});

		it('should return correct result for large numbers', () => {
			const result = calculateItemCost(1000, 999.99);
			expect(result).toBe(999990);
		});
	});

	describe('calculateItemRevenue', () => {
		it('should calculate item revenue by multiplying quantity and sale price', () => {
			const result = calculateItemRevenue(5, 15);
			expect(result).toBe(75);
		});

		it('should handle decimal quantities', () => {
			const result = calculateItemRevenue(2.5, 20);
			expect(result).toBe(50);
		});

		it('should handle decimal prices', () => {
			const result = calculateItemRevenue(10, 12.5);
			expect(result).toBe(125);
		});

		it('should return 0 when quantity is 0', () => {
			const result = calculateItemRevenue(0, 100);
			expect(result).toBe(0);
		});

		it('should handle zero price', () => {
			const result = calculateItemRevenue(5, 0);
			expect(result).toBe(0);
		});

		it('should return correct result for large numbers', () => {
			const result = calculateItemRevenue(1000, 1999.99);
			expect(result).toBe(1999990);
		});
	});

	describe('calculateMargin', () => {
		it('should calculate margin as revenue minus cost', () => {
			const result = calculateMargin(50, 75);
			expect(result).toBe(25);
		});

		it('should handle decimal values', () => {
			const result = calculateMargin(50.5, 75.75);
			expect(result).toBeCloseTo(25.25, 5);
		});

		it('should return 0 when cost equals revenue', () => {
			const result = calculateMargin(100, 100);
			expect(result).toBe(0);
		});

		it('should return negative margin when cost exceeds revenue', () => {
			const result = calculateMargin(100, 50);
			expect(result).toBe(-50);
		});

		it('should handle zero values', () => {
			const result = calculateMargin(0, 100);
			expect(result).toBe(100);
		});

		it('should handle large numbers', () => {
			const result = calculateMargin(5000, 7500);
			expect(result).toBe(2500);
		});
	});

	describe('calculateProfitPercentage', () => {
		it('should calculate profit percentage as (margin / revenue) * 100', () => {
			const result = calculateProfitPercentage(25, 75);
			expect(result).toBeCloseTo(33.33, 2);
		});

		it('should return 0 when margin is 0', () => {
			const result = calculateProfitPercentage(0, 100);
			expect(result).toBe(0);
		});

		it('should return 100 when margin equals revenue', () => {
			const result = calculateProfitPercentage(100, 100);
			expect(result).toBe(100);
		});

		it('should return negative percentage when margin is negative', () => {
			const result = calculateProfitPercentage(-50, 100);
			expect(result).toBe(-50);
		});

		it('should handle decimal values', () => {
			const result = calculateProfitPercentage(33.33, 100);
			expect(result).toBeCloseTo(33.33, 2);
		});

		it('should handle high profit scenarios', () => {
			const result = calculateProfitPercentage(200, 250);
			expect(result).toBe(80);
		});

		it('should return Infinity when revenue is 0 and margin is positive', () => {
			const result = calculateProfitPercentage(100, 0);
			expect(result).toBe(Infinity);
		});

		it('should return NaN when both margin and revenue are 0', () => {
			const result = calculateProfitPercentage(0, 0);
			expect(Number.isNaN(result)).toBe(true);
		});
	});

	describe('calculateOrderTotals', () => {
		it('should calculate totals for single item order', () => {
			const items: OrderItem[] = [
				{
					productId: 'prod-001',
					quantity: 5,
					itemCost: 50,
					itemRevenue: 75,
					itemMargin: 25,
					itemMarginPercent: 33.33
				}
			];
			const totals = calculateOrderTotals(items);
			expect(totals.totalCost).toBe(50);
			expect(totals.totalRevenue).toBe(75);
			expect(totals.totalMargin).toBe(25);
			expect(totals.totalMarginPercent).toBeCloseTo(33.33, 2);
		});

		it('should calculate totals for multiple items', () => {
			const items: OrderItem[] = [
				{
					productId: 'prod-001',
					quantity: 2,
					itemCost: 20,
					itemRevenue: 30,
					itemMargin: 10,
					itemMarginPercent: 33.33
				},
				{
					productId: 'prod-002',
					quantity: 3,
					itemCost: 30,
					itemRevenue: 45,
					itemMargin: 15,
					itemMarginPercent: 33.33
				}
			];
			const totals = calculateOrderTotals(items);
			expect(totals.totalCost).toBe(50);
			expect(totals.totalRevenue).toBe(75);
			expect(totals.totalMargin).toBe(25);
			expect(totals.totalMarginPercent).toBeCloseTo(33.33, 2);
		});

		it('should handle empty order', () => {
			const items: OrderItem[] = [];
			const totals = calculateOrderTotals(items);
			expect(totals.totalCost).toBe(0);
			expect(totals.totalRevenue).toBe(0);
			expect(totals.totalMargin).toBe(0);
			expect(Number.isNaN(totals.totalMarginPercent)).toBe(true);
		});

		it('should handle mixed profit margins', () => {
			const items: OrderItem[] = [
				{
					productId: 'prod-001',
					quantity: 10,
					itemCost: 100,
					itemRevenue: 150,
					itemMargin: 50,
					itemMarginPercent: 33.33
				},
				{
					productId: 'prod-002',
					quantity: 20,
					itemCost: 200,
					itemRevenue: 300,
					itemMargin: 100,
					itemMarginPercent: 33.33
				}
			];
			const totals = calculateOrderTotals(items);
			expect(totals.totalCost).toBe(300);
			expect(totals.totalRevenue).toBe(450);
			expect(totals.totalMargin).toBe(150);
			expect(totals.totalMarginPercent).toBeCloseTo(33.33, 2);
		});

		it('should handle orders with zero margin items', () => {
			const items: OrderItem[] = [
				{
					productId: 'prod-001',
					quantity: 5,
					itemCost: 50,
					itemRevenue: 50,
					itemMargin: 0,
					itemMarginPercent: 0
				}
			];
			const totals = calculateOrderTotals(items);
			expect(totals.totalCost).toBe(50);
			expect(totals.totalRevenue).toBe(50);
			expect(totals.totalMargin).toBe(0);
			expect(totals.totalMarginPercent).toBe(0);
		});

		it('should handle orders with decimal costs and revenues', () => {
			const items: OrderItem[] = [
				{
					productId: 'prod-001',
					quantity: 2.5,
					itemCost: 25.5,
					itemRevenue: 38.25,
					itemMargin: 12.75,
					itemMarginPercent: 33.33
				}
			];
			const totals = calculateOrderTotals(items);
			expect(totals.totalCost).toBeCloseTo(25.5, 2);
			expect(totals.totalRevenue).toBeCloseTo(38.25, 2);
			expect(totals.totalMargin).toBeCloseTo(12.75, 2);
			expect(totals.totalMarginPercent).toBeCloseTo(33.33, 2);
		});

		it('should return correct totalMarginPercent for order with different item margins', () => {
			const items: OrderItem[] = [
				{
					productId: 'prod-001',
					quantity: 10,
					itemCost: 100,
					itemRevenue: 200,
					itemMargin: 100,
					itemMarginPercent: 50
				},
				{
					productId: 'prod-002',
					quantity: 10,
					itemCost: 100,
					itemRevenue: 150,
					itemMargin: 50,
					itemMarginPercent: 33.33
				}
			];
			const totals = calculateOrderTotals(items);
			expect(totals.totalCost).toBe(200);
			expect(totals.totalRevenue).toBe(350);
			expect(totals.totalMargin).toBe(150);
			// Total margin percent = (150 / 350) * 100 = 42.857...%
			expect(totals.totalMarginPercent).toBeCloseTo(42.86, 2);
		});
	});
});
