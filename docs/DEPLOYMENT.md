# Deployment Guide

## Recommended: Vercel + Neon PostgreSQL

This stack matches the Next.js 15 + Prisma setup with minimal ops — ideal for an internship demo.

### Why Vercel + Neon?

- **Vercel** — native Next.js hosting, zero-config App Router support
- **Neon** — serverless Postgres with free tier, works with Prisma connection pooling

---

## Step 1: Provision PostgreSQL (Neon)

1. Create account at [neon.tech](https://neon.tech)
2. Create a project → copy the **connection string**
3. Use the **pooled** connection string for serverless (ends with `-pooler`)

```env
DATABASE_URL="postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require"
```

---

## Step 2: Push schema & seed (one-time)

From your machine with `DATABASE_URL` set to production:

```bash
npx prisma db push
npm run db:seed
```

> For production, prefer `prisma migrate deploy` once you add migrations.

---

## Step 3: Deploy to Vercel

1. Push code to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Set environment variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Neon pooled connection string |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` |
| `AUTH_GOOGLE_ID` | (optional) |
| `AUTH_GOOGLE_SECRET` | (optional) |

4. Build command: `npm run build` (runs `prisma generate` via postinstall)
5. Deploy

---

## Step 4: Post-deploy checks

- [ ] Home page loads with colleges
- [ ] `/colleges` search & filters work
- [ ] `/colleges/iit-bombay` detail page loads
- [ ] Register → login → save college → `/dashboard`
- [ ] Compare 2 colleges at `/compare`

---

## Alternative: Railway / Render

### Railway

1. New project → add PostgreSQL plugin
2. Copy `DATABASE_URL` from Railway variables
3. Deploy from GitHub with start command: `npm run build && npm start`

### Docker (self-hosted)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Production hardening (Phase 2)

Mention these in interviews as next steps:

- **Rate limiting** on `/api/auth/register` and search
- **Prisma migrations** instead of `db push`
- **Redis** for session/cache if scaling beyond JWT
- **Sentry** for error monitoring
- **CI/CD** — GitHub Action running `lint`, `prisma validate`, `next build`

---

## Environment checklist

```env
DATABASE_URL=       # Required
AUTH_SECRET=        # Required
NEXTAUTH_URL=       # Required (must match deployed URL)
AUTH_GOOGLE_ID=     # Optional
AUTH_GOOGLE_SECRET= # Optional
```
