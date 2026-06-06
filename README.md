# Clean Architecture API

Node.js/TypeScript REST API using Express + Prisma + PostgreSQL with Clean Architecture.

## Stack

- **Runtime:** Node.js v22+
- **Language:** TypeScript (nodenext ESM)
- **Framework:** Express v5
- **ORM:** Prisma v7
- **Database:** PostgreSQL (via Docker)
- **Validation:** class-validator + class-transformer
- **Package manager:** pnpm

## Architecture

```
src/
├── domain/           # Entities, use cases, repository interfaces
├── application/      # Controllers, DTOs, middleware
└── infrastructure/   # Prisma, repositories, config
```

## Setup

```bash
# 1. Start PostgreSQL
docker-compose up -d

# 2. Install dependencies
pnpm install

# 3. Generate Prisma client
pnpm prisma:generate

# 4. Run migrations
pnpm prisma:migrate
```

## Commands

```bash
pnpm dev          # Development (tsx --watch)
pnpm build        # Compile TypeScript → dist/
pnpm start        # Build and run production
pnpm prisma:generate   # Regenerate Prisma client
pnpm prisma:migrate    # Run database migrations
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | List all tasks |
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks` | Create task |
| PUT | `/tasks/:id` | Update task |
| PATCH | `/tasks/:id/complete` | Mark task complete |
| DELETE | `/tasks/:id` | Delete task |

## Environment

Copy `.env.example` to `.env` or set `DATABASE_URL`:

```
DATABASE_URL="postgresql://postgres:hex_pass@localhost:5432/postgres?schema=public"
```

## Database

PostgreSQL runs via Docker on port `5432`. The schema is managed with Prisma migrations.