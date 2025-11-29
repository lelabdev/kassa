# 📋 Kassa Development Roadmap

Quick checklist of all issues in planned order.

> 💡 **All issue details are on GitHub** - For full requirements, acceptance criteria, TDD specifications, and implementation guidance, open the GitHub issue (e.g., click `#4` for issue details).
>
> 📌 **This file is a checklist only** - Use it to track progress. Detailed specs live in GitHub issues.
>
> **⚠️ ALL WORK MUST USE TDD** - Tests first (RED), then implementation (GREEN), then refactor (REFACTOR).

---

## ⚡ PHASE 0: SETUP (Critical)

- [ ] **0.1** - Configure PouchDB + TypeScript Types (#GH-4)
- [ ] **0.2** - Verify & Complete Project Structure (#GH-5)
- [ ] **0.3** - Configure PWA and Service Worker (#GH-6)
- [ ] **0.4** - Configure Environment Variables & Config (#GH-7)
- [ ] **0.5** - Verify Cloudflare Adapter Configuration (#GH-8)
- [ ] **0.6** - Setup CI/CD - GitHub Actions (#GH-9)

## Phase 1

- [ ] **1.1** - TypeScript Interfaces for Business Domain (#GH-10)
- [ ] **1.2** - Calculate Margins and Totals Logic (TDD) (#GH-11)
- [ ] **1.3** - Svelte Store for Active Order (Svelte 5 Runes - TDD) (#GH-12)
- [ ] **1.4** - Product Form Component (#GH-13)
- [ ] **1.5** - Product Grid Component (POS-style) (#GH-14)
- [ ] **1.6** - Order Items Display Component (#GH-15)
- [ ] **1.7** - Main Home Page / Layout (#GH-16)

## Phase 2

- [ ] **2.1** - Svelte Store for Clients and Orders (#GH-17)
- [ ] **2.2** - PouchDB CRUD for Clients (#GH-18)
- [ ] **2.3** - PouchDB CRUD for Orders (#GH-19)
- [ ] **2.4** - Client Form Component (#GH-20)
- [ ] **2.5** - Client Switcher Component (#GH-21)
- [ ] **2.6** - Save & Restore Active Order by Client (#GH-22)

## Phase 3

- [ ] **3.1** - Mark Order as Completed (#GH-23)
- [ ] **3.2** - Sales History Page by Day (#GH-24)
- [ ] **3.3** - Global Statistics by Period (#GH-25)
- [ ] **3.4** - Sales Charts (Chart.js or Recharts) (#GH-26)

## Phase 4

- [ ] **4.1** - PouchDB CRUD for Products (#GH-27)
- [ ] **4.2** - Svelte Store for Products (#GH-28)
- [ ] **4.3** - Products Management Page (#GH-29)
- [ ] **4.4** - General Settings Page (#GH-30)

## Phase 5

- [ ] **5.1** - Connectivity Detection (#GH-31)
- [ ] **5.2** - Sync PouchDB to CouchDB (Optional) (#GH-32)

## Phase 6

- [ ] **6.1** - Complete Unit Tests (#GH-33)
- [ ] **6.2** - Svelte Component Tests (#GH-34)
- [ ] **6.3** - E2E Tests - Business Workflows (#GH-35)
- [ ] **6.4** - Performance & Accessibility Tests (#GH-36)

## Phase 7

- [ ] **7.1** - Responsive Design - All Screens (#GH-37)
- [ ] **7.2** - Performance Optimization (#GH-38)
- [ ] **7.3** - UI/UX Polish (#GH-39)
- [ ] **7.4** - User Documentation (#GH-40)
- [ ] **7.5** - Developer Documentation (#GH-41)

## Phase 8

- [ ] **8.1** - Cloudflare Deployment (#GH-42)
- [ ] **8.2** - Release v1.0 Preparation (#GH-43)


---

## 📝 How to Use This Roadmap

1. **Pick next unchecked item** from a phase
2. **Open the GitHub issue** (click the issue link, e.g., `#4`) for complete specifications, acceptance criteria, and TDD guidance
3. **Create a feature branch**: `<type>/<#>-<slug>` (e.g., `feat/4-pouchdb-setup`)
4. **Work using TDD**:
   - 🔴 **RED**: Write tests first (they should fail)
   - 🟢 **GREEN**: Write minimum code to pass tests
   - 🔵 **REFACTOR**: Clean up while keeping tests passing
5. **Create PR** and link to the GitHub issue
6. **Get review** and merge to main
7. **Check off** the item in this roadmap: change `- [ ]` to `- [x]`

---

## 🎯 Critical Path (Start Here)

1. **#GH-4** (0.1) - PouchDB + Types
2. **#GH-11** (1.2) - Calculations (TDD)
3. **#GH-12** (1.3) - Order Store (TDD)
4. **#GH-13-15** (1.4-1.6) - UI Components
5. **#GH-16** (1.7) - Main Layout
6. **#GH-17-19** (2.1-2.3) - Clients & DB
7. ... Continue with phases

