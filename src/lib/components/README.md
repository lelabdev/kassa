# Components

Reusable Svelte components for the Kassa application.

## Guidelines

- **Single Responsibility**: Each component should have one clear purpose
- **Props**: Use TypeScript props for type safety
- **Events**: Use `dispatch()` for custom events (e.g., `on:addProduct`)
- **Testing**: Include `.svelte.spec.ts` tests for each component
- **Documentation**: Add JSDoc comments for public props and events

## Structure

Components are organized by feature:
- Form components (ProductForm, ClientForm, etc.)
- Display components (OrderItems, ProductGrid, etc.)
- Layout components (Header, Footer, etc.)
- Utility components (Modal, Toast, etc.)

## Example

```svelte
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Product } from '$lib';

  interface Props {
    product: Product;
    disabled?: boolean;
  }

  let { product, disabled = false }: Props = $props();
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('select', product);
  }
</script>
```
