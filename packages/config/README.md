# @vezham/config

Build, test, metadata, navigation, and deployment presets.

Import presets directly from package subpaths, such as
`@vezham/config/vite` and `@vezham/config/vitest/react`.

Workspace entry points load TypeScript source before the first build. Publishing
replaces those entries with compiled ESM and declarations; the workspace loader
and its dependencies are not included in the npm output.
