<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Product } from '$lib/types/interfaces';

	interface Props {
		products: Product[];
		selectedProductId: string | null;
	}

	let { products = [], selectedProductId = null }: Props = $props();

	const dispatch = createEventDispatcher();

	function handleProductClick(product: Product) {
		dispatch('select', {
			productId: product.id,
			product: product
		});
	}

	function getProductIcon(productName: string): string {
		const iconMap: Record<string, string> = {
			apples: '🍎',
			oranges: '🍊',
			tomatoes: '🍅',
			lettuce: '🥬',
			bananas: '🍌',
			peppers: '🫑'
		};

		const normalized = productName.toLowerCase();
		return iconMap[normalized] || '🥕';
	}
</script>

<div role="grid" class="product-grid">
	{#if products.length === 0}
		<p class="empty-state">No products available</p>
	{:else}
		{#each products as product (product.id)}
			<button
				type="button"
				class="product-item {selectedProductId === product.id ? 'selected' : ''}"
				aria-pressed={selectedProductId === product.id}
				onclick={() => handleProductClick(product)}
			>
				<div class="product-icon" aria-label="{product.name} icon">
					<img
						src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ctext x='32' y='48' font-size='48' text-anchor='middle' dominant-baseline='central'%3E{getProductIcon(product.name)}%3C/text%3E%3C/svg%3E"
						alt="{product.name} icon"
						width="64"
						height="64"
					/>
				</div>
				<div class="product-name">{product.name}</div>
			</button>
		{/each}
	{/if}
</div>

<style>
	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
		gap: 1rem;
		padding: 1rem;
		width: 100%;
	}

	.product-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		border: 2px solid transparent;
		border-radius: 8px;
		background-color: transparent;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		min-height: 100px;
		min-width: 80px;
		touch-action: manipulation;
	}

	.product-item:hover {
		background-color: rgba(0, 0, 0, 0.05);
		transform: scale(1.05);
	}

	.product-item:active {
		transform: scale(0.98);
	}

	.product-item.selected {
		border-color: var(--color-primary, #3b82f6);
		background-color: var(--color-primary-light, rgba(59, 130, 246, 0.1));
		box-shadow: 0 0 0 2px var(--color-primary, #3b82f6);
	}

	.product-icon {
		width: 64px;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		background-color: rgba(0, 0, 0, 0.02);
	}

	.product-icon img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.product-name {
		font-size: 0.875rem;
		font-weight: 500;
		text-align: center;
		word-break: break-word;
		max-width: 80px;
		color: var(--color-text, #000);
	}

	.empty-state {
		grid-column: 1 / -1;
		text-align: center;
		padding: 2rem;
		color: #666;
		font-size: 0.95rem;
	}

	/* Mobile responsive adjustments */
	@media (max-width: 640px) {
		.product-grid {
			grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
			gap: 0.75rem;
			padding: 0.75rem;
		}

		.product-item {
			min-height: 96px;
			min-width: 72px;
		}

		.product-icon {
			width: 56px;
			height: 56px;
		}
	}

	/* Tablet responsive adjustments */
	@media (min-width: 641px) and (max-width: 1024px) {
		.product-grid {
			grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
			gap: 1rem;
		}
	}

	/* Desktop responsive adjustments */
	@media (min-width: 1025px) {
		.product-grid {
			grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
			gap: 1.25rem;
			padding: 1.5rem;
		}

		.product-item {
			min-height: 120px;
			min-width: 100px;
		}

		.product-icon {
			width: 72px;
			height: 72px;
		}

		.product-name {
			max-width: 100px;
			font-size: 0.95rem;
		}
	}
</style>
