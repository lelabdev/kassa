import { describe, it, expect, beforeEach } from 'vitest';
import { createOrderStore } from './order.svelte';
import type { Order, OrderItem } from '$lib/types/interfaces';

describe('createOrderStore', () => {
	let store: ReturnType<typeof createOrderStore>;

	beforeEach(() => {
		store = createOrderStore();
	});

	describe('initial state', () => {
		it('should initialize with null order', () => {
			expect(store.order).toBeNull();
		});

		it('should initialize with empty items array', () => {
			expect(store.items).toEqual([]);
		});

		it('should have zero totals initially', () => {
			const totals = store.getTotals();
			expect(totals.totalCost).toBe(0);
			expect(totals.totalRevenue).toBe(0);
			expect(totals.totalMargin).toBe(0);
			expect(Number.isNaN(totals.totalMarginPercent)).toBe(true);
		});
	});

	describe('setOrder', () => {
		it('should set the active order', () => {
			const order: Order = {
				id: 'order-1',
				clientId: 'client-1',
				items: [],
				status: 'draft' as const,
				totalCost: 0,
				totalRevenue: 0,
				totalMargin: 0,
				totalMarginPercent: 0,
				createdAt: new Date().toISOString(),
				completedAt: null
			};

			store.setOrder(order);
			expect(store.order?.id).toBe(order.id);
			expect(store.order?.clientId).toBe(order.clientId);
		});

		it('should set order to null', () => {
			const order: Order = {
				id: 'order-1',
				clientId: 'client-1',
				items: [],
				status: 'draft' as const,
				totalCost: 0,
				totalRevenue: 0,
				totalMargin: 0,
				totalMarginPercent: 0,
				createdAt: new Date().toISOString(),
				completedAt: null
			};

			store.setOrder(order);
			store.setOrder(null);
			expect(store.order).toBeNull();
		});
	});

	describe('addItem', () => {
		it('should add a single item to the order', () => {
			const item: OrderItem = {
				productId: 'product-1',
				quantity: 2,
				get itemCost() {
					return this.quantity * 10;
				},
				get itemRevenue() {
					return this.quantity * 15;
				},
				get itemMargin() {
					return this.itemRevenue - this.itemCost;
				},
				get itemMarginPercent() {
					return (this.itemMargin / this.itemRevenue) * 100;
				}
			};

			store.addItem(item);
			expect(store.items).toHaveLength(1);
			expect(store.items[0]).toEqual(item);
		});

		it('should add multiple items to the order', () => {
			const item1: OrderItem = {
				productId: 'product-1',
				quantity: 1,
				get itemCost() {
					return 10;
				},
				get itemRevenue() {
					return 15;
				},
				get itemMargin() {
					return this.itemRevenue - this.itemCost;
				},
				get itemMarginPercent() {
					return (this.itemMargin / this.itemRevenue) * 100;
				}
			};

			const item2: OrderItem = {
				productId: 'product-2',
				quantity: 2,
				get itemCost() {
					return 20;
				},
				get itemRevenue() {
					return 30;
				},
				get itemMargin() {
					return this.itemRevenue - this.itemCost;
				},
				get itemMarginPercent() {
					return (this.itemMargin / this.itemRevenue) * 100;
				}
			};

			store.addItem(item1);
			store.addItem(item2);
			expect(store.items).toHaveLength(2);
		});

		it('should calculate totals after adding items', () => {
			const item: OrderItem = {
				productId: 'product-1',
				quantity: 2,
				get itemCost() {
					return 20; // 2 * 10
				},
				get itemRevenue() {
					return 30; // 2 * 15
				},
				get itemMargin() {
					return this.itemRevenue - this.itemCost; // 10
				},
				get itemMarginPercent() {
					return (this.itemMargin / this.itemRevenue) * 100; // 33.33%
				}
			};

			store.addItem(item);

			const totals = store.getTotals();
			expect(totals.totalCost).toBe(20);
			expect(totals.totalRevenue).toBe(30);
			expect(totals.totalMargin).toBe(10);
			expect(totals.totalMarginPercent).toBeCloseTo(33.33, 1);
		});
	});

	describe('removeItem', () => {
		beforeEach(() => {
			const item1: OrderItem = {
				productId: 'product-1',
				quantity: 1,
				get itemCost() {
					return 10;
				},
				get itemRevenue() {
					return 15;
				},
				get itemMargin() {
					return this.itemRevenue - this.itemCost;
				},
				get itemMarginPercent() {
					return (this.itemMargin / this.itemRevenue) * 100;
				}
			};

			const item2: OrderItem = {
				productId: 'product-2',
				quantity: 2,
				get itemCost() {
					return 20;
				},
				get itemRevenue() {
					return 30;
				},
				get itemMargin() {
					return this.itemRevenue - this.itemCost;
				},
				get itemMarginPercent() {
					return (this.itemMargin / this.itemRevenue) * 100;
				}
			};

			store.addItem(item1);
			store.addItem(item2);
		});

		it('should remove an item by productId', () => {
			store.removeItem('product-1');
			expect(store.items).toHaveLength(1);
			expect(store.items[0].productId).toBe('product-2');
		});

		it('should not remove if productId not found', () => {
			store.removeItem('non-existent');
			expect(store.items).toHaveLength(2);
		});

		it('should update totals after removing item', () => {
			store.removeItem('product-1');
			const totals = store.getTotals();
			expect(totals.totalCost).toBe(20);
			expect(totals.totalRevenue).toBe(30);
		});
	});

	describe('updateItem', () => {
		beforeEach(() => {
			const item: OrderItem = {
				productId: 'product-1',
				quantity: 2,
				get itemCost() {
					return this.quantity * 10;
				},
				get itemRevenue() {
					return this.quantity * 15;
				},
				get itemMargin() {
					return this.itemRevenue - this.itemCost;
				},
				get itemMarginPercent() {
					return (this.itemMargin / this.itemRevenue) * 100;
				}
			};

			store.addItem(item);
		});

		it('should update item quantity', () => {
			store.updateItem('product-1', 5);
			expect(store.items[0].quantity).toBe(5);
		});

		it('should not update if productId not found', () => {
			store.updateItem('non-existent', 5);
			expect(store.items[0].quantity).toBe(2);
		});

		it('should update totals after updating item quantity', () => {
			store.updateItem('product-1', 4);
			const totals = store.getTotals();
			expect(totals.totalCost).toBe(40); // 4 * 10
			expect(totals.totalRevenue).toBe(60); // 4 * 15
		});

		it('should allow decimal quantities', () => {
			store.updateItem('product-1', 2.5);
			expect(store.items[0].quantity).toBe(2.5);
		});
	});

	describe('clearOrder', () => {
		beforeEach(() => {
			const item: OrderItem = {
				productId: 'product-1',
				quantity: 2,
				get itemCost() {
					return 20;
				},
				get itemRevenue() {
					return 30;
				},
				get itemMargin() {
					return this.itemRevenue - this.itemCost;
				},
				get itemMarginPercent() {
					return (this.itemMargin / this.itemRevenue) * 100;
				}
			};

			store.addItem(item);
			const order: Order = {
				id: 'order-1',
				clientId: 'client-1',
				items: [],
				status: 'draft' as const,
				totalCost: 0,
				totalRevenue: 0,
				totalMargin: 0,
				totalMarginPercent: 0,
				createdAt: new Date().toISOString(),
				completedAt: null
			};
			store.setOrder(order);
		});

		it('should clear all items', () => {
			store.clearOrder();
			expect(store.items).toEqual([]);
		});

		it('should reset order to null', () => {
			store.clearOrder();
			expect(store.order).toBeNull();
		});

		it('should reset totals to zero', () => {
			store.clearOrder();
			const totals = store.getTotals();
			expect(totals.totalCost).toBe(0);
			expect(totals.totalRevenue).toBe(0);
			expect(totals.totalMargin).toBe(0);
			expect(Number.isNaN(totals.totalMarginPercent)).toBe(true);
		});
	});

	describe('getTotals', () => {
		it('should calculate totals with multiple items', () => {
			const item1: OrderItem = {
				productId: 'product-1',
				quantity: 2,
				get itemCost() {
					return 20;
				},
				get itemRevenue() {
					return 30;
				},
				get itemMargin() {
					return this.itemRevenue - this.itemCost;
				},
				get itemMarginPercent() {
					return (this.itemMargin / this.itemRevenue) * 100;
				}
			};

			const item2: OrderItem = {
				productId: 'product-2',
				quantity: 3,
				get itemCost() {
					return 30;
				},
				get itemRevenue() {
					return 50;
				},
				get itemMargin() {
					return this.itemRevenue - this.itemCost;
				},
				get itemMarginPercent() {
					return (this.itemMargin / this.itemRevenue) * 100;
				}
			};

			store.addItem(item1);
			store.addItem(item2);

			const totals = store.getTotals();
			expect(totals.totalCost).toBe(50);
			expect(totals.totalRevenue).toBe(80);
			expect(totals.totalMargin).toBe(30);
			expect(totals.totalMarginPercent).toBeCloseTo(37.5, 1);
		});

		it('should handle zero revenue edge case', () => {
			const item: OrderItem = {
				productId: 'product-1',
				quantity: 0,
				get itemCost() {
					return 0;
				},
				get itemRevenue() {
					return 0;
				},
				get itemMargin() {
					return 0;
				},
				get itemMarginPercent() {
					return 0;
				}
			};

			store.addItem(item);
			const totals = store.getTotals();
			expect(totals.totalCost).toBe(0);
			expect(totals.totalRevenue).toBe(0);
			expect(totals.totalMargin).toBe(0);
			expect(Number.isNaN(totals.totalMarginPercent)).toBe(true);
		});
	});
});
