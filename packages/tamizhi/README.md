# Tamizhi

Tamizhi has independent packages for static React clients and a separately hosted plugin runtime.

| Package                     | Generator                 | Responsibility                                                             |
| --------------------------- | ------------------------- | -------------------------------------------------------------------------- |
| `@vezham/tamizhi-contracts` | `@vx-cli/react:lib`       | Message types, validated HTTP requests, stream events, approvals           |
| `@vezham/tamizhi-core`      | `@vx-cli/react:lib`       | Cordis host, plugins, model/tool orchestration, storage, permissions, HTTP |
| `@vezham/tamizhi-client`    | `@vx-cli/react:lib`       | Browser-safe fetch client, validated SSE reader, cancellation              |
| `@vezham/tamizhi-ui`        | `@vx-cli/react:react-lib` | HeroUI chat, composer/composer-lite, avatar, embed, UI extension slots     |

Composer attachments support TXT, Markdown, CSV, and JSON files (up to four files totaling 20 KB). Their contents are included in the submitted message. Image, PDF, and voice input need dedicated modality plugins/adapters.

The dependency direction is `ui -> client -> contracts` and `core -> contracts`.
The UI never imports the backend. `core/node` is a separate entrypoint for Node HTTP hosting and file storage.

## Plugin architecture

Inspired by DeepSeek Harness's composition philosophy, Tamizhi reuses `@deepseek-ai/cordis` for plugin lifecycle and dependency injection. It does not wrap the DSH agent, session, or transport APIs. Model/tool execution uses TanStack AI behind the provider plugin.

Providers, tools, storage, permission policies, and HTTP transports register through scoped services. They are removed when their Cordis plugin unloads. Registrations reject duplicate names. Removing an execution dependency cancels active runs; disposal aborts pending tool approvals.

```ts
import {
  createTamizhi,
  httpTransportPlugin,
  memoryStoragePlugin,
  openaiCompatiblePlugin,
  permissionPolicyPlugin
} from '@vezham/tamizhi-core'

const runtime = await createTamizhi({
  defaultModel: 'deepseek-chat',
  plugins: [
    memoryStoragePlugin(),
    permissionPolicyPlugin(),
    openaiCompatiblePlugin({
      id: 'deepseek',
      apiKey: process.env.DEEPSEEK_API_KEY!,
      baseURL: 'https://api.deepseek.com',
      models: [
        { id: 'deepseek-chat', name: 'DeepSeek Chat', provider: 'deepseek' }
      ]
    }),
    httpTransportPlugin({ authenticate: authenticateYourUser })
  ]
})

// Fetch-compatible runtimes route requests here.
const response = await runtime.fetch(request)
await runtime.dispose()
```

`tanstackProviderPlugin({ id, models, adapter })` also accepts any TanStack AI text adapter. `openaiCompatiblePlugin` targets chat completions for compatible endpoints. `fastModel` optionally selects a different server-configured model when Fast mode is enabled. TanStack AI owns streamed model calls and the bounded tool loop; Tamizhi owns approvals, service composition, storage, and its stable wire protocol.

Tools use `toolPlugin({ name, description, risk, inputSchema, execute })`; schemas are Zod schemas. The executor receives the authenticated principal, conversation id, and AbortSignal. `risk` is `read`, `write`, or `external`. Ask mode requests approval for every tool. Safe mode allows read tools and asks for other tools. Full mode still asks unless the backend policy explicitly opts into `allowFullAccess`. Client controls cannot override backend policy. Approval decisions are bound to the owning principal and active run, expire, and are removed on cancellation.

Custom plugins can register against `ctx.tamizhi` and observe `ctx.on('tamizhi/event', ...)`. Use `ctx.effect()` to release external resources. `runtime.mount(plugin)` returns an async unmount function. Cordis `inject` also supports dependencies on custom services provided through `ctx.provide()`.

## Backend example

`packages/tamizhi/core/examples/server.ts` composes an OpenAI-compatible provider, file storage, permissions, a current-time tool, and the HTTP transport. Set the variables from `examples/.env.example` in the backend environment, then run:

