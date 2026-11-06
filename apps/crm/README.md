# CRM

A local-first Vezham workspace with pages, chat, databases and files, built with
the shared app/section layouts and HeroUI components.

```sh
pnpm exec nx run crm:dev
pnpm exec nx run crm:build
pnpm exec nx run crm:serve-static
```

Production hosting needs only `.output/public` and SPA fallback to `/_shell.html`.
Content and file bytes stay in IndexedDB. Cloud sync is not connected.

Track completed and pending work in the
[CRM checklist](../../vx/handbooks/apps/crm/TODO.md).
The [CRM handbook](../../vx/handbooks/apps/crm/README.md) documents storage
guarantees, limits and verification commands. Shared
contracts and the future Neon SQL design live in
[workspace-contracts](../../packages/workspace/contracts/README.md).
