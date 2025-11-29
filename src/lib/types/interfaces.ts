/**
 * Complete Business Domain Interfaces for Kassa POS
 * Defines the complete contract for all business entities with calculated fields
 */

/**
 * Represents a product that can be sold
 */
export interface Product {
	/** Unique identifier for the product */
	id: string;

	/** Product name or description (required, non-empty) */
	name: string;

	/** Purchase/cost price per unit (supplier/wholesale price, >= 0) */
	purchasePrice: number;

	/** Sale/retail price per unit (selling price, >= purchasePrice) */
	sellingPrice: number;

	/** Optional product category */
	category?: string;

	/** ISO date string when the product was created */
	createdAt: string;

	/** ISO date string when the product was last updated */
	updatedAt: string;
}

/**
 * Represents a single item in an order with calculated financial metrics
 */
export interface OrderItem {
	/** Reference to the product being ordered */
	productId: string;

	/** Quantity of the product (must be > 0, can be decimal for fractional units) */
	quantity: number;

	/** Calculated total purchase/cost amount (quantity × product.purchasePrice, readonly) */
	readonly itemCost: number;

	/** Calculated total sale/revenue amount (quantity × product.sellingPrice, readonly) */
	readonly itemRevenue: number;

	/** Calculated profit margin (itemRevenue - itemCost, readonly) */
	readonly itemMargin: number;

	/** Calculated profit percentage ((itemMargin / itemRevenue) × 100, 0-100, readonly) */
	readonly itemMarginPercent: number;
}

/**
 * Represents a sales order/receipt
 */
export interface Order {
	/** Unique identifier for the order */
	id: string;

	/** Reference to the client making the purchase (null for walk-in customers) */
	clientId: string | null;

	/** Array of items in the order */
	items: OrderItem[];

	/** Calculated total purchase/cost amount for all items (readonly) */
	readonly totalCost: number;

	/** Calculated total sale/revenue amount for all items (readonly) */
	readonly totalRevenue: number;

	/** Calculated total profit margin for all items (readonly) */
	readonly totalMargin: number;

	/** Calculated total profit percentage (0-100, readonly) */
	readonly totalMarginPercent: number;

	/** Status of the order */
	status: 'draft' | 'completed';

	/** ISO date string when the order was created */
	createdAt: string;

	/** ISO date string when the order was completed (null if not completed) */
	completedAt: string | null;
}

/**
 * Represents a customer/client in the system
 */
export interface Client {
	/** Unique identifier for the client */
	id: string;

	/** Client name or business name (required, non-empty) */
	name: string;

	/** Optional email address */
	email?: string;

	/** Optional phone number */
	phone?: string;

	/** Total number of orders placed by this client */
	totalOrders: number;

	/** Total amount spent by this client */
	totalSpent: number;

	/** ISO date string when the client was created */
	createdAt: string;

	/** ISO date string of the client's last order (null if no orders) */
	lastOrderAt: string | null;
}

/**
 * Represents aggregated financial totals for an entire order
 */
export interface OrderTotals {
	/** Sum of all item costs */
	totalCost: number;

	/** Sum of all item revenues */
	totalRevenue: number;

	/** Sum of all item margins (totalRevenue - totalCost) */
	totalMargin: number;

	/** Total profit percentage ((totalMargin / totalRevenue) × 100) */
	totalMarginPercent: number;
}
