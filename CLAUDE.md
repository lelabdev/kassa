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
