# HeroUI Pro examples

Documented usage examples from the authenticated HeroUI Pro MCP, adapted for
this internal documentation app. The installed package is exposed as
`@vezham/react-pro-v3` (`@heroui-pro/react@1.0.0-beta.10`); base components use
`@vezham/react-v3`.

The examples use the installed components. No package implementation source is
copied into this directory. HeroUI Pro remains subject to its license; see
`LICENSE-HeroUI-Pro`. Keep this source within the licensed project.

Each preview loads its own module on demand. Shared supporting modules are
included where the documented example needs them. The source retains upstream
formatting and is excluded from formatting, style audits, and app lint rules;
TypeScript and the production build validate these examples.

To refresh an exported MCP snapshot:

```sh
node apps-docs/developers/scripts/import-heroui-pro-docs.mjs /path/to/snapshot
```

The snapshot contains `categories.json`, `components/<slug>.mdx`, and
`guides/<slug>.mdx`. Keep authentication credentials outside the snapshot.
