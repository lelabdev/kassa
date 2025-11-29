# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Kassa** is a mobile-first PWA (Progressive Web App) designed for small fruit and vegetable vendors (families, couples, small shops) to simplify sales calculations and margin management.

**Core Features:**
- Quick product selection via large icons (POS-style interface)
- Real-time price and margin calculations (comparing purchase vs selling price)
- Multi-client/order management with easy switching
- Offline-first functionality with local storage and IndexedDB
- Profit margin tracking and percentage calculation

**Future Features:**
- Sales history tracking and daily summaries
- Data analysis with trend visualization (best-selling products by day)

## Tech Stack

- **Framework**: SvelteKit 2.x with Svelte 5 (latest, using Runes)
- **Styling**: Tailwind CSS 4.x with @tailwindcss/vite plugin
- **UI Components**: Skeleton Labs (Svelte components)
- **Database**: PouchDB for offline-first data sync and replication
- **Testing**: Vitest with browser testing via Playwright
- **E2E Testing**: Playwright (webServer on port 4173)
- **Deployment**: Cloudflare adapter (@sveltejs/adapter-cloudflare)
- **Type Checking**: TypeScript 5.x with strict mode
- **Linting**: ESLint 9.x with TypeScript + Svelte plugins
- **Code Formatting**: Prettier with Svelte and Tailwind plugins

## Git Workflow & Conventions

### Branch Naming Convention

Create branches using this format: `<type>/<issue-#>-<slug>`

**Types (must match GitHub labels):**
- `feat/` - New features
- `test/` - Tests and test-related
- `docs/` - Documentation
- `bug/` - Bug fixes
- `refactor/` - Code refactoring

**Examples:**
```bash
git checkout -b feat/issue-11-margin-calculations
git checkout -b test/issue-33-unit-tests
git checkout -b docs/issue-40-user-guide
git checkout -b bug/issue-123-fix-decimal-rounding
```

### Commit Message Convention

Use Conventional Commits format:

```
<type>: <subject (imperative, lowercase, no period)>

<body (wrap at 100 chars, explain why not what)>

Closes #<issue-number>
```

**Example:**
```
feat: implement margin and total calculations with tests

- Add calculateItemCost, calculateItemRevenue functions
- Add calculateMargin and calculateProfitPercentage functions
- Implement 100% test coverage with edge cases
- TDD approach: tests first, then code, then refactor

Closes #11
```

### GitHub Labels

Only 5 labels per issue:
- **feature** - New features and enhancements
- **test** - Tests and TDD-related
- **docs** - Documentation
- **bug** - Bug fixes
- **refactor** - Code refactoring and technical debt

### Workflow Example

```bash
# 1. Create branch from issue
git checkout -b feat/issue-11-margin-calculations

# 2. Work on the issue (TDD: tests first!)
# - Red: Write tests that fail
# - Green: Write code to pass tests
# - Refactor: Clean up code while tests still pass

# 3. Commit with clear message
git add src/lib/utils/calculations.ts src/lib/utils/calculations.spec.ts
git commit -m "feat: implement margin and total calculations with tests

- Add calculateItemCost, calculateItemRevenue, calculateMargin functions
- Implement 100% test coverage
- TDD approach: red → green → refactor

Closes #11"

# 4. Push and create PR
git push -u origin feat/issue-11-margin-calculations
# Then create PR on GitHub with the issue reference
```

### Important Git Rules

- ✅ **Never commit to main** - Always use feature branches
- ✅ **Always reference issue number** in commit messages (`Closes #11`)
- ✅ **One issue per branch** - Keep work focused
- ✅ **Tests must pass** - Run `pnpm test` before committing
- ✅ **Code must be formatted** - Run `pnpm format` before committing
- ✅ **TypeScript must check** - Run `pnpm check` before committing

---

## Quick Commands

### Development
```bash
pnpm dev              # Start dev server with hot reload
pnpm dev -- --open    # Start dev server and open in browser
```

### Testing
```bash
pnpm test:unit        # Run unit tests (Vitest + Playwright browser tests)
pnpm test:e2e         # Run end-to-end tests
pnpm test             # Run all tests (unit + e2e)
```

