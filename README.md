# College Discovery Platform

A production-oriented college discovery MVP built with **Next.js 15**, **TypeScript**, **TailwindCSS**, **Prisma**, **PostgreSQL**, and **NextAuth**.

Similar in spirit to Careers360 / Collegedunia: search colleges, view details, compare side-by-side, and save favorites.

## Features

- **College listing** — search, filters (state, type), sorting, pagination
- **College detail** — overview, fees, placements, courses, reviews
- **Compare** — up to 3 colleges side-by-side (fees, placements, ratings, location)
- **Auth + saved colleges** — register/login, save favorites, dashboard

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 App Router |
| Language | TypeScript |
| Styling | TailwindCSS v4 |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | NextAuth v5 (Auth.js) |
| Validation | Zod |
| Client data | TanStack React Query (saved colleges) |

## Quick Start

### 1. Prerequisites

- Node.js 18+
- PostgreSQL running locally or a cloud instance (Neon, Supabase, etc.)

### 2. Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/college_discovery"
AUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

Generate `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 3. Database setup

```bash
npm install
npx prisma db push
npm run db:seed
```

### 4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Demo account:** `demo@collegefinder.com` / `Demo1234`

## Project Structure

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for design decisions.

```
src/
├── app/           # Routes & API handlers
├── features/      # Domain modules (colleges, auth, compare, saved)
├── components/    # UI primitives & layout
├── hooks/         # React hooks
└── lib/           # Prisma, auth, utilities
prisma/
├── schema.prisma
└── seed.ts
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/colleges` | List with filters & pagination |
| GET | `/api/colleges/[slug]` | College detail |
| GET | `/api/colleges/compare?slugs=a,b` | Compare 2–3 colleges |
| POST | `/api/auth/register` | Create account |
| GET/POST/DELETE | `/api/saved` | Saved colleges (auth required) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run db:seed` | Seed mock data |
| `npm run db:studio` | Prisma Studio GUI |

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## License

MIT — built for internship assignment demonstration.
