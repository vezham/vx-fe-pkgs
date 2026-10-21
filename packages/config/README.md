# @vezham/config

Build, test, metadata, navigation, and deployment presets.

Import presets directly from package subpaths, such as
`@vezham/config/vite` and `@vezham/config/vitest/react`.

Package builds use `defineConfig` from `@vezham/config/vite-lib`, or
`@vezham/config/vite-lib/react` for React packages. Both presets discover source
entries from package exports and CLI entries, preserve ES modules, keep
package dependencies external, copy CSS and HTML assets, and generate declarations.

Workspace entry points load TypeScript source before the first build. Publishing
replaces those entries with compiled ESM and declarations; the workspace loader
and its dependencies are not included in the npm output.
