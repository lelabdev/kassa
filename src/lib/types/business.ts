/**
 * Business domain types for Kassa POS application
 * Defines core entities: Client, Product, Order, and calculated results
 */

/**
 * Represents a customer/client in the system
 */
interface Client {
	/** Unique identifier for the client */
	id: string;
	/** Client name or business name */
	name: string;
	/** Optional email address */
	email?: string;
	/** Optional phone number */
	phone?: string;
}

/**
 * Represents a product that can be sold
 */
interface Product {
	/** Unique identifier for the product */
	id: string;
	/** Product name or description */
	name: string;
	/** Optional icon/emoji for visual identification (64x64px recommended) */
	icon?: string;
	/** Optional default sale price per unit */
	defaultPrice?: number;
}

/**
 * Represents a single item in an order
 */
interface OrderItem {
	/** Reference to the product being ordered */
	productId: string;
	/** Quantity of the product (can be decimal for fractional units) */
	quantity: number;
	/** Purchase/cost price per unit (supplier/wholesale price) */
	purchasePrice: number;
	/** Sale/retail price per unit (selling price) */
	salePrice: number;
}

/**
 * Represents a sales order/receipt
 */
interface Order {
	/** Unique identifier for the order */
	id: string;
	/** Reference to the client making the purchase */
	clientId: string;
	/** Array of items in the order */
	items: OrderItem[];
	/** Timestamp when the order was created */
	createdAt: number;
	/** Status of the order (pending, completed, cancelled) */
	status: 'pending' | 'completed' | 'cancelled';
}

/**
 * Calculated financial metrics for an order or collection of items
 */
interface CalculatedMargin {
	/** Total purchase/cost amount (quantity × purchasePrice for all items) */
	purchaseTotal: number;
	/** Total sale/revenue amount (quantity × salePrice for all items) */
	saleTotal: number;
	/** Profit margin in currency units (saleTotal - purchaseTotal) */
	margin: number;
	/** Profit percentage ((margin / purchaseTotal) × 100) */
	profitPercentage: number;
}

export type { Client, Product, OrderItem, Order, CalculatedMargin };
