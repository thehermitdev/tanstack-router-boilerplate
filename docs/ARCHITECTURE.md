# Architecture

## Scope

This starter targets client-rendered, authenticated or public SPAs deployed as static assets and connected to HTTP APIs. It is not an SSR or TanStack Start template.

## Layer responsibilities

### `src/app`

Application assembly: environment configuration, router creation, providers, query client defaults, and startup behavior. Business features must not live here.

### `src/routes`

URL ownership and orchestration. A route may validate search parameters, perform authorization gates, call `ensureQueryData`, select pending/error/not-found boundaries, and compose a feature page. It must not call Axios directly or map API payloads.

### `src/features`

Vertical business capabilities. Each feature owns its API contracts, transport-facing functions, query options, mutations, domain mapping, components, pages, and hooks. Expose only the intended surface from `index.ts`.

### `src/shared`

Reusable infrastructure and design primitives. Shared modules must have no knowledge of business features.

## Data flow

```text
URL search parameters
  → Zod validation in route
  → route loader calls feature queryOptions
  → TanStack Query invokes feature API client
  → shared Axios client performs transport
  → Zod validates API response
  → page consumes cached typed data
```

## State ownership

- Remote/cache state: TanStack Query
- URL-addressable state: TanStack Router search parameters
- Form state: local form solution selected by the feature
- Ephemeral visual state: local React state
- Cross-page client state: add a store only after documenting why URL, Query, or component state is insufficient

## Error model

Transport failures are normalized to `ApplicationError`. Contract failures use `API_CONTRACT_ERROR`. Pages render safe user messages while observability tooling may capture the cause and details later.

## Authentication integration

Authentication is intentionally adapter-based and provider-neutral. Introduce an interface under `src/shared/auth`, implement the provider adapter under `src/app/providers`, inject session capabilities through router context, and keep provider SDK imports out of features.

## Deployment

The hosting platform must rewrite unknown paths to `/index.html`, otherwise direct navigation to file-based routes will return 404. Configure this in the target platform rather than hard-coding a provider-specific file into the starter.
