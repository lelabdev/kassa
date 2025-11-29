import { calculateOrderTotals } from '$lib/utils/calculations';
import type { Order, OrderItem, OrderTotals } from '$lib/types/interfaces';

/**
 * Creates a reactive store for the active order
 * Can be used with Svelte 5 runes in components
 *
 * @returns Order store with state management methods
 */
export function createOrderStore() {
	let order: Order | null = null;
	let items: OrderItem[] = [];

	/**
	 * Calculate totals from current items
	 */
	function calculateTotals(): OrderTotals {
		return calculateOrderTotals(items);
	}

	return {
		/**
		 * Get the current active order
		 */
		get order() {
			return order;
		},

		/**
		 * Set the active order
		 * @param value - Order object or null
		 */
		setOrder(value: Order | null) {
			order = value;
		},

		/**
		 * Get the current items in the order
		 */
		get items() {
			return items;
		},

		/**
		 * Add an item to the order
		 * @param item - OrderItem to add
		 */
		addItem(item: OrderItem) {
			items.push(item);
		},

		/**
		 * Remove an item from the order by productId
		 * @param productId - ID of the product to remove
		 */
		removeItem(productId: string) {
			const index = items.findIndex((item) => item.productId === productId);
			if (index > -1) {
				items.splice(index, 1);
			}
		},

		/**
		 * Update an item's quantity in the order
		 * @param productId - ID of the product to update
		 * @param quantity - New quantity (can be decimal)
		 */
		updateItem(productId: string, quantity: number) {
			const item = items.find((item) => item.productId === productId);
			if (item) {
				item.quantity = quantity;
			}
		},

		/**
		 * Clear all items and reset the order
		 */
		clearOrder() {
			order = null;
			items = [];
		},

		/**
		 * Get calculated totals for the current order
		 * @returns OrderTotals with cost, revenue, margin, and margin percentage
		 */
		getTotals(): OrderTotals {
			return calculateTotals();
		}
	};
}

/**
 * Singleton instance of the order store
 * Shared across the entire application
 */
let instance: ReturnType<typeof createOrderStore> | null = null;

/**
 * Get or create the singleton order store instance
 * @returns The order store instance
 */
export function getOrderStore() {
	if (!instance) {
		instance = createOrderStore();
	}
	return instance;
}
