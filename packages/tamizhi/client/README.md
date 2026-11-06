# Tamizhi client and local companion

The standalone and embedded chat share this client. It connects to the Go
companion over loopback HTTP/SSE and exposes `createTamizhiConnection` for
TanStack AI. The normal Tamizhi UI uses `runTamizhiChat`, which lets TanStack
assemble live messages while preserving the existing durable history, profiles,
approvals, tools and sources. Go owns the only agent loop.

## Start locally

In the Go backend checkout:

```sh
pnpm exec nx run tamizhi-api:build
./dist/tamizhi serve
```

Open **Connect companion** beside the composer in standalone or embed and click
**Connect**. The browser supplies its current origin. For an unknown origin,
compare the verification code and origin shown in the UI with the CLI prompt,
then enter `y` to approve and remember it, or `n`/Enter to reject. No terminal
input means rejection. `--origin` is optional preapproval, not a required UI flag.

Approved origins are saved in owner-only `~/.vezham/tamizhi/allowed-origins.json`
(or the selected `--data-dir`). Connections expire after five minutes; closing
or cancelling the modal cancels its request. Reloading the UI or restarting the
CLI requires clicking **Connect** again, but remembered origins do not prompt.
The verification code is for comparison, not something to copy into an input.

The default endpoint is `http://127.0.0.1:7331/api/tamizhi`. Hosted apps require
HTTPS and may need browser local-network permission; localhost connects directly.
HTTP `*.vezham.local` apps use the shared Vite development relay. After pairing,
**AI settings** beside the connection control configures BYOK providers. Leo is the default built-in tool-workflow assistant and requires no model-provider
key. Optional BYOK models provide broader reasoning and language generation. No extension or hosted
Tamizhi service is required for local research.

CLI clients use the same runtime:

```sh
./dist/tamizhi status
./dist/tamizhi chat --permission safe 'What is the latest React version?'
./dist/tamizhi chat --permission safe --json 'What is the latest React version?'
```

The default permission mode is `ask`; terminal approvals read `y`/`N` from stdin.
`--json` emits structured stream events, and human progress/prompts go to stderr.
Ctrl+C stops the active request and attempts to cancel its backend run. `serve`,
`pair`, `status` and `chat` accept `--data-dir` and `--listen` as applicable; see
`./dist/tamizhi <command> --help`. State defaults to `~/.vezham/tamizhi/`:
SQLite conversations, an encryption key, and an owner-only CLI token. No Neon
setup is needed for local mode. `tamizhi api --config path` retains configured
hosted API/OIDC/Neon operation when wanted.

## Connection boundaries

- The service binds only to loopback. Only the bounded connection handshake is
  exposed to an unknown origin; all normal API requests require a trusted origin
  and authentication. Approval is saved before granting access.
- Connection capabilities are one-use, origin-bound and expire after five minutes.
  UI sessions expire
  after eight hours, on explicit disconnect, or when the companion restarts.
- UI bearer credentials stay in memory; the endpoint preference alone uses
  localStorage. A reload requires re-pairing. CLI secrets never enter UI code.
- The browser grants local-network access; CORS and that permission are separate.
- If the companion is stopped or pairing expires, restart/re-pair through the
  visible connection control. The local demo remains available when disconnected.
- The public web connector reads server-rendered HTML/plain text, with SSRF,
  byte/source/operation/time limits. It does not use your browser login or render
  JavaScript. CAPTCHA, blocked sites and search-provider errors return failures.

## TanStack integration

`createTamizhiConnection(client, options)` returns a TanStack
`ConnectConnectionAdapter`, usable as the `connection` for `useChat` or a headless
`ChatClient`. It maps Go start/text/tool/result/finish/error events into AG-UI.
Tamizhi-specific progress, approval and source events remain available through
`onEvent`. Pairing/authentication and provider secrets belong to the companion;
this adapter does not implement TanStack's separate provider-key forwarding flow.

The existing low-level `createTamizhiClient` still owns authenticated requests,
strict event validation, sequence deduplication and reconnect/replay. Aborting a
TanStack request aborts its transport. The shared UI and CLI additionally cancel
the active Go run explicitly. Both standalone and embed retain HeroUI components.

## Verify

```sh
pnpm exec nx run-many -t test,typecheck,lint -p tamizhi-client,tamizhi-contracts,tamizhi-ui
TAMIZHI_BACKEND_DIR=/path/to/vx-be-kit-lab pnpm exec nx run tamizhi-client:companion-test
```

The end-to-end fixture uses a real compiled CLI, pairing, Go HTTP/SSE, TanStack
and Chromium with isolated temporary state. Inference and retrieved sites are
controlled fixtures. It checks streamed answer/source delivery, CLI chat, and
connection replay rejection, terminal approve/reject, and saved-origin reconnect
after a real CLI restart. Live search/provider quality requires separate BYOK
verification; these tests consume no real provider quota.

HTTP `*.vezham.local` development apps can use the shared Vite app preset's
local relay with the default companion URL. Restart the dev server once after
this preset update. The relay preserves the app's origin for CLI approval and
authenticated requests. The relay is development-only;
production and preview still require HTTPS or localhost for direct connections.

Leo is advertised by the normal model catalog as `leo/default`. The same TanStack
adapter streams its responses and tool events. It uses Go workflow planners and
tool results, with no separate frontend mock or second execution loop.
