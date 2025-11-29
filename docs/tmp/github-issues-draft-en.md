# 📋 GitHub Issues Draft for Kassa (TDD Approach)

Complete GitHub Issues draft for the Kassa project using **Test-Driven Development (TDD)**. Base setup is already done (SvelteKit, Svelte 5, Skeleton, Tailwind, TypeScript, ESLint, Prettier, Vitest, Playwright).

---

## 🧪 TDD Approach for This Project

**Red → Green → Refactor**

For each issue, the workflow is:

1. **🔴 RED**: Write tests first
   - Create `.spec.ts` / `.svelte.spec.ts` test files
   - Write all test cases (happy path, edge cases, errors)
   - Tests must fail at this point (it's expected!)

2. **🟢 GREEN**: Write minimum code to pass tests
   - Implement only what's necessary
   - Don't add polish or extra features
   - All tests must pass

3. **🔵 REFACTOR**: Improve and clean up
   - Refactor code if necessary
   - Improve readability and performance
   - Tests must continue to pass

**TDD Benefits for this project:**
- ✅ More robust code (100% coverage by default)
- ✅ Financial/math calculations = critical tests (no margin errors!)
- ✅ Facilitates future refactoring
- ✅ Living documentation (tests = spec)
- ✅ Offline-first complexity = needs solid tests

---

## ⚡ PHASE 0: REMAINING SETUP (Essential Foundations)

### Issue 0.1: Configure PouchDB + TypeScript Types (#GH-4)
**Type**: Setup
**Labels**: `setup`, `database`, `pouchdb`, `critical`
**Priority**: 🔴 Critical
**Description**:
Install and configure PouchDB for offline-first persistence:
- Install pouchdb and TypeScript types
- Create initial PouchDB configuration
- Create TypeScript interfaces for documents (Client, Product, Order, OrderItem)
- Create PouchDB initialization module in lib/db
- Test document creation and retrieval
- Verify IndexedDB works in DevTools

**Tasks**:
- [ ] `pnpm add pouchdb`
- [ ] `pnpm add -D @types/pouchdb`
- [ ] Create src/lib/types/database.ts with interfaces
- [ ] Create src/lib/db/database.ts with PouchDB initialization
- [ ] Test: create a doc, reload page, verify persistence
- [ ] Verify IndexedDB in DevTools > Application > Storage

**Acceptance Criteria**:
- PouchDB initializes without errors
- Data persists after page reload
- TypeScript types are correct (no `any`)
- IndexedDB visible in DevTools

---

### Issue 0.2: Verify & Complete Project Structure (#GH-5)
**Type**: Setup
**Labels**: `setup`, `architecture`
**Priority**: 🟡 High
**Description**:
Verify and complete folder structure:
- src/lib/components/ for reusable components
- src/lib/types/ for TypeScript interfaces
- src/lib/stores/ for Svelte 5 state management
- src/lib/utils/ for utilities
- src/lib/db/ for PouchDB operations
- e2e/ for Playwright tests
- src/lib/index.ts for public exports

**Tasks**:
- [ ] Verify existing structure
- [ ] Create missing directories
- [ ] Create src/lib/index.ts with exports
- [ ] Add README in each important directory

**Acceptance Criteria**:
- Clear and coherent structure
- Easy to navigate and maintain
- $lib alias works correctly

---

### Issue 0.3: Configure PWA and Service Worker (#GH-6)
**Type**: Setup
**Labels**: `setup`, `pwa`, `service-worker`, `offline-first`
**Priority**: 🟡 High
**Description**:
Configure the app as a PWA with service worker for offline operation:
- Create a base service worker
- Implement offline-first caching strategy
- Add manifest.json for PWA
- Test offline mode (DevTools)
- Add PWA metadata (meta tags, icons)

**Tasks**:
- [ ] Create src/service-worker.ts
- [ ] Configure caching strategy (cache-first or stale-while-revalidate)
- [ ] Create public/manifest.json
- [ ] Add PWA meta tags in app.html (theme-color, viewport, etc.)
- [ ] Add icons (favicon, app icon)
- [ ] Register service worker in +layout.svelte
- [ ] Test offline: DevTools > Network > Offline, then refresh

**Acceptance Criteria**:
- App fully functional offline
- Service worker registered and visible in DevTools
- Can be installed as an app on mobile
- manifest.json is valid

---

### Issue 0.4: Configure Environment Variables & Config (#GH-7)
**Type**: Setup
**Labels**: `setup`, `config`, `environment`
**Priority**: 🟡 Medium
**Description**:
Configure environment variable management:
- Create .env.example with documentation
- Create src/lib/config.ts for centralized config
- Support dev, preview, production environments
- Document required and optional variables

**Tasks**:
- [ ] Create .env.example with all variables
- [ ] Create .env.local for dev (git ignored)
- [ ] Create src/lib/config.ts with import.meta.env
- [ ] Document the variables
- [ ] Verify .gitignore ignores .env files

**Acceptance Criteria**:
- Config centralized and typed
- No secrets in git
- Works in dev, preview, production

---

### Issue 0.5: Verify Cloudflare Adapter Configuration (#GH-8)
**Type**: Setup
**Labels**: `setup`, `deployment`, `cloudflare`
**Priority**: 🟡 Medium
**Description**:
Verify and finalize Cloudflare configuration:
- @sveltejs/adapter-cloudflare is already installed
- Verify build works: `pnpm build`
- Configure wrangler.toml if necessary
- Plan deployment strategy (Pages, Workers)
- Test build and preview: `pnpm preview`

**Tasks**:
- [ ] `pnpm build` - verify no errors
- [ ] `pnpm preview` - test locally (port 4173)
- [ ] Configure wrangler.toml if using Pages
- [ ] Verify offline works in preview

**Acceptance Criteria**:
- Build succeeds without warnings
- Preview works correctly
- Offline works in preview

---

### Issue 0.6: Setup CI/CD - GitHub Actions (#GH-9)
**Type**: Setup
**Labels**: `setup`, `ci-cd`, `github-actions`
**Priority**: 🟡 Low
**Description**:
Configure GitHub Actions pipelines:
- Workflow for tests (lint, unit, e2e)
- Workflow for build
- Optional: Workflow for auto-deploy to Cloudflare

**Tasks**:
- [ ] Create .github/workflows/test.yml
- [ ] Create .github/workflows/build.yml
- [ ] Test workflows on PRs
- [ ] Optional: deployment workflow

**Acceptance Criteria**:
- Tests pass in CI
- Build succeeds in CI

---

## 🎯 PHASE 1: MVP FEATURES - CORE CALCULATIONS

### Issue 1.1: TypeScript Interfaces for Business Domain (#GH-10)
**Type**: Feature / Architecture
**Labels**: `feature`, `architecture`, `types`, `core`
**Priority**: 🔴 Critical
**Description**:
Create and document all TypeScript types for the business domain:
- Type Client (id, name, email?, phone?)
- Type Product (id, name, icon?, defaultPrice?)
- Type OrderItem (productId, quantity, purchasePrice, salePrice)
- Type Order (id, clientId, items[], createdAt, status)
- Type CalculatedMargin (purchaseTotal, saleTotal, margin, profitPercentage)

**Tasks**:
- [ ] Create src/lib/types/business.ts
- [ ] Define all interfaces without `any`
- [ ] Export in src/lib/index.ts
- [ ] Add JSDoc comments

**Acceptance Criteria**:
- Types complete and documented
- Usable throughout the app
- No `any` types

---

### Issue 1.2: Calculate Margins and Totals Logic (TDD) (#GH-11)
**Type**: Feature
**Labels**: `feature`, `calculation`, `core`, `logic`, `tdd`
**Priority**: 🔴 Critical
**Description**:
Implement business logic for calculations using TDD:
- `calculateItemCost(quantity: number, pricePerUnit: number): number`
- `calculateItemRevenue(quantity: number, salePrice: number): number`
- `calculateMargin(cost: number, revenue: number): number`
- `calculateProfitPercentage(margin: number, cost: number): number`
- `calculateOrderTotals(items: OrderItem[]): OrderTotals`

**TDD Workflow:**

**🔴 RED - Write tests first:**
- [ ] Create src/lib/utils/calculations.spec.ts
- [ ] Test calculateItemCost: normal case, decimals, zero, large values
- [ ] Test calculateItemRevenue: same coverage
- [ ] Test calculateMargin: positive, negative, zero margins
- [ ] Test calculateProfitPercentage: avoid division by zero, decimals
- [ ] Test calculateOrderTotals: empty order, single item, multiple items
- [ ] `pnpm test:unit calculations` → all fail ✓

**🟢 GREEN - Write minimum code:**
- [ ] Create src/lib/utils/calculations.ts
- [ ] Implement the 5 functions (no polish, just pass tests)
- [ ] `pnpm test:unit calculations` → all pass ✓

**🔵 REFACTOR - Improve:**
- [ ] Review for performance if needed
- [ ] Improve readability
- [ ] Add JSDoc comments
- [ ] `pnpm test:unit calculations` → all pass ✓

**Acceptance Criteria**:
- ✅ 100% coverage on calculations.ts
- ✅ All tests pass
- ✅ Tests cover: normal case, decimals, zeros, negatives, division by zero, edge cases

---

### Issue 1.3: Svelte Store for Active Order (Svelte 5 Runes - TDD) (#GH-12)
**Type**: Feature
**Labels**: `feature`, `state-management`, `svelte-runes`, `core`, `tdd`
**Priority**: 🔴 Critical
**Description**:
Create a Svelte 5 store for the active order using TDD:
- `$state` for current order
- `$state` for items list
- `$derived` for calculated totals
- Functions: addItem(), removeItem(), updateItem(), clearOrder()
- Sync with PouchDB

**TDD Workflow:**

**🔴 RED - Write tests first:**
- [ ] Create src/lib/stores/order.svelte.spec.ts
- [ ] Test addItem: normal addition, verify state changes
- [ ] Test removeItem: remove existing, remove non-existent
- [ ] Test updateItem: normal update, quantity to zero
- [ ] Test clearOrder: clear non-empty, clear empty order
- [ ] Test $derived: totals recalculate after add/remove
- [ ] Test reactivity: use $state.snapshot() to verify states
- [ ] `pnpm test:unit order` → all fail ✓

**🟢 GREEN - Write minimum code:**
- [ ] Create src/lib/stores/order.svelte.ts
- [ ] Implement $state for order and items
- [ ] Implement $derived for totals (reuse calculateOrderTotals from 1.2)
- [ ] Implement the 4 functions
- [ ] `pnpm test:unit order` → all pass ✓

**🔵 REFACTOR - Improve:**
- [ ] Optimize reactivity if needed
- [ ] Add JSDoc
- [ ] Verify PouchDB sync (issue 2.6)
- [ ] `pnpm test:unit order` → all pass ✓

**Acceptance Criteria**:
- ✅ 100% coverage on order.svelte.ts
- ✅ All tests pass
- ✅ $derived updates automatically
- ✅ Usable in components with $effect

---

### Issue 1.4: Product Form Component (#GH-13)
**Type**: Feature
**Labels**: `feature`, `ui`, `component`, `form`, `core`
**Priority**: 🔴 High
**Description**:
Component for entering product details into an order:
- Product selection (dropdown or grid)
- Quantity input (decimal)
- Purchase price input (decimal)
- Sale price input (decimal)
- Real-time calculation display (margin, %)
- Buttons: Add / Cancel
- Input validation

**Tasks**:
- [ ] Create src/lib/components/ProductForm.svelte
- [ ] Use Skeleton Labs Button, Input, Select
- [ ] Real-time validation with feedback
- [ ] Display calculations below inputs
- [ ] Dispatch on:addProduct event with data
- [ ] Test the form

**Acceptance Criteria**:
- Form works correctly
- Calculations display in real-time
- Validation is clear

---

### Issue 1.5: Product Grid Component (POS-style) (#GH-14)
**Type**: Feature
**Labels**: `feature`, `ui`, `component`, `ux-core`, `packing`
**Priority**: 🔴 Critical
**Description**:
POS-style product selection grid:
- Responsive grid of products
- Large, touch-friendly icons (min 64x64px)
- Product name below icon
- Click: shows ProductForm
- Visual indicator of selected product
- Smooth on mobile, no lag

**Tasks**:
- [ ] Create src/lib/components/ProductGrid.svelte
- [ ] Fetch products from PouchDB
- [ ] Tailwind responsive grid (1-2-3 columns by screen)
- [ ] Icons (emoji, SVG, or images)
- [ ] Click = show ProductForm
- [ ] Test on multiple resolutions

**Acceptance Criteria**:
- Grid responsive
- Icons large and touch-friendly
- No lag, smooth
- Responsive on mobile/tablet/desktop

---

### Issue 1.6: Order Items Display Component (#GH-15)
**Type**: Feature
**Labels**: `feature`, `ui`, `component`, `order-display`
**Priority**: 🔴 High
**Description**:
Display added items in the order:
- List/table of items: product, qty, purchasePrice, salePrice, margin, %profit
- Buttons to edit/delete each item
- Totals at bottom: totalCost, totalRevenue, totalMargin, %profitTotal
- Item numbering
- Scroll if many items
- Mobile-friendly

**Tasks**:
- [ ] Create src/lib/components/OrderItems.svelte
- [ ] Display list/table of items
- [ ] Edit/delete buttons
- [ ] Display totals with styling
- [ ] Currency formatting (2 decimals)
- [ ] Test the component

**Acceptance Criteria**:
- Items display correctly
- Totals update in real-time
- Interface clear and readable

---

### Issue 1.7: Main Home Page / Layout (#GH-16)
**Type**: Feature
**Labels**: `feature`, `ui`, `page`, `layout`, `core`
**Priority**: 🔴 High
**Description**:
Main application layout:
- 2-column grid: ProductGrid | OrderItems (desktop)
- Adaptive layout for mobile (ProductGrid top, OrderItems bottom)
- Header: active client name, menu
- Footer: action buttons (Validate order, etc.)
- Navigation to other pages

**Tasks**:
- [ ] Create/modify src/routes/+page.svelte
- [ ] 2-column responsive layout
- [ ] Header and footer
- [ ] Integrate ProductGrid and OrderItems
- [ ] Basic navigation
- [ ] Test responsive

**Acceptance Criteria**:
- Layout works on desktop and mobile
- All elements visible
- Navigation works

---

## 🏢 PHASE 2: MULTI-CLIENT & PERSISTENCE

### Issue 2.1: Svelte Store for Clients and Orders (#GH-17)
**Type**: Feature
**Labels**: `feature`, `state-management`, `svelte-runes`, `clients`, `tdd`
**Priority**: 🟡 Critical
**Description**:
Svelte 5 store for managing clients and their orders using TDD:
- `$state` for clients list
- `$state` for active client
- `$derived` for active client's orders
- Functions: addClient(), deleteClient(), setActiveClient()
- Load clients from PouchDB on startup

**TDD Workflow:**

**🔴 RED - Write tests first:**
- [ ] Create src/lib/stores/clients.svelte.spec.ts
- [ ] Test addClient: normal addition, verify it's in list
- [ ] Test deleteClient: delete existing, delete non-existent
- [ ] Test setActiveClient: change active client
- [ ] Test $derived: active client's orders update
- [ ] `pnpm test:unit clients` → all fail ✓

**🟢 GREEN - Write minimum code:**
- [ ] Create src/lib/stores/clients.svelte.ts
- [ ] Implement $state for clients and active client
- [ ] Implement $derived for active client's orders
- [ ] Load from PouchDB on startup
- [ ] `pnpm test:unit clients` → all pass ✓

**🔵 REFACTOR - Improve:**
- [ ] Add JSDoc
- [ ] Optimize if needed
- [ ] `pnpm test:unit clients` → all pass ✓

**Acceptance Criteria**:
- ✅ All tests pass
- ✅ Clients loaded on startup
- ✅ Client switching works

---

### Issue 2.2: PouchDB CRUD for Clients (#GH-18)
**Type**: Feature
**Labels**: `feature`, `database`, `pouchdb`, `crud`, `core`, `tdd`
**Priority**: 🟡 Critical
**Description**:
CRUD operations for clients in PouchDB using TDD:
- createClient(data): Promise<Client>
- getClients(): Promise<Client[]>
- updateClient(id, data): Promise<Client>
- deleteClient(id): Promise<void>
- Error handling

**TDD Workflow:**

**🔴 RED - Write tests first:**
- [ ] Create src/lib/db/clients.spec.ts
- [ ] Test createClient: normal creation, missing required fields
- [ ] Test getClients: returns array, empty when no clients
- [ ] Test updateClient: update existing, update non-existent
- [ ] Test deleteClient: delete existing, delete non-existent
- [ ] Test error handling
- [ ] `pnpm test:unit clients.db` → all fail ✓

**🟢 GREEN - Write minimum code:**
- [ ] Create src/lib/db/clients.ts
- [ ] Implement 4 CRUD functions
- [ ] Error handling with try/catch
- [ ] `pnpm test:unit clients.db` → all pass ✓

**🔵 REFACTOR - Improve:**
- [ ] Add JSDoc
- [ ] Verify data in DevTools
- [ ] `pnpm test:unit clients.db` → all pass ✓

**Acceptance Criteria**:
- ✅ CRUD works completely
- ✅ No PouchDB errors
- ✅ Data persists

---

### Issue 2.3: PouchDB CRUD for Orders (#GH-19)
**Type**: Feature
**Labels**: `feature`, `database`, `pouchdb`, `crud`, `core`, `tdd`
**Priority**: 🟡 Critical
**Description**:
CRUD operations for orders in PouchDB using TDD:
- createOrder(clientId, items): Promise<Order>
- getOrdersByClient(clientId): Promise<Order[]>
- updateOrder(id, data): Promise<Order>
- deleteOrder(id): Promise<void>
- getOrdersByStatus(status): Promise<Order[]>

**TDD Workflow:**

**🔴 RED - Write tests first:**
- [ ] Create src/lib/db/orders.spec.ts
- [ ] Test all CRUD operations
- [ ] Test filtering by clientId and status
- [ ] `pnpm test:unit orders.db` → all fail ✓

**🟢 GREEN - Write minimum code:**
- [ ] Create src/lib/db/orders.ts
- [ ] Implement 5 functions
- [ ] `pnpm test:unit orders.db` → all pass ✓

**🔵 REFACTOR - Improve:**
- [ ] Add JSDoc
- [ ] `pnpm test:unit orders.db` → all pass ✓

**Acceptance Criteria**:
- ✅ CRUD works
- ✅ Filtering works
- ✅ Data persists

---

### Issue 2.4: Client Form Component (#GH-20)
**Type**: Feature
**Labels**: `feature`, `ui`, `component`, `form`
**Priority**: 🟡 Medium
**Description**:
Form for creating/editing a client:
- Input: name (required)
- Input: phone (optional)
- Input: email (optional)
- Validation: name not empty
- Buttons: Save / Cancel
- Modal or dedicated page

**Tasks**:
- [ ] Create src/lib/components/ClientForm.svelte
- [ ] Skeleton Labs inputs
- [ ] Real-time validation
- [ ] Mode: add/edit
- [ ] Call createClient or updateClient
- [ ] Test form

**Acceptance Criteria**:
- Form works
- Validation correct
- Client saved to DB

---

### Issue 2.5: Client Switcher Component (#GH-21)
**Type**: Feature
**Labels**: `feature`, `ui`, `component`, `navigation`
**Priority**: 🟡 High
**Description**:
Component for switching between clients:
- Dropdown/select of clients
- Shows active client
- "+ Add client" button
- Fast and reactive

**Tasks**:
- [ ] Create src/lib/components/ClientSwitcher.svelte
- [ ] Skeleton Labs select with all clients
- [ ] On change: setActiveClient()
- [ ] "+ Add" button to open form
- [ ] Integrate in header

**Acceptance Criteria**:
- Switcher shows clients
- Switching is fast
- Add client possible

---

### Issue 2.6: Save & Restore Active Order by Client (#GH-22)
**Type**: Feature
**Labels**: `feature`, `persistence`, `ux`, `workflow`
**Priority**: 🟡 Medium
**Description**:
When changing clients, save/restore the active order:
- On client change: save current order to PouchDB (if not empty)
- On client select: load their last active order (or create new)
- Transparent to user

**Tasks**:
- [ ] Modify order.svelte.ts to add clientId
- [ ] On client change: save order
- [ ] On select: load last order or create new
- [ ] Test workflow

**Acceptance Criteria**:
- Orders saved correctly
- No data loss
- Transparent to user

---

## 📊 PHASE 3: HISTORY & STATISTICS

### Issue 3.1: Mark Order as Completed (#GH-23)
**Type**: Feature
**Labels**: `feature`, `workflow`, `history`, `core`
**Priority**: 🟡 High
**Description**:
Add order validation workflow:
- "Validate / Complete Order" button in OrderItems
- On click: confirmation dialog
- Mark order as "completed"
- Add dateFinished
- Create new empty order for client
- User feedback (toast)

**Tasks**:
- [ ] Add status and dateFinished to Order type
- [ ] Create validation button
- [ ] Confirmation dialog Skeleton Labs
- [ ] Logic: mark + create new
- [ ] Tests

**Acceptance Criteria**:
- Order marked completed
- New order created
- History populated

---

### Issue 3.2: Sales History Page by Day (#GH-24)
**Type**: Feature
**Labels**: `feature`, `history`, `page`, `analytics`
**Priority**: 🟡 Medium
**Description**:
Page showing history grouped by day:
- Shows days with sales
- Per day: list of orders, day totals
- Click order: see details (items, calculations)
- Optional filters: by date, by client

**Tasks**:
- [ ] Create src/routes/history/+page.svelte
- [ ] PouchDB query grouped by day
- [ ] Display days and totals
- [ ] Show orders per day
- [ ] Click for details
- [ ] Navigation from main page

**Acceptance Criteria**:
- History displays
- Grouping by day works
- Details accessible

---

### Issue 3.3: Global Statistics by Period (#GH-25)
**Type**: Feature
**Labels**: `feature`, `statistics`, `analytics`
**Priority**: 🟢 Low
**Description**:
Add global stats:
- Total sales per day/week/month
- Total margins
- Number of orders
- Average order amount

**Tasks**:
- [ ] Create src/lib/utils/statistics.ts
- [ ] Stats calculation functions
- [ ] Tests
- [ ] Display in history

**Acceptance Criteria**:
- Stats calculated correctly
- Displayed clearly

---

### Issue 3.4: Sales Charts (Chart.js or Recharts) (#GH-26)
**Type**: Feature
**Labels**: `feature`, `charts`, `analytics`, `future`
**Priority**: 🟢 Low
**Description**:
Add visualizations:
- Sales chart per day (last 30 days)
- Best-selling products chart
- Responsive and interactive

**Tasks**:
- [ ] Choose Chart.js or Recharts
- [ ] Install and configure
- [ ] Create chart components
- [ ] Add "Analytics" page
- [ ] Visual tests

**Acceptance Criteria**:
- Charts display
- Data current
- Responsive

---

## ⚙️ PHASE 4: CONFIGURATION & SETTINGS

### Issue 4.1: PouchDB CRUD for Products (#GH-27)
**Type**: Feature
**Labels**: `feature`, `database`, `pouchdb`, `crud`, `tdd`
**Priority**: 🟡 Medium
**Description**:
CRUD operations for products in PouchDB using TDD:
- createProduct(name, icon?, defaultPrice?): Promise<Product>
- getProducts(): Promise<Product[]>
- updateProduct(id, data): Promise<Product>
- deleteProduct(id): Promise<void>

**TDD Workflow:**
- Write tests first in src/lib/db/products.spec.ts
- Implement functions in src/lib/db/products.ts
- All tests pass

**Acceptance Criteria**:
- ✅ CRUD works
- ✅ Products usable in ProductGrid
- ✅ Data persists

---

### Issue 4.2: Svelte Store for Products (#GH-28)
**Type**: Feature
**Labels**: `feature`, `state-management`, `svelte-runes`, `products`, `tdd`
**Priority**: 🟡 Medium
**Description**:
Store for managing products list using TDD:
- `$state` for products list
- Load from PouchDB on startup
- Sync changes

**TDD Workflow:**
- Write tests first
- Implement store
- All tests pass

**Acceptance Criteria**:
- ✅ Products loaded on startup
- ✅ Usable in ProductGrid

---

### Issue 4.3: Products Management Page (#GH-29)
**Type**: Feature
**Labels**: `feature`, `settings`, `products`, `ui`
**Priority**: 🟡 Medium
**Description**:
UI for managing products:
- Create product (form)
- Edit product
- Delete product
- List all products (table or cards)

**Tasks**:
- [ ] Create src/routes/settings/products/+page.svelte
- [ ] ProductForm component
- [ ] Display products list
- [ ] Delete buttons
- [ ] Tests

**Acceptance Criteria**:
- CRUD accessible from UI
- Products visible
- Delete works

---

### Issue 4.4: General Settings Page (#GH-30)
**Type**: Feature
**Labels**: `feature`, `settings`, `config`
**Priority**: 🟢 Low
**Description**:
Settings page:
- Currency (EUR, USD, etc.)
- Language (FR, EN, etc.)
- Theme (light/dark) - optional
- Export/Import data
- About

**Tasks**:
- [ ] Create src/routes/settings/+page.svelte
- [ ] Settings store
- [ ] Settings form
- [ ] Persist to PouchDB
- [ ] Export/Import (optional)

**Acceptance Criteria**:
- Settings saved
- Currency/language applied

---

## 🔄 PHASE 5: SYNC & OFFLINE

### Issue 5.1: Connectivity Detection (#GH-31)
**Type**: Feature
**Labels**: `feature`, `sync`, `offline`, `ux`, `tdd`
**Priority**: 🟡 Medium
**Description**:
Detect and display connectivity status using TDD:
- Use navigator.onLine
- Svelte store for status
- Display "Online" / "Offline" indicator

**TDD Workflow:**
- Write tests for connectivity detection
- Implement store
- Create indicator component

**Acceptance Criteria**:
- ✅ Indicator displays
- ✅ Detection correct

---

### Issue 5.2: Sync PouchDB to CouchDB (Optional) (#GH-32)
**Type**: Feature
**Labels**: `feature`, `sync`, `replication`, `future`, `tdd`
**Priority**: 🟢 Low
**Description**:
Sync to CouchDB server using TDD:
- Configurable CouchDB endpoint
- Auto sync when online
- Error handling
- Sync status indicator

**TDD Workflow:**
- Write tests for sync logic
- Implement replication
- Test with mock CouchDB

**Acceptance Criteria**:
- ✅ Sync works
- ✅ Data synchronized
- ✅ Error handling correct

---

## 🧪 PHASE 6: TESTS & QUALITY

### Issue 6.1: Complete Unit Tests (#GH-33)
**Type**: Test
**Labels**: `test`, `quality`, `unit-tests`, `tdd`
**Priority**: 🟡 High
**Description**:
Complete unit test suite:
- calculations.ts: 100% coverage
- Svelte stores: reactive behavior
- Utils: formatting, validation, etc.
- All cases: decimals, zeros, negatives, edge cases

**Tasks**:
- [ ] Parameterized tests for calculations
- [ ] Store tests (add, remove, update)
- [ ] Utils tests
- [ ] Coverage > 80% global, 100% on critical code
- [ ] `pnpm test:unit` passes

**Acceptance Criteria**:
- ✅ Coverage > 80% global
- ✅ Coverage 100% on calculations.ts
- ✅ All tests pass

---

### Issue 6.2: Svelte Component Tests (#GH-34)
**Type**: Test
**Labels**: `test`, `quality`, `component-tests`
**Priority**: 🟡 Medium
**Description**:
Tests for main components:
- ProductGrid, OrderItems, ClientSwitcher
- Forms (ProductForm, ClientForm)
- User interaction (click, input, etc.)

**Tasks**:
- [ ] Tests for key components
- [ ] Interaction tests (click, input)
- [ ] Render tests
- [ ] Playwright browser tests

**Acceptance Criteria**:
- ✅ Key components tested
- ✅ Interactions verified

---

### Issue 6.3: E2E Tests - Business Workflows (#GH-35)
**Type**: Test
**Labels**: `test`, `quality`, `e2e-tests`, `tdd`
**Priority**: 🟡 Medium
**Description**:
End-to-end tests for business workflows:
- Add client and order
- Add products to order
- Calculate and display margins
- Validate order
- View history
- Test offline mode

**Tasks**:
- [ ] Test complete sales workflow
- [ ] Test offline mode
- [ ] Test multi-client
- [ ] `pnpm test:e2e` passes

**Acceptance Criteria**:
- ✅ Workflows tested end-to-end
- ✅ Offline works in E2E
- ✅ All tests pass

---

### Issue 6.4: Performance & Accessibility Tests (#GH-36)
**Type**: Test
**Labels**: `test`, `quality`, `a11y`, `performance`
**Priority**: 🟢 Medium
**Description**:
Performance and accessibility testing:
- Lighthouse score
- Axe accessibility scan
- Performance metrics (LCP, FID, CLS)
- Mobile device testing if possible

**Tasks**:
- [ ] Lighthouse audit
- [ ] Axe accessibility test
- [ ] Performance profiling
- [ ] Optimizations if needed

**Acceptance Criteria**:
- ✅ Lighthouse > 85
- ✅ WCAG AA compliant
- ✅ Performance acceptable

---

## 📦 PHASE 7: POLISH & DOCUMENTATION

### Issue 7.1: Responsive Design - All Screens (#GH-37)
**Type**: Enhancement
**Labels**: `enhancement`, `ux`, `responsive`
**Priority**: 🟡 High
**Description**:
Ensure complete responsive design:
- Test on iOS Safari (if possible)
- Test on Chrome Android
- Test on tablets
- Test on desktop
- Optimization if needed

**Tasks**:
- [ ] Test on real/emulated devices
- [ ] Layout adjustments
- [ ] Touch tests
- [ ] Mobile DevTools debugging

**Acceptance Criteria**:
- ✅ App perfectly responsive
- ✅ Works on all screen sizes

---

### Issue 7.2: Performance Optimization (#GH-38)
**Type**: Enhancement
**Labels**: `enhancement`, `performance`, `optimization`
**Priority**: 🟡 Medium
**Description**:
Optimize for performance:
- Code splitting if relevant
- Image optimization
- Lazy loading
- Bundle size analysis
- Caching strategy

**Tasks**:
- [ ] Profiling and measurement
- [ ] Bundle analysis
- [ ] Optimizations
- [ ] Re-measure

**Acceptance Criteria**:
- ✅ Reasonable bundle size
- ✅ High performance score

---

### Issue 7.3: UI/UX Polish (#GH-39)
**Type**: Enhancement
**Labels**: `enhancement`, `ux`, `ui`
**Priority**: 🟡 Medium
**Description**:
Refine the interface:
- Smooth animations/transitions
- Toast notifications for actions
- Empty states (no clients, no products)
- Loading states if relevant
- Clear user feedback

**Tasks**:
- [ ] Add transitions/animations
- [ ] Toast notifications (Skeleton Labs)
- [ ] Empty states
- [ ] Feedback for each action
- [ ] UX testing

**Acceptance Criteria**:
- ✅ Polished and coherent UI
- ✅ Good user feedback
- ✅ Enjoyable to use

---

### Issue 7.4: User Documentation (#GH-40)
**Type**: Documentation
**Labels**: `docs`, `user-guide`
**Priority**: 🟢 Medium
**Description**:
Documentation for users:
- Quick start guide (5 minutes)
- How to add a client
- How to add an order
- FAQ
- Troubleshooting

**Tasks**:
- [ ] Create docs/USER_GUIDE.md (in English)
- [ ] Write simple guide
- [ ] Add annotated screenshots
- [ ] FAQ based on use cases

**Acceptance Criteria**:
- ✅ Clear documentation
- ✅ Covers use cases

---

### Issue 7.5: Developer Documentation (#GH-41)
**Type**: Documentation
**Labels**: `docs`, `developer-guide`
**Priority**: 🟢 Low
**Description**:
Documentation for developers:
- Global architecture
- PouchDB structure
- Store API
- Patterns used
- Contribution guide

**Tasks**:
- [ ] Create docs/ARCHITECTURE.md (in English)
- [ ] Document stores
- [ ] Document PouchDB
- [ ] Code examples

**Acceptance Criteria**:
- ✅ Complete documentation
- ✅ Easy to maintain

---

## 🚀 PHASE 8: DEPLOYMENT & RELEASE

### Issue 8.1: Cloudflare Deployment (#GH-42)
**Type**: DevOps
**Labels**: `devops`, `deployment`, `cloudflare`
**Priority**: 🟡 High
**Description**:
Finalize and deploy to Cloudflare:
- Test production build
- Configure custom domain
- Verify SSL/TLS
- Service worker works
- PWA installable
- Basic monitoring

**Tasks**:
- [ ] Production `pnpm build`
- [ ] Test build
- [ ] Deploy to Cloudflare Pages
- [ ] Configure domain
- [ ] Test offline in production
- [ ] Verify PWA

**Acceptance Criteria**:
- ✅ Deployment succeeds
- ✅ App publicly accessible
- ✅ PWA functional
- ✅ Offline works

---

### Issue 8.2: Release v1.0 Preparation (#GH-43)
**Type**: Release
**Labels**: `release`, `version`
**Priority**: 🟡 Medium
**Description**:
Prepare first release:
- CHANGELOG.md complete
- Version bumping (semantic versioning)
- Git tag v1.0.0
- Release notes

**Tasks**:
- [ ] Write CHANGELOG.md
- [ ] Version to 1.0.0
- [ ] Git tag v1.0.0
- [ ] Release notes

**Acceptance Criteria**:
- ✅ Release ready to announce

---

## 📊 Issues Summary

| Phase | # | Title | Priority | Effort |
|-------|---|-------|----------|--------|
| **SETUP** | 0.1 | PouchDB + Types | 🔴 Critical | Medium |
| | 0.2 | Project Structure | 🟡 High | Low |
| | 0.3 | PWA + Service Worker | 🟡 High | Medium |
| | 0.4 | Env Variables | 🟡 Medium | Low |
| | 0.5 | Cloudflare Config | 🟡 Medium | Low |
| | 0.6 | GitHub Actions | 🟡 Low | Medium |
| **MVP** | 1.1 | Business Types | 🔴 Critical | Low |
| | 1.2 | Calculations + Tests | 🔴 Critical | Medium |
| | 1.3 | Order Store (Runes) | 🔴 Critical | Medium |
| | 1.4 | ProductForm | 🔴 High | Medium |
| | 1.5 | ProductGrid | 🔴 Critical | Medium |
| | 1.6 | OrderItems | 🔴 High | Medium |
| | 1.7 | Main Layout | 🔴 High | Medium |
| **CLIENTS** | 2.1 | Clients Store | 🟡 Critical | Medium |
| | 2.2 | CRUD Clients DB | 🟡 Critical | Low |
| | 2.3 | CRUD Orders DB | 🟡 Critical | Low |
| | 2.4 | ClientForm | 🟡 Medium | Low |
| | 2.5 | ClientSwitcher | 🟡 High | Low |
| | 2.6 | Order Persistence | 🟡 Medium | Low |
| **HISTORY** | 3.1 | Complete Order | 🟡 High | Low |
| | 3.2 | History Page | 🟡 Medium | Medium |
| | 3.3 | Statistics | 🟢 Low | Low |
| | 3.4 | Charts | 🟢 Low | Medium |
| **CONFIG** | 4.1 | CRUD Products DB | 🟡 Medium | Low |
| | 4.2 | Products Store | 🟡 Medium | Low |
| | 4.3 | Products Page | 🟡 Medium | Medium |
| | 4.4 | Settings Page | 🟢 Low | Medium |
| **SYNC** | 5.1 | Connectivity Detection | 🟡 Medium | Low |
| | 5.2 | Sync to CouchDB | 🟢 Low | Medium |
| **TESTS** | 6.1 | Unit Tests | 🟡 High | High |
| | 6.2 | Component Tests | 🟡 Medium | Medium |
| | 6.3 | E2E Tests | 🟡 Medium | Medium |
| | 6.4 | Perf/A11y Tests | 🟢 Medium | Medium |
| **POLISH** | 7.1 | Responsive Design | 🟡 High | Medium |
| | 7.2 | Performance | 🟡 Medium | Medium |
| | 7.3 | UI/UX Polish | 🟡 Medium | Medium |
| | 7.4 | User Docs | 🟢 Medium | Medium |
| | 7.5 | Dev Docs | 🟢 Low | Low |
| **RELEASE** | 8.1 | Cloudflare Deploy | 🟡 High | Low |
| | 8.2 | Release v1.0 | 🟡 Medium | Low |

---

## 🎯 Critical Path (Recommended Order)

```
PHASE 0: Setup Everything First
  ↓
PHASE 1: MVP Core Calculations (START WITH 1.2!)
  ↓
PHASE 2: Multi-Client Management
  ↓
PHASE 3: History & Stats (3.1-3.2, 3.3-3.4 optional)
  ↓
PHASE 4: Settings & Products
  ↓
PHASE 5: Sync & Offline
  ↓
PHASE 6: Tests (run alongside phases 1-5)
  ↓
PHASE 7: Polish
  ↓
PHASE 8: Deploy & Release
```

---

## 🧪 TDD Checklist for Developer

Before starting any code issue:

- [ ] **I understand the test cases to cover**
- [ ] **I'll write tests first** (RED phase)
- [ ] **Then write minimum code** (GREEN phase)
- [ ] **Then refactor** (REFACTOR phase)
- [ ] **Tests always green**: `pnpm test:unit`
- [ ] **Coverage required**: Min 80%, ideally 100% for business logic
- [ ] **No console.log in prod** (use dev check: `if (dev) console.log(...)`)

---

## 🚀 Useful Commands

```bash
# Run tests in watch mode (ideal for TDD)
pnpm test:unit --watch

# Run tests for specific file
pnpm test:unit calculations

# Run tests with UI
pnpm test:unit --ui

# Check coverage
pnpm test:unit --coverage

# Run everything
pnpm test && pnpm lint && pnpm check
```

---

## 📌 TDD Summary for This Project

**Why TDD here?**
1. ✅ **Financial calculations** = expensive errors (wrong margins = business impact)
2. ✅ **Offline-first complexity** = needs solid testing
3. ✅ **100% coverage** = confidence for refactoring
4. ✅ **Tests = living documentation** of expected behavior

**Recommended order by complexity:**
1. **Phase 1.2** (Calculations) - START HERE! Calculations without tests = RISK ⚠️
2. **Phase 1.3** (Store) - TDD on Svelte stores
3. **Phase 2.x** (DB CRUD) - TDD on PouchDB operations
4. **Phase 1.4-1.7** (Components) - Component testing
5. **Other phases** - Apply TDD progressively

---

## 📝 Important Notes for This Project

- **Documentation in English**: All code comments, JSDoc, docs must be in English
- **Console.log only in dev**: Use `if (dev) console.log(...)`  for visibility only in dev mode
- **No `any` types**: Create proper interfaces instead
- **Test often on mobile**: Mobile-first approach
- **PouchDB is critical**: Understand it well before progressing
