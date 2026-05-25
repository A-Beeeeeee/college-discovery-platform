# College Discovery Platform — Architecture

## Overview

A **feature-based monolith** on Next.js 15 App Router. One deployable app, clear module boundaries, no microservices — appropriate for a 5–7 day internship MVP that still reads as production-oriented.

## Folder Structure

```
src/
├── app/                      # Routes only — thin pages, no business logic
│   ├── (auth)/               # Route group: login/register (shared layout)
│   ├── (main)/               # Route group: header/footer shell
│   ├── api/                  # REST-style route handlers
│   └── layout.tsx            # Root: fonts, providers, global styles
├── features/                 # Domain modules (the heart of the app)
│   ├── colleges/             # Listing, detail, search schemas
│   ├── compare/              # Compare selection & table logic
│   ├── saved/                # Saved colleges actions
│   └── auth/                 # Register schema, auth helpers
├── components/
│   ├── ui/                   # Design-system primitives (Button, Input…)
│   └── shared/               # Layout: Header, Footer, ErrorBoundary
├── hooks/                    # Cross-feature React hooks
├── lib/                      # Infrastructure (DB, auth, API utils)
└── types/                    # Shared TypeScript types
prisma/
├── schema.prisma
└── seed.ts
```

## Why These Decisions?

### 1. Feature-based modules (`src/features/`)

**Why:** Collegedunia-style apps have 4–5 clear domains (colleges, compare, auth, saved). Grouping by feature means a reviewer opens `features/colleges/` and sees schemas, types, and server queries together — faster than hunting across `utils/`, `services/`, and `components/`.

**Avoided:** Full Clean Architecture (entities/use-cases/repositories) — too heavy for 5–7 days; we'd spend time on ceremony instead of UX.

### 2. Thin `app/` routes

**Why:** App Router files define URLs and compose UI. Business rules live in `features/` and `lib/`, so pages stay ~20–40 lines and are easy to test mentally.

**Pattern:** `page.tsx` parses `searchParams` → calls feature function → passes data to components.

### 3. REST APIs under `app/api/` + Server Components

**Why:**
- **Server Components** for first paint on listing/detail (SEO, no loading waterfall).
- **API routes** for client mutations (save college), compare fetch from client, and React Query refetch on filter changes without full page reload.

This hybrid is standard in Next.js 15 production apps: don't force everything through client fetch or everything through server actions.

### 4. URL search params as filter state

**Why:** Shareable URLs (`/colleges?state=Karnataka&sort=rating`), browser back button works, no global state library. Fits internship scope.

### 5. Prisma + PostgreSQL

**Why:** Relational data (colleges ↔ courses ↔ reviews) maps naturally; Prisma gives type-safe queries and fast iteration for seed/mock data.

### 6. NextAuth (Auth.js v5) + JWT sessions for credentials

**Why:** Credentials provider doesn't work with database sessions alone; JWT keeps login simple without Redis. Prisma adapter still stores users for saved colleges FK.

### 7. Zod at API boundaries

**Why:** Single source of truth for query/body validation; infers TypeScript types; returns 400 with clear messages — expected in production APIs.

### 8. `components/ui/` vs feature components

**Why:** Buttons/inputs are reused everywhere; college cards are domain-specific and live under `features/colleges/components/` or `components` co-located in pages — we use `features/*/components` for domain UI.

## Data Flow

```
Browser → page (RSC) → feature query → Prisma → PostgreSQL
Browser → fetch /api/... → Zod validate → Prisma → JSON
Browser → signIn() → NextAuth → JWT cookie
```

## Security Notes

- Protected routes: `/dashboard`, `/api/saved` (middleware + session check)
- Passwords: bcrypt hashed, never stored plain
- API: validate all inputs; return generic 500 messages, log details server-side

## What We Deliberately Did NOT Build

- Elasticsearch / full-text engine (Postgres `ILIKE` + indexes is enough for MVP)
- Redis caching
- Admin CMS
- Email verification (optional stretch goal)

These are easy to mention in an interview as "phase 2" extensions.
