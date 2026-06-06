# AGENTS.md — clean-arch

## Project Overview

Node.js/TypeScript REST API using Express + Prisma + PostgreSQL. Clean Architecture layout:
- `src/domain/` — entities, use-cases, repository interfaces
- `src/infrastructure/` — Prisma client, repositories, config

## Commands

```bash
pnpm dev        # nodemon watch mode (src/index.ts is entrypoint)
pnpm build      # tsc → dist/
pnpm start      # tsc && node dist/index.js
pnpm prisma:generate  # regenerate Prisma client → src/infrastructure/database/generated/prisma/
pnpm prisma:migrate   # run migrations (requires --config flag due to non-standard location)
```

**Prerequisites:** `docker-compose up -d postgres` must be running before `pnpm dev` or `pnpm start`.

## Prisma v7 Config

Prisma v7 requires `prisma.config.ts` for datasource URL. The project uses a non-standard location at `src/infrastructure/config/prisma.config.ts`, so all Prisma commands must include `--config=src/infrastructure/config/prisma.config.ts`. The `prisma:migrate` script in `package.json` already has this configured.

## Key Conventions

- **Package manager:** pnpm (v11+). Do not use npm or yarn.
- **Module format:** `nodenext` (ESM). TypeScript `module: nodenext` and `moduleResolution: bundler`.
- **Generated Prisma client** lives at `src/infrastructure/database/generated/prisma/`. The schema is at `src/infrastructure/models/schema.prisma`. Run `pnpm prisma:generate` after schema changes.
- **TypeScript strict mode is disabled.** `noImplicitAny: false`, `strict: false`.
- **Environment:** `.env` is gitignored; `DATABASE_URL` is required.
- **Output dir:** `dist/` (not `build/`).