# Stores

Svelte 5 rune-based state management for Kassa.

## Guidelines

- **Use Runes**: Prefer `$state`, `$derived`, and `$effect` over legacy stores
- **Singleton Pattern**: Most stores are singletons initialized on app startup
- **Type Safety**: Export types for all store states
- **Testing**: Include `.svelte.spec.ts` tests with TDD approach
- **No Side Effects in $derived**: Keep derived values pure and reactive

## Store Patterns

### State Store with Derived Values

```typescript
// stores/order.svelte.ts
import { $state, $derived } from 'svelte';
import type { Order } from '$lib';

export function createOrderStore() {
  let order = $state<Order | null>(null);
  let items = $state<OrderItem[]>([]);

  const totals = $derived.by(() => calculateOrderTotals(items));

  return {
    get order() { return order; },
    set order(value) { order = value; },
    get items() { return items; },
    addItem: (item: OrderItem) => { items.push(item); },
    getTotals: () => totals,
  };
}
```

### Usage in Components

```svelte
<script lang="ts">
  import { orderStore } from '$lib/stores/order.svelte.ts';

  const store = orderStore();

  function addItem() {
    store.addItem({ /* ... */ });
  }
</script>
```

## Available Stores

- `order.svelte.ts` - Active order state
- `clients.svelte.ts` - Clients and active client
- `products.svelte.ts` - Products catalog
