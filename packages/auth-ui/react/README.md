# @vezham/auth-ui-react

Local Vezham authentication provider, hooks, plugin bindings, email templates, and shared authentication presentation helpers.

The implementation is maintained in this package. It uses the Better Auth engine through `@vezham/auth`; no `@better-auth-ui/*` packages are installed. See [third-party notices](./THIRD_PARTY_NOTICES.md) for the MIT source attribution.

Run `pnpm nx run auth-ui-react:test` and `pnpm nx run auth-ui-react:build` from the workspace root.

The tests run in headless Chromium to exercise clipboard access and avatar image compression. Install the browser with `pnpm exec playwright install chromium` before the first run.
