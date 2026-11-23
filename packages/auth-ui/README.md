# Auth UI

The headless auth implementation is grouped here as two independently built packages:

- `core/` → `@vezham/auth-ui-core`: framework-independent configuration, validation, queries, mutations, adapters, plugin contracts, and server helpers.
- `react/` → `@vezham/auth-ui-react`: React providers, hooks, plugin bindings, and email templates, built on `core`.

Styled components live in `packages/core/react/src/lib-27/auth` and are available from `@vezham/react/auth`.

Both packages contain the implementation locally. Their third-party notices retain the original source attribution; neither depends on a Better Auth UI package.

Run `pnpm nx run-many -t build,test -p auth-ui-core auth-ui-react` from the workspace root.
