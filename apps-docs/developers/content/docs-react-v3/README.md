# HeroUI documentation

Copied from `heroui-inc/heroui`, `apps/docs/content/docs`, revision `b2c65a5b5236550526f23d475b1ad0c6e5eab1a2`.
Copyright 2025 NextUI Inc. Licensed under Apache-2.0; see LICENSE-HeroUI.

Local adaptations: React → web routes under `/docs/ui/react-v3`, English content (Chinese routes fall back to English),
portable MDX presentation, and lazy-loaded local component previews with their source code.
Web examples run locally using src/demos/heroui; Next.js-only helpers are adapted to React. Native videos use upstream media.
Guide prose retains upstream package names; executable demos use the Vezham package aliases.

Refresh from a checkout:

```sh
python3 apps-docs/developers/scripts/import-heroui-docs.py /path/to/heroui/apps/docs
node apps-docs/developers/scripts/adapt-heroui-mdx.mjs
```
