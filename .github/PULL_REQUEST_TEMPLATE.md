## Summary

Describe the user-facing and architectural impact.

## Validation

- [ ] `bun run check`
- [ ] `bun run test:e2e`
- [ ] Manual verification completed

## Architecture checklist

- [ ] Routes only orchestrate data and page composition
- [ ] External data is validated with Zod
- [ ] Components do not import Axios directly
- [ ] Shared code does not depend on feature implementation
