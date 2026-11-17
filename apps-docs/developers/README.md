# Developers

Internal docs for libraries, guides, and handbooks.

UI library documentation uses the notebook layout:

- `/docs/ui/react-v3/web/getting-started` — HeroUI React
- `/docs/ui/react-v3/native/getting-started` — HeroUI Native
- `/cn/docs/ui/react-v3/web/getting-started` and `/cn/docs/ui/react-v3/native/getting-started`
  retain the locale routes and currently fall back to English.

The imported content lives in `content/docs-react-v3/{web,native}`. It includes
Getting Started, Components, Releases, and Web Migration. Web examples run locally through a lazy-loaded demo registry, with Preview and Code
tabs for every example. Executable sources live in `src/demos/heroui`. Images and native
videos use upstream media URLs. Search, Markdown endpoints, and LLM exports
include these collections.

See [content provenance and refresh instructions](content/docs-react-v3/README.md).

Validation:

```sh
pnpm nx run developers:lint
pnpm nx run developers:typecheck
pnpm nx run developers:test --run
pnpm nx run developers:build
```

`developers-e2e` contains the Playwright suite.