```sh
pnpm nx run tamizhi-core:serve
```

The example binds to `127.0.0.1:8787`. It authenticates a backend-configured token through a Bearer header or the `tamizhi-session` cookie. Replace its single-user authenticator with the hosting application's session authentication for deployment. The Node server is optional: workers and other Fetch-compatible backends can use `runtime.fetch` directly.

Provider keys belong only in the backend environment. The example does not load `.env` automatically; export variables in the shell or provide them through the process manager. File storage uses atomic writes and hashes the principal/session identifiers rather than treating user input as paths. Memory storage is transient and bounded to 100 conversations per principal. File storage persists conversations across restarts; UI feedback and branch metadata remain in the existing per-user browser store.

## Static standalone app and embed

The app remains static/prerender compatible. Set `V_TAMIZHI_API_URL` to the deployed API base (for example, `https://api.example.com/api/tamizhi`) to enable its backend client. Without it, the existing local example chat remains available. Only the public URL goes into the frontend build. Authentication is supplied by the host session cookie; the API must explicitly allow the frontend origin when it is hosted separately.

```tsx
import { createTamizhiClient } from '@vezham/tamizhi-client'
import { TamizhiSessionProvider, TamizhiEmbed } from '@vezham/tamizhi-ui'
import '@vezham/tamizhi-ui/styles.css'

const client = createTamizhiClient({
  baseURL: 'https://api.example.com/api/tamizhi',
  credentials: 'include'
})

<TamizhiSessionProvider client={client} storageKey="my-app:tamizhi:user-id">
  <TamizhiEmbed />
</TamizhiSessionProvider>
```

For the existing menu layout use `<AppLayout tamizhi={{ client }} ... />`. AppLayout keeps the embedded session above responsive info-panel/sheet mounts. Standalone routing stays in the app, and its branch action opens the newly created chat route. Use `useTamizhiChat` for custom hosts; `useDemoChat` remains a compatibility alias. Import the stylesheet once; theme tokens continue to come from Control Center.

For custom UI extensions wrap the view in `TamizhiUIProvider` with plugins contributing to `welcome`, `composer-actions`, or `message-actions`. Slots are React components, so they can use hooks. Duplicate UI plugin names are rejected.

## HTTP protocol

- `POST /api/tamizhi/chat`: validated request, incremental SSE events, one terminal finish/error event.
- `POST /api/tamizhi/approvals`: resolve a pending tool approval for the authenticated owner.
- `GET /api/tamizhi/models`: actual installed provider model catalog.
- `GET /api/tamizhi/plugins`: installed plugin names.
- `GET /api/tamizhi/conversations/:id`: persisted history for the authenticated owner.

All routes authenticate. CORS uses an explicit origin list. Requests, run concurrency, output queues, approval waits, and run duration are bounded. Client stream parsing handles fragmented frames and rejects incomplete replies. The client supports host-supplied asynchronous authorization headers and custom fetch implementations.

## Verification

Run package tests and checks through Nx:

```sh
pnpm nx run-many -t test -p tamizhi-core,tamizhi-client,tamizhi-contracts,tamizhi-ui --parallel=1
pnpm nx run-many -t typecheck,lint -p tamizhi-core,tamizhi-client,tamizhi-contracts,tamizhi-ui,react,tamizhi --parallel=1
```

Tests cover real TanStack tool-loop behavior with a mocked provider endpoint, client/HTTP streaming, approval ownership, denial, cancellation, plugin disposal, contract validation, and the existing avatar/demo interactions. Live provider calls require deployment credentials and are not part of these tests.

## Source and attribution

Architecture reference: `deepseek-ai/deepseek-harness` (local checkout inspected for plugin/service/lifecycle design). Cordis is consumed as an npm dependency. Momo engine, meshes, decoder, and upstream licenses move with the UI package and are copied into its published output. No absolute reference to a developer's DSH checkout is used by these packages.
