# 📋 Kassa Development Roadmap

Quick checklist of all issues in planned order.

> 💡 **All issue details are on GitHub** — For full requirements, acceptance criteria, TDD specifications, and implementation guidance, open the GitHub issue (click the issue link, e.g., `#4`).
>
> 📌 **This file is a checklist only** — Use it to track progress. Detailed specs live in GitHub issues.
>
> **⚠️ ALL WORK MUST USE TDD** — Tests first (RED), then implementation (GREEN), then refactor (REFACTOR).

---

## ⚡ PHASE 0: SETUP (Critical)

- [x] **0.1** - Configure PouchDB + TypeScript Types (#GH-4)
- [x] **0.2** - Verify & Complete Project Structure (#GH-5)
- [x] **0.3** - Configure PWA and Service Worker (#GH-6)
- [x] **0.4** - Configure Environment Variables & Config (#GH-7)
- [x] **0.5** - Verify Cloudflare Adapter Configuration (#GH-8)
- [x] **0.6** - Setup CI/CD - GitHub Actions (#GH-9)

## Phase 1

- [x] **1.1** - TypeScript Interfaces for Business Domain (TDD) (#GH-10)
- [ ] **1.2** - Calculate Margins and Totals Logic (TDD) (#GH-11)
- [ ] **1.3** - Svelte Store for Active Order (Svelte 5 Runes - TDD) (#GH-12)
- [ ] **1.4** - Product Form Component Tests (TDD) (#GH-13-test)
- [ ] **1.4a** - Product Form Component (#GH-13)
- [ ] **1.5** - Product Grid Component Tests (POS-style - TDD) (#GH-14-test)
- [ ] **1.5a** - Product Grid Component (POS-style) (#GH-14)
- [ ] **1.6** - Order Items Display Component Tests (TDD) (#GH-15-test)
- [ ] **1.6a** - Order Items Display Component (#GH-15)
- [ ] **1.7** - Main Home Page / Layout (TDD) (#GH-16)

## Phase 2

- [ ] **2.1** - Svelte Store for Clients and Orders Tests (TDD) (#GH-17-test)
- [ ] **2.1a** - Svelte Store for Clients and Orders (#GH-17)
- [ ] **2.2** - PouchDB CRUD for Clients Tests (TDD) (#GH-18-test)
- [ ] **2.2a** - PouchDB CRUD for Clients (#GH-18)
- [ ] **2.3** - PouchDB CRUD for Orders Tests (TDD) (#GH-19-test)
- [ ] **2.3a** - PouchDB CRUD for Orders (#GH-19)
- [ ] **2.4** - Client Form Component Tests (TDD) (#GH-20-test)
- [ ] **2.4a** - Client Form Component (#GH-20)
- [ ] **2.5** - Client Switcher Component Tests (TDD) (#GH-21-test)
- [ ] **2.5a** - Client Switcher Component (#GH-21)
- [ ] **2.6** - Save & Restore Active Order by Client Tests (TDD) (#GH-22-test)
- [ ] **2.6a** - Save & Restore Active Order by Client (#GH-22)

## Phase 3

- [ ] **3.1** - Mark Order as Completed Tests (TDD) (#GH-23-test)
- [ ] **3.1a** - Mark Order as Completed (#GH-23)
- [ ] **3.2** - Sales History Page by Day Tests (TDD) (#GH-24-test)
- [ ] **3.2a** - Sales History Page by Day (#GH-24)
- [ ] **3.3** - Global Statistics by Period Tests (TDD) (#GH-25-test)
- [ ] **3.3a** - Global Statistics by Period (#GH-25)
- [ ] **3.4** - Sales Charts Tests (Chart.js or Recharts - TDD) (#GH-26-test)
- [ ] **3.4a** - Sales Charts (Chart.js or Recharts) (#GH-26)

## Phase 4

- [ ] **4.1** - PouchDB CRUD for Products Tests (TDD) (#GH-27-test)
- [ ] **4.1a** - PouchDB CRUD for Products (#GH-27)
- [ ] **4.2** - Svelte Store for Products Tests (TDD) (#GH-28-test)
- [ ] **4.2a** - Svelte Store for Products (#GH-28)
- [ ] **4.3** - Products Management Page Tests (TDD) (#GH-29-test)
- [ ] **4.3a** - Products Management Page (#GH-29)
- [ ] **4.4** - General Settings Page Tests (TDD) (#GH-30-test)
- [ ] **4.4a** - General Settings Page (#GH-30)

## Phase 5

- [ ] **5.1** - Connectivity Detection Tests (TDD) (#GH-31-test)
- [ ] **5.1a** - Connectivity Detection (#GH-31)
- [ ] **5.2** - Sync PouchDB to CouchDB Tests (Optional - TDD) (#GH-32-test)
- [ ] **5.2a** - Sync PouchDB to CouchDB (Optional) (#GH-32)

## Phase 6 (Audit & Finalize Test Coverage)

- [ ] **6.1** - Audit Unit Test Coverage & Fill Gaps (#GH-33)
- [ ] **6.2** - Audit Svelte Component Test Coverage & Fill Gaps (#GH-34)
- [ ] **6.3** - Create E2E Tests - Business Workflows (#GH-35)
- [ ] **6.4** - Add Performance & Accessibility Tests (#GH-36)

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

## 📝 How to Use This

1. Pick next unchecked item
2. Open the GitHub issue (#XX) for full details
3. Create branch: `<type>/<issue-number>-<slug>` (e.g., `feat/4-pouchdb-setup`)
4. **Work TDD**: Write tests first (failures), then code (pass tests), then refactor
5. Create PR and link to the issue
6. Get review and merge to main
7. ✅ Check the item in roadmap when merged (update this file with `- [x]`)

---

## 🎯 Critical Path (Start Here)

**Remember TDD workflow: RED (tests fail) → GREEN (code passes tests) → REFACTOR (clean code)**

1. **#GH-4** (0.1) - PouchDB + Types
2. **#GH-10** (1.1) - Tests for Interfaces → Implement Interfaces (TDD)
3. **#GH-11** (1.2) - Tests for Calculations → Implement Calculations (TDD)
4. **#GH-12** (1.3) - Tests for Order Store → Implement Order Store (TDD)
5. **#GH-13-test** (1.4) - Tests for Form Component → **#GH-13** (1.4a) Implement Form
6. **#GH-14-test** (1.5) - Tests for Grid Component → **#GH-14** (1.5a) Implement Grid
7. **#GH-15-test** (1.6) - Tests for Order Items → **#GH-15** (1.6a) Implement Order Items
8. **#GH-16** (1.7) - Main Layout (TDD)
9. Continue with Phase 2 stores and CRUD (test first, then implementation)
