# ADR 0001: Use a client-rendered SPA foundation

## Status

Accepted

## Decision

Use React and Vite with TanStack Router for a client-rendered SPA. Bun is the package manager and tooling runtime. TanStack Query owns server state; Axios is the HTTP transport; Zod validates runtime boundaries.

## Consequences

The deployment platform must support SPA fallback rewrites. Server rendering, server functions, and backend-for-frontend concerns are outside this repository and should use a separate starter when required.
