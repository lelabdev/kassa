import type { OrderItem, OrderTotals } from '$lib/types/interfaces';

/**
 * Calculates the total cost (purchase price) for an item
 * @param quantity - Number of units
 * @param pricePerUnit - Purchase price per unit
 * @returns Total cost (quantity × pricePerUnit)
 */
export function calculateItemCost(quantity: number, pricePerUnit: number): number {
	return quantity * pricePerUnit;
}

/**
 * Calculates the total revenue (selling price) for an item
 * @param quantity - Number of units
 * @param salePrice - Sale price per unit
 * @returns Total revenue (quantity × salePrice)
 */
export function calculateItemRevenue(quantity: number, salePrice: number): number {
	return quantity * salePrice;
}

/**
 * Calculates the profit margin
 * @param cost - Total cost amount
 * @param revenue - Total revenue amount
 * @returns Margin amount (revenue - cost)
 */
export function calculateMargin(cost: number, revenue: number): number {
	return revenue - cost;
}

/**
 * Calculates the profit percentage
 * @param margin - Profit margin amount
 * @param revenue - Total revenue amount
 * @returns Profit percentage ((margin / revenue) × 100)
 */
export function calculateProfitPercentage(margin: number, revenue: number): number {
	return (margin / revenue) * 100;
}

/**
 * Calculates aggregated totals for an entire order
 * @param items - Array of OrderItem objects
 * @returns OrderTotals with aggregated cost, revenue, margin, and margin percentage
 */
export function calculateOrderTotals(items: OrderItem[]): OrderTotals {
	const totalCost = items.reduce((sum, item) => sum + item.itemCost, 0);
	const totalRevenue = items.reduce((sum, item) => sum + item.itemRevenue, 0);
	const totalMargin = calculateMargin(totalCost, totalRevenue);
	const totalMarginPercent = calculateProfitPercentage(totalMargin, totalRevenue);

	return {
		totalCost,
		totalRevenue,
		totalMargin,
		totalMarginPercent
	};
}
