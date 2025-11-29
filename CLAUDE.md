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

Create branches using this format: `<type>/<#>-<slug>`

**Types (must match GitHub labels):**

- `feat/` - New features
- `test/` - Tests and test-related
- `docs/` - Documentation
- `fix/` - Bug fixes
- `refactor/` - Code refactoring

**Examples:**

```bash
git checkout -b feat/11-margin-calculations
git checkout -b test/33-unit-tests
git checkout -b docs/40-user-guide
git checkout -b fix/123-fix-decimal-rounding
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
git checkout -b feat/11-margin-calculations

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
git push -u origin feat/11-margin-calculations
# Then create PR on GitHub with the issue reference
```

### Important Git Rules - ⚠️ CRITICAL & ENFORCED

**🔒 `main` BRANCH IS PROTECTED ON GITHUB - YOU CANNOT WRITE TO IT DIRECTLY**

**ANY ATTEMPT TO COMMIT TO `main` WILL BE REJECTED AND FAIL.** This is not a suggestion—it's enforced by GitHub branch protection rules.

#### ✋ MANDATORY RULE: ALWAYS CREATE FEATURE BRANCH FIRST

**Before you modify ANY file, verify you are NOT on `main`:**

```bash
git status  # If you see "On branch main" → STOP and create branch immediately
```

**If you see "On branch main", create feature branch NOW:**

```bash
git checkout -b <type>/<issue-number>-<slug>
# Examples: test/14-product-grid, feat/11-margin, docs/5-setup
```

**IF YOU ARE UNSURE about the issue number or branch name, ASK BEFORE MAKING CHANGES.**

#### Correct Workflow (Non-negotiable)

1. **FIRST**: Check branch → `git status` (must NOT say "On branch main")
2. **SECOND**: If on main, create feature branch → `git checkout -b test/14-product-grid`
3. **THEN**: Make changes on feature branch only
4. **COMMIT**: Always include issue reference → `Closes #14`
5. **PUSH**: Push feature branch → `git push -u origin test/14-product-grid`
6. **MERGE**: Create PR on GitHub → Review → Merge

#### Branch Naming Format (mandatory)

- `test/<issue-number>-<slug>` for tests
- `feat/<issue-number>-<slug>` for features
- `docs/<issue-number>-<slug>` for documentation
- `fix/<issue-number>-<slug>` for bug fixes
- `refactor/<issue-number>-<slug>` for refactoring

**DO NOT deviate from this format.**

#### Commit Requirements

- ✅ Always reference issue number: `Closes #14`
- ✅ Tests must pass: `pnpm test`
- ✅ Code formatted: `pnpm format`
- ✅ TypeScript checks: `pnpm check`
- ✅ One feature per branch (not multiple issues)

**ENFORCEMENT:** GitHub will reject any direct push to `main`. All work MUST go through feature branches → PR → merge workflow.

## Development Roadmap

### Overview

The project is organized in 8 phases (Phase 0-8) to build Kassa incrementally with clear dependencies. **See `docs/ROADMAP.md`** for the complete checklist.

### How to Work from the Roadmap

1. **Check the roadmap** - `docs/ROADMAP.md` lists all issues in planned order
2. **Pick next unchecked item** - Start with Phase 0 critical tasks
3. **Go to GitHub** - All issue details are on GitHub (open the issue link)
4. **Create a feature branch** - Use format: `<type>/<issue-number>-<slug>`
   - Example: `feat/11-margin-calculations`
5. **Work TDD** - Write tests first, then code (marked issues have explicit TDD guidance)
6. **Commit with reference** - Always include `Closes #<issue-number>` in commit message
7. **Push & Create PR** - Link PR to the issue, get review, merge
8. **Check off in roadmap** - When PR is merged to main, update `docs/ROADMAP.md` to mark the item as complete: `- [x]` (in the same PR or immediately after)

### Phase Guidelines

- **Phase 0**: Setup & configuration (critical before Phase 1)
- **Phase 1**: Core business logic & UI components
- **Phase 2**: Client & order persistence with PouchDB
- **Phase 3**: Sales history & analytics
- **Phase 4**: Product management & settings
- **Phase 5**: Offline sync & connectivity
- **Phase 6**: Complete test coverage (parallel with Phases 1-3)
- **Phase 7**: Polish, optimization, documentation
- **Phase 8**: Deployment preparation

### Critical Path (If Unsure Where to Start)

1. Phase 0: Setup (0.1-0.6)
2. Phase 1.1-1.2: TypeScript interfaces & calculations (TDD)
3. Phase 1.3-1.6: Store & UI components
4. Phase 1.7: Main layout
5. Phase 2: Clients & order persistence
6. Continue sequentially through phases

### Key Points

- **All issue details are on GitHub** - No separate design docs, refer to the GitHub issue directly
- **TDD-marked issues** - Have explicit test requirements in the issue description
- **Dependencies matter** - Don't skip phases or issues out of order (e.g., Phase 4 depends on Phase 2)
- **Offline-first mindset** - All features must work without network access

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

### UI Components & Styling

- **Skeleton UI Components**: Use Skeleton Labs components for consistent UI
  - Reference: https://www.skeleton.dev/llms-svelte.txt (use this for LLM context)
  - Always use Skeleton components with **Tailwind CSS classes only**
  - **NO inline styles** - use Tailwind utilities for all styling
  - **NO `<style>` blocks** unless absolutely necessary for complex animations/behavior
  - Use Tailwind's utility classes for responsive design and state variants
  - Leverage Skeleton's pre-built components (buttons, cards, modals, etc.) instead of creating custom ones

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