### Code Quality
```bash
pnpm lint             # Run ESLint and Prettier checks
pnpm format           # Auto-format code with Prettier
pnpm check            # Run Svelte type checking
pnpm check:watch      # Run type checking in watch mode
```

### Build & Deploy
```bash
pnpm build            # Production build for Cloudflare
pnpm preview          # Preview production build locally (port 4173)
```

## Project Structure

```
src/
├── routes/              # SvelteKit pages and layouts
│   ├── +layout.svelte   # Root layout (imports layout.css)
│   ├── +page.svelte     # Home page
│   ├── page.svelte.spec.ts
│   └── *.svelte.spec.ts # Component tests
├── lib/                 # Reusable utilities and components
│   ├── assets/          # Static assets (favicon, etc.)
│   └── index.ts         # Lib exports
├── app.d.ts             # App-wide TypeScript definitions
├── app.html             # HTML entry point
└── demo.spec.ts         # Example test file
e2e/                     # Playwright end-to-end tests
```

## Testing Strategy

Dual testing setup with different environments:

1. **Client Tests** (`*.svelte.spec.ts`): Browser-based Svelte component tests
   - Run in Chromium via Playwright
   - Excluded from server tests (`exclude: ['src/lib/server/**']`)

2. **Server Tests** (`*.spec.ts`): Node.js environment tests
   - For utilities, helpers, and server-side logic
   - Excluded from browser tests

**Important**: All tests require `expect.requireAssertions: true` - every test must have at least one assertion.

## Code Style Guidelines

### Formatting & Linting
- **Indentation**: Tabs (not spaces)
- **Quotes**: Single quotes
- **Line Width**: 100 characters
- **Trailing Commas**: None
- **Tailwind Classes**: Auto-ordered by Prettier plugin (stylesheet: `src/routes/layout.css`)

### TypeScript
- Strict mode enabled (`strict: true`)
- JavaScript type-checked (`checkJs: true`)
- No `any` types - create proper interfaces instead
- Module resolution: "bundler"
- Path alias: `$lib` maps to `src/lib`

### ESLint
- TypeScript-eslint recommended rules
- Svelte linting via eslint-plugin-svelte
- Prettier integration (no conflicts)
- `no-undef` disabled (TypeScript handles this)
- `.gitignore` patterns respected

### Svelte 5 Specifics
- Uses Runes (`$state`, `$derived`, `$effect`) - NOT legacy reactive declarations
- Props destructuring: `let { children } = $props()`
- Snippet syntax for slot-like components
- Compile errors if mixing old and new syntax

## Important Notes

- **Package Manager**: Always use `pnpm` (never npm or yarn)
- **Cloudflare Platform**: App built for Cloudflare Workers - consider edge constraints
- **Mobile-First**: Design with mobile/touch in mind (large icons, responsive)
- **Offline-First**: Features must work without internet - PouchDB handles sync/replication
- **PouchDB**: Core data layer - handles offline sync, conflict resolution, replication to CouchDB
- **Type Safety**: Enforce via `svelte-check` during development
- **MCP Available**: Svelte MCP server configured - use for Svelte/SvelteKit documentation

## Development Workflow

1. Use `pnpm check:watch` during development to catch type errors early
2. Run `pnpm lint` before committing
3. Tests must pass: `pnpm test`
4. Browser tests run headless by default (set in vite.config.ts)
5. E2E tests require built app - preview runs on port 4173

## Key Constraints & Patterns

- **No Tailwind config file**: Uses `@tailwindcss/vite` plugin for v4 compatibility
- **PWA Caching**: Consider offline strategy when adding new features
- **PouchDB Patterns**:
  - Store all app data in PouchDB (products, orders, clients, history)
  - Use PouchDB's replication for sync to backend CouchDB if needed
  - Handle conflict resolution for multi-device scenarios
  - Query via Mango or allDocs for filtering
- **Margin Calculations**: Core feature - ensure accuracy in calculations
- **Multi-Client Logic**: State management for switching between active orders
- **Responsive Design**: Test frequently on mobile devices
