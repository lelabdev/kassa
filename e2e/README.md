# E2E Tests

End-to-end tests using Playwright for complete user workflows.

## Guidelines

- **User-Centric**: Test from a user's perspective, not implementation details
- **Full Workflows**: Test complete business scenarios (e.g., "add client → create order → calculate margin → complete order")
- **Offline Testing**: Test offline mode functionality (DevTools Network > Offline)
- **Visual**: Test responsive design on mobile/tablet/desktop
- **Wait for Elements**: Use proper waits for asynchronous operations
- **Cleanup**: Each test should be independent and clean up after itself

## Test Structure

```typescript
// e2e/workflow.test.ts
import { test, expect } from '@playwright/test';

test.describe('Sales Workflow', () => {
  test('should create order from start to finish', async ({ page }) => {
    // Setup
    await page.goto('http://localhost:5173');

    // User action: Add client
    await page.click('button:has-text("Add Client")');
    await page.fill('input[name="clientName"]', 'John Doe');
    await page.click('button:has-text("Save")');

    // User action: Add product to order
    await page.click('[data-product="apple"]');
    await page.fill('input[name="quantity"]', '5');
    await page.fill('input[name="price"]', '1.50');

    // Verify: Margin displays correctly
    await expect(page.locator('[data-margin]')).toContainText('1.50');

    // User action: Complete order
    await page.click('button:has-text("Complete Order")');

    // Verify: Order saved
    await expect(page.locator('[data-order-count]')).toContainText('1');
  });

  test('should work offline', async ({ page, context }) => {
    // Load app first
    await page.goto('http://localhost:5173');

    // Go offline
    await context.setOffline(true);

    // App should still work
    await page.click('[data-product="apple"]');
    await expect(page.locator('[data-form]')).toBeVisible();

    // Go online
    await context.setOffline(false);
  });
});
```

## Running Tests

```bash
# Run all e2e tests
pnpm test:e2e

# Run in headed mode (see browser)
pnpm test:e2e --headed

# Run single file
pnpm test:e2e workflow.test.ts

# Debug mode
pnpm test:e2e --debug
```

## Debugging

- Use `page.pause()` to stop execution
- Use `page.screenshot({ path: 'screenshot.png' })` for screenshots
- Use Playwright Inspector: `PWDEBUG=1 pnpm test:e2e`
- Check `test-results/` for failure artifacts

## Phases

- **Phase 1**: Basic workflow (add product, calculate margin)
- **Phase 2**: Multi-client workflow (switch clients, save orders)
- **Phase 3**: History and statistics
- **Phase 6**: Full test suite completion
