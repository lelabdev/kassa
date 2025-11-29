# CI/CD Configuration

## GitHub Actions Workflows

All workflows run on `ubuntu-latest` with Node.js 20.x and pnpm.

### 1. Test Workflow (`.github/workflows/test.yml`)

**Triggered:** Push to main, Pull requests to main

**Jobs:**
- ✅ Install dependencies (`pnpm install --frozen-lockfile`)
- ✅ Lint code (`pnpm lint`)
- ✅ Type check (`pnpm check`)
- ✅ Unit tests (`pnpm test:unit --run`)
- ✅ E2E tests (`pnpm test:e2e`)

**Purpose:** Ensures code quality, type safety, and all tests pass before merge

### 2. Build Workflow (`.github/workflows/build.yml`)

**Triggered:** Push to main, Pull requests to main

**Jobs:**
- ✅ Install dependencies
- ✅ Build SvelteKit (`pnpm build`)
- ✅ Upload build artifact to GitHub

**Purpose:** Verifies production build succeeds and stores artifact for inspection

### 3. Deploy Workflow (`.github/workflows/deploy.yml`) - OPTIONAL

**Triggered:** Push to main only (not PR)

**Jobs:**
- ✅ Install dependencies
- ✅ Build SvelteKit
- ✅ Deploy to Cloudflare Pages

**Purpose:** Automatically deploy to production when code is merged to main

**Setup Required (when ready for Phase 8.1):**
1. Create Cloudflare Pages project
2. Get API token: https://dash.cloudflare.com/profile/api-tokens
3. Get Account ID: https://dash.cloudflare.com/
4. Add GitHub secrets:
   - `CLOUDFLARE_API_TOKEN` - Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID` - Your account ID

```bash
# Add secrets via GitHub CLI:
gh secret set CLOUDFLARE_API_TOKEN -b "your-api-token"
gh secret set CLOUDFLARE_ACCOUNT_ID -b "your-account-id"
```

## How It Works

1. **PR Created** → Test workflow runs (lint, type check, unit, e2e)
2. **All Tests Pass** → Build workflow runs to verify production build
3. **PR Merged to main** → Deploy workflow auto-deploys to Cloudflare Pages
4. **Deployment Complete** → App live at your Cloudflare Pages URL

## Current Status

- ✅ Test workflow ready
- ✅ Build workflow ready
- ⏳ Deploy workflow ready (needs secrets for Phase 8.1)

## Future Enhancements

- Add code coverage reporting
- Add performance benchmarks
- Add security scanning (SAST)
- Add dependency updates (Dependabot)
