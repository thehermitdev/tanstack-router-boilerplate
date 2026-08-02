# Contributing

## Local checks

```bash
bun install
bun run check
bun run test:e2e
```

Use small, focused pull requests. Explain architectural decisions and update documentation whenever a convention changes.

## Commit style

Use imperative, scoped messages when useful:

```text
feat(users): add user detail route
fix(api): normalize timeout errors
chore(tooling): update TanStack packages
```

## Dependency policy

Do not add a dependency when the platform or an existing package already solves the requirement. Record significant architectural choices in `docs/decisions/`.
