# Kassa

A mobile-first PWA (Progressive Web App) designed to simplify sales calculations and margin management for small fruit and vegetable vendors.

## Features

- 📱 **Mobile-First Design** - Optimized for small shops and street vendors with large, easy-to-tap icons
- 🔢 **Real-Time Calculations** - Instant total calculations based on quantity, per-kilo pricing, and selling prices
- 📊 **Margin Tracking** - Compare purchase vs. selling prices and calculate profit margins and percentages
- 👥 **Multi-Client Management** - Handle multiple clients and orders simultaneously with easy switching
- 📡 **Offline-First** - Full functionality without internet, powered by PouchDB
- 🔄 **Data Sync** - Automatic synchronization when connection returns
- 📈 **Sales History** - Track completed orders and visualize daily sales

## Tech Stack

| Category         | Technology                                                                            |
| ---------------- | ------------------------------------------------------------------------------------- |
| **Framework**    | [SvelteKit 2](https://kit.svelte.dev) + [Svelte 5](https://svelte.dev)                |
| **Styling**      | [Tailwind CSS 4](https://tailwindcss.com) + [Skeleton Labs](https://www.skeleton.dev) |
| **Database**     | [PouchDB](https://pouchdb.com) (IndexedDB-based, offline-sync ready)                  |
| **Testing**      | [Vitest](https://vitest.dev) + [Playwright](https://playwright.dev)                   |
| **Deployment**   | [Cloudflare Workers](https://workers.cloudflare.com)                                  |
| **Language**     | [TypeScript](https://www.typescriptlang.org) 5 (strict mode)                          |
| **Code Quality** | ESLint + Prettier                                                                     |

## Getting Started

### Prerequisites

- **pnpm** (not npm or yarn) - [Installation guide](https://pnpm.io/installation)
- Node.js 18+ (typically handled by pnpm)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open in browser
pnpm dev -- --open
```

The app will be available at `http://localhost:5173`

## Development Commands

### Running the App

```bash
pnpm dev              # Start dev server with hot reload
pnpm build            # Build for production (Cloudflare)
pnpm preview          # Preview production build (port 4173)
```

### Testing

```bash
pnpm test:unit        # Run unit tests (browser + server)
pnpm test:e2e         # Run end-to-end tests with Playwright
pnpm test             # Run all tests
```

### Code Quality

```bash
pnpm lint             # Check ESLint and Prettier
pnpm format           # Auto-format code
pnpm check            # TypeScript checking (Svelte type safety)
pnpm check:watch      # Type checking in watch mode
```

## Project Structure

```
kassa/
├── src/
│   ├── routes/              # SvelteKit pages and layouts
│   │   ├── +layout.svelte   # Root layout (imports Tailwind CSS)
│   │   ├── +page.svelte     # Home page
│   │   └── *.svelte.spec.ts # Component tests
│   ├── lib/                 # Reusable utilities, stores, and components
│   │   ├── assets/          # Static assets (favicon, etc.)
│   │   └── index.ts         # Lib exports
│   ├── app.d.ts             # TypeScript app definitions
│   └── app.html             # HTML template
├── e2e/                     # End-to-end tests (Playwright)
├── vite.config.ts           # Vitest and Vite configuration
├── svelte.config.js         # SvelteKit configuration
├── tsconfig.json            # TypeScript configuration (strict mode)
├── eslint.config.js         # ESLint rules
├── .prettierrc              # Prettier formatting rules
└── package.json             # Dependencies and scripts
```

## PouchDB Setup Guide

### Basic Initialization

```typescript
// src/lib/db.ts
import PouchDB from 'pouchdb';

export const db = new PouchDB('kassa-local');

// For data structure
export interface Product {
	_id?: string;
	_rev?: string;
	type: 'product';
	name: string;
	price_per_unit: number; // purchase price
	unit: string; // kg, piece, etc.
}

export interface Order {
	_id?: string;
	_rev?: string;
	type: 'order';
	client_name: string;
	items: OrderItem[];
	total_amount: number;
	created_at: Date;
}
```

### Querying Data

```typescript
// Get all documents of a type
const products = await db.allDocs({
	include_docs: true,
	key: 'product'
});

// Query with Mango (if using pouchdb-find)
const orders = await db.find({
	selector: { type: 'order', created_at: { $gte: startDate } }
});
```

### Syncing with Backend (Optional)

```typescript
// Sync with CouchDB server
db.sync('https://your-couchdb-server/kassa', {
	live: true,
	retry: true
});
```

## Code Style

- **Indentation**: Tabs (not spaces)
- **Quotes**: Single quotes
- **Line Length**: 100 characters max
- **TypeScript**: Strict mode - no `any` types (use proper interfaces)
- **Svelte 5**: Uses Runes (`$state`, `$derived`, `$effect`) instead of legacy syntax

## Testing

The project uses a dual-environment testing setup:

1. **Client Tests** (`*.svelte.spec.ts`) - Browser-based component tests
   - Run in Chromium via Playwright
   - For testing Svelte components and UI logic

2. **Server Tests** (`*.spec.ts`) - Node.js environment tests
   - For testing utilities, helpers, and business logic
   - Database queries and PouchDB operations

**All tests require at least one assertion** (`expect.requireAssertions: true`).

## Deployment

### Build for Cloudflare

```bash
pnpm build
```

This creates an optimized build compatible with Cloudflare Workers.

### Preview Before Deploying

```bash
pnpm preview
```

The preview server runs on `http://localhost:4173`

## Features in Progress

- [ ] Sales history with daily summaries
- [ ] Data analysis and trend visualization
- [ ] Multi-device synchronization (via PouchDB replication)
- [ ] Export sales data (CSV, PDF)
- [ ] Inventory tracking

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Requires IndexedDB support for PouchDB offline storage.

## Contributing

When contributing:

1. Run `pnpm lint` to check code quality
2. Run `pnpm test` to ensure tests pass
3. Use `pnpm format` for consistent formatting
4. Follow the project structure and naming conventions

## Documentation

- See `CLAUDE.md` for development guidelines and architecture notes
- See `docs/brief.md` for project requirements and vision

## License

**AGPL-3.0** - Open Source License

This project is free to use, modify, and distribute. See [LICENSE](https://www.gnu.org/licenses/agpl-3.0.txt) for details.

## About

**Kassa** is an open-source project created by [ludoloops](https://lelab.dev) at [Lelab](https://lelab.dev).

Built in the Philippines, for Filipino vendors and small business owners (Pinoy merchants) who want to simplify their sales operations without relying on expensive POS systems.

## Support

For issues or feature requests, please check the project documentation or contact the development team.

---

**Built with ❤️ by ludoloops @ Lelab for Filipino small vendors**
