# Utils

Utility functions and helpers for business logic and common operations.

## Guidelines

- **Pure Functions**: Keep functions pure (no side effects)
- **Type Safe**: Always use TypeScript types
- **Testing**: Include `.spec.ts` tests with 100% coverage
- **TDD**: Write tests before implementation
- **Documentation**: Add JSDoc comments for all functions
- **Naming**: Use clear, descriptive names (e.g., `calculateMargin`, `formatCurrency`)

## Categories

### Calculations (`calculations.ts`)
Business logic for financial calculations:
- `calculateItemCost(quantity, price): number`
- `calculateItemRevenue(quantity, price): number`
- `calculateMargin(cost, revenue): number`
- `calculateProfitPercentage(margin, cost): number`
- `calculateOrderTotals(items): OrderTotals`

### Formatting
Data formatting utilities:
- Currency formatting (EUR, USD, etc.)
- Date/time formatting
- Number rounding and precision

### Validation
Input validation:
- Email validation
- Phone number validation
- Price validation (non-negative, decimal places)

### Helpers
Common utilities:
- Array manipulation
- Object utilities
- String utilities

## Example

```typescript
// utils/calculations.ts
/**
 * Calculate profit margin between purchase and sale price
 * @param purchasePrice - Cost per unit
 * @param salePrice - Selling price per unit
 * @returns Margin amount
 */
export function calculateMargin(purchasePrice: number, salePrice: number): number {
  if (purchasePrice < 0 || salePrice < 0) {
    throw new Error('Prices must be non-negative');
  }
  return salePrice - purchasePrice;
}
```
