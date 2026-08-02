# TanStack Router Boilerplate

A production-oriented React SPA template built with Bun, TanStack Router, TanStack Query, Axios, Zod, Tailwind CSS v4, and shadcn/ui conventions.

## What this starter establishes

- File-based, type-safe routing with route-level data prefetching
- A single TanStack Query server-state boundary
- Axios hidden behind a shared transport adapter
- Runtime validation for environment variables, URL search values, and API responses
- Feature-oriented directories with enforced dependency direction
- Tailwind CSS v4 and source-owned shadcn/ui primitives
- Vitest, Testing Library, MSW, and Playwright
- GitHub Actions, Dependabot, contribution, security, and agent guidelines
- A complete `users` reference feature using DummyJSON

## Create a project from the template

Use **Use this template** on GitHub, create a new repository, then clone it:

```bash
git clone https://github.com/YOUR_ACCOUNT/YOUR_APP.git
cd YOUR_APP
cp .env.example .env
bun install
bun run dev
```

The template intentionally does not include a generated `bun.lock`. After the first install in the new repository, review and commit the generated lockfile so that the derived application has a reproducible dependency graph.

Detailed Thai adoption guidance: [`docs/GETTING_STARTED.th.md`](docs/GETTING_STARTED.th.md)

## Commands

| Command                   | Purpose                                       |
| ------------------------- | --------------------------------------------- |
| `bun run dev`             | Start Vite on port 3000                       |
| `bun run routes:generate` | Generate the TanStack route tree              |
| `bun run build`           | Generate routes and create a production build |
| `bun run typecheck`       | Generate routes and run TypeScript            |
| `bun run lint`            | Run ESLint                                    |
| `bun run format:check`    | Verify Prettier formatting                    |
| `bun run test`            | Run Vitest in watch mode                      |
| `bun run test:run`        | Run unit and integration tests once           |
| `bun run test:e2e`        | Run Playwright                                |
| `bun run check`           | Run all non-E2E quality gates                 |

## Directory model

```text
src/
├── app/        # Bootstrap, providers, router, query client, typed configuration
├── routes/     # Route definitions and orchestration only
├── features/   # Vertical business capabilities
├── shared/     # Framework-independent reusable infrastructure and UI
└── test/       # Cross-feature test infrastructure
```

Dependency direction:

```text
app → routes → features → shared
```

Read [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) before adding a production feature.

## Core rules

1. Components and routes do not import Axios.
2. TanStack Query owns server state.
3. Route loaders prefetch query options; they do not duplicate fetching logic.
4. Untrusted data is validated with Zod at the boundary.
5. Shared code cannot depend on app, routes, or feature implementation.
6. shadcn/ui primitives remain free of business logic.
7. Every async page provides loading, error, empty, and success states.
8. `src/routeTree.gen.ts` is generated and never edited or committed.

## TanStack DB

TanStack DB is intentionally not installed by default. Add it only when normalized collections, live queries, optimistic local writes, offline behavior, or synchronization justify the additional model. See [`docs/recipes/tanstack-db.md`](docs/recipes/tanstack-db.md).
