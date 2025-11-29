<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Product } from '$lib/types/interfaces';
	import { calculateItemCost, calculateItemRevenue, calculateMargin, calculateProfitPercentage } from '$lib/utils/calculations';

	interface Props {
		products: Product[];
	}

	let { products = [] }: Props = $props();

	const dispatch = createEventDispatcher();

	let selectedProductId: string | null = $state(null);
	let quantity: number | null = $state(null);
	let purchasePrice: number | null = $state(null);
	let salePrice: number | null = $state(null);

	// Calculate derived values
	let margin = $derived.by(() => {
		if (quantity === null || purchasePrice === null || salePrice === null) return 0;
		const cost = calculateItemCost(quantity, purchasePrice);
		const revenue = calculateItemRevenue(quantity, salePrice);
		return calculateMargin(cost, revenue);
	});

	let marginPercentage = $derived.by(() => {
		if (quantity === null || purchasePrice === null || salePrice === null) return 0;
		const revenue = calculateItemRevenue(quantity, salePrice);
		if (revenue === 0) return 0;
		return calculateProfitPercentage(margin, revenue);
	});

	let isFormValid = $derived.by(() => {
		const isProductSelected = selectedProductId !== null && selectedProductId !== '';
		const isQuantityValid = quantity !== null && quantity > 0;
		const isPurchasePriceValid = purchasePrice !== null && purchasePrice >= 0;
		const isSalePriceValid = salePrice !== null && salePrice >= purchasePrice;
		return isProductSelected && isQuantityValid && isPurchasePriceValid && isSalePriceValid;
	});

	function handleAddClick() {
		if (!isFormValid) return;

		dispatch('add', {
			productId: selectedProductId,
			quantity: quantity,
			purchasePrice: purchasePrice,
			salePrice: salePrice
		});

		resetForm();
	}

	function handleCancelClick() {
		dispatch('cancel');
		resetForm();
	}

	function resetForm() {
		selectedProductId = null;
		quantity = null;
		purchasePrice = null;
		salePrice = null;
	}
</script>

<form role="form">
	<div>
		<label for="product-select">Product</label>
		<select id="product-select" bind:value={selectedProductId}>
			<option value="">-- Select Product --</option>
			{#each products as product (product.id)}
				<option value={product.id}>{product.name}</option>
			{/each}
		</select>
	</div>

	<div>
		<label for="quantity-input">Quantity</label>
		<input
			id="quantity-input"
			type="number"
			step="0.01"
			bind:value={quantity}
			placeholder="0"
		/>
	</div>

	<div>
		<label for="purchase-price-input">Purchase Price</label>
		<input
			id="purchase-price-input"
			type="number"
			step="0.01"
			bind:value={purchasePrice}
			placeholder="0"
		/>
	</div>

	<div>
		<label for="sale-price-input">Sale Price</label>
		<input
			id="sale-price-input"
			type="number"
			step="0.01"
			bind:value={salePrice}
			placeholder="0"
		/>
	</div>

	<div>
		<p>Margin: {margin.toFixed(2)}</p>
		<p>Margin Percentage: {marginPercentage.toFixed(2)}%</p>
	</div>

	<button
		type="button"
		disabled={!isFormValid}
		onclick={handleAddClick}
	>
		Add
	</button>
	<button
		type="button"
		onclick={handleCancelClick}
	>
		Cancel
	</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-weight: bold;
	}

	input,
	select {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bold;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
