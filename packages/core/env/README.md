# @vezham/env

Validated app environment settings with Vite and Next.js adapters.

## Vite environment handling

The Vite adapter must use the consuming app's environment. Resolving
`import.meta.env` during the package build would bake the package's build
environment into the published JavaScript.

The `vezham:consumer-env` plugin in `vite.config.ts` preserves that expression:

1. Its early `transform` hook replaces `import.meta.env` with the temporary
   `__VEZHAM_CONSUMER_ENV__` identifier, only in `src/lib/vite/env.ts`.
2. Its `renderChunk` hook restores `import.meta.env` in the emitted JavaScript.
3. The consuming app's Vite dev server or build supplies its own environment
   values, including `MODE` and `V_APP_ID`.

The placeholder is internal to the package build; consumers do not configure it.
The plugin adds no browser runtime overhead.
