# TanStack DB adoption recipe

TanStack DB is an optional capability, not the default data layer.

## Adopt it when

- Multiple screens need normalized entity collections
- UI queries join, filter, or aggregate local collections reactively
- Optimistic local writes are central to the product experience
- Offline operation or a synchronization engine is required
- Document-oriented Query cache access has become a measurable limitation

## Do not adopt it when

- The feature is ordinary request/response CRUD
- TanStack Query already provides adequate caching and invalidation
- The team has no synchronization, conflict, or persistence model

## Integration boundary

Keep remote transport and Zod validation in the existing feature API layer. Introduce collections behind a feature-owned repository or collection module. Components should consume typed live-query hooks rather than importing synchronization details.

Document collection identity, primary keys, mutation flow, optimistic rollback, persistence, synchronization ownership, and conflict resolution before enabling it in production.
