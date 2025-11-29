<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { OrderItem, Product } from '$lib/types/interfaces';

	interface Props {
		items: OrderItem[];
		products: Map<string, Product>;
	}

	let { items = [], products = new Map() }: Props = $props();

	const dispatch = createEventDispatcher();

	// Calculate totals
	let totals = $derived.by(() => {
		return {
			totalCost: items.reduce((sum, item) => sum + item.itemCost, 0),
			totalRevenue: items.reduce((sum, item) => sum + item.itemRevenue, 0),
			totalMargin: items.reduce((sum, item) => sum + item.itemMargin, 0),
			totalMarginPercent:
				items.reduce((sum, item) => sum + item.itemRevenue, 0) > 0
					? (items.reduce((sum, item) => sum + item.itemMargin, 0) /
							items.reduce((sum, item) => sum + item.itemRevenue, 0)) *
					  100
					: 0
		};
	});

	function handleEdit(index: number) {
		dispatch('edit', { index });
	}

	function handleDelete(index: number) {
		dispatch('delete', { index });
	}
</script>

{#if items.length === 0}
	<div class="empty-state">
		<p>No items added to the order. Cart is empty.</p>
	</div>
{:else}
	<div class="order-items-container">
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>Product</th>
					<th>Qty</th>
					<th>Purchase Price</th>
					<th>Sale Price</th>
					<th>Margin</th>
					<th>%Profit</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each items as item, index (index)}
					<tr>
						<td>{index + 1}</td>
						<td>{products.get(item.productId)?.name || 'Unknown'}</td>
						<td>{item.quantity}</td>
						<td>{item.itemCost.toFixed(2)}</td>
						<td>{item.itemRevenue.toFixed(2)}</td>
						<td>{item.itemMargin.toFixed(2)}</td>
						<td>{item.itemMarginPercent.toFixed(2)}%</td>
						<td>
							<button type="button" onclick={() => handleEdit(index)}>
								Edit
							</button>
							<button type="button" onclick={() => handleDelete(index)}>
								Delete
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<div role="region" aria-label="Order Totals" class="totals-section">
			<h3>Order Totals</h3>
			<div class="totals-grid">
				<div class="total-item">
					<span class="label">Total Cost:</span>
					<span class="value">{totals.totalCost.toFixed(2)}</span>
				</div>
				<div class="total-item">
					<span class="label">Total Revenue:</span>
					<span class="value">{totals.totalRevenue.toFixed(2)}</span>
				</div>
				<div class="total-item">
					<span class="label">Total Margin:</span>
					<span class="value">{totals.totalMargin.toFixed(2)}</span>
				</div>
				<div class="total-item">
					<span class="label">Total Profit %:</span>
					<span class="value">{totals.totalMarginPercent.toFixed(2)}%</span>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.empty-state {
		padding: 2rem;
		text-align: center;
		color: #666;
		border: 1px dashed #ccc;
		border-radius: 8px;
		background: #f9f9f9;
	}

	.order-items-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.95rem;
	}

	thead {
		background: #f5f5f5;
		border-bottom: 2px solid #ddd;
	}

	th,
	td {
		padding: 0.75rem;
		text-align: left;
		border-bottom: 1px solid #eee;
	}

	th {
		font-weight: 600;
		color: #333;
	}

	tbody tr:hover {
		background: #fafafa;
	}

	button {
		padding: 0.4rem 0.8rem;
		margin: 0 0.25rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.85rem;
		font-weight: 500;
	}

	button:first-child {
		background: #4a90e2;
		color: white;
	}

	button:first-child:hover {
		background: #357abd;
	}

	button:last-child {
		background: #e74c3c;
		color: white;
	}

	button:last-child:hover {
		background: #c0392b;
	}

	.totals-section {
		padding: 1.5rem;
		background: #f0f7ff;
		border-left: 4px solid #4a90e2;
		border-radius: 4px;
	}

	.totals-section h3 {
		margin: 0 0 1rem 0;
		font-size: 1.1rem;
		color: #333;
	}

	.totals-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.total-item {
		display: flex;
		justify-content: space-between;
		padding: 0.75rem;
		background: white;
		border-radius: 4px;
		border: 1px solid #ddd;
	}

	.label {
		font-weight: 600;
		color: #555;
	}

	.value {
		color: #4a90e2;
		font-weight: 700;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		table {
			font-size: 0.85rem;
		}

		th,
		td {
			padding: 0.5rem;
		}

		button {
			padding: 0.3rem 0.6rem;
			font-size: 0.75rem;
		}

		.totals-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
