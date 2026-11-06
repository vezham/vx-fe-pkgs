# Tamizhi local companion

Tamizhi is one Go runtime with CLI, standalone, and embedded interfaces. React
applications remain static/prerendered. The runtime owns inference, plugins,
tools, approvals, conversation persistence and research. The frontend uses
`@tanstack/ai-client` through a Tamizhi connection adapter; it does not create a
second agent loop.

```text
CLI chat ───────────────────────────────┐
Standalone / Embed → TanStack adapter ──┼→ Loopback HTTP/SSE → Go runtime
                                       │                     ├→ Model adapters
                                       │                     ├→ Plugins / MCP
                                       └─────────────────────└→ Public web tools
```

## Existing pieces reused

| Piece                   | Implementation                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| Runtime and plugins     | Existing Go Cordis lifecycle, provider interfaces and bounded agent loop                   |
| Permissions             | Existing read-risk policy, approvals and cancellation                                      |
| Streaming and reconnect | Existing durable Go `StreamEvent` SSE, sequence deduplication and replay                   |
| UI stream state         | Tamizhi adapter converts events to TanStack AG-UI events; `ChatClient` assembles text      |
| UI and history          | Existing HeroUI chat/composer, avatars, profiles, tasks, branching and saved conversations |
| Network boundary        | Existing DNS-pinned public HTTP client checks every connection and redirect                |
| Local persistence       | SQLite and encrypted BYOK credentials under `~/.vezham/tamizhi/`                           |
| Configured hosted mode  | Existing API/OIDC/Neon mode remains an explicit `tamizhi api --config ...` command         |

The old MV3 extension package, content-script bridge, browser command broker,
result callback endpoint, temporary-tab lifecycle and extension-only tests were
removed. There are no compatibility aliases for that discarded POC.

## Local connection

`tamizhi serve` binds to loopback only and starts with no implicit trusted UI
origins. The browser sends its actual Origin in a bounded connection handshake.
Unknown origins appear in the terminal with a matching verification code;
`y` approves and remembers them, while `n`, Enter, or unavailable stdin rejects.
`--origin` optionally preapproves an exact origin. Approval is atomically saved
in the owner-only `allowed-origins.json` under the selected data directory before
trust is granted. Restart reloads that allowlist (maximum 32 origins).

Only POST/OPTIONS on `/auth/connect`, `/auth/connect/poll` and
`/auth/connect/cancel` may bootstrap an unknown origin. Other API routes retain
CORS and authentication checks. Request capabilities are random, origin-bound,
one-use, expire after five minutes and never appear in terminal logs. Starts
are rate-limited, deduplicated for unknown origins and bounded globally. Polling
cannot retrieve another origin's request. Cancellation and rejection grant no
trust. An approved poll mints the existing origin-bound, revocable eight-hour
browser session. CLI administration still uses its owner-only token, which
browser requests cannot use.

The UI exposes **Connect companion** outside the development Tuning panel.
Credentials stay in memory; only the selected endpoint is a localStorage
preference. Reloading the UI or restarting the companion requires clicking
Connect again; a remembered origin pairs without another terminal prompt. **AI settings** is available beside the connection control after pairing.
Local access uses the current computer's user identity; configured hosted mode
retains its existing SSO/OAuth behavior.

A hosted UI must use HTTPS and may require local-network/loopback permission.
Direct local development also works on `http://localhost`/loopback. HTTP
`*.vezham.local` apps use the shared Vite preset's development-only same-origin
relay to the default `127.0.0.1:7331` companion. Restart Vite after adding the
preset change. The CLI approves the app's actual origin, including its port;
the relay preserves that origin for pairing and every authenticated request.
Only loopback peers and matching origins can use the relay. It is absent from
build/prerender and preview. Non-default companion ports require HTTPS or
localhost. The UI does not bypass browser permissions. References:

- https://developer.chrome.com/blog/local-network-access
- https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Secure_Contexts

## Research MVP

`web_search` uses DeepSeek Search with the initiating owner's encrypted provider
key. In AI settings, select DeepSeek, connect a key, then explicitly enable
**Leo web search**. Saving/replacing a key leaves search off. Search never uses a
system key or another owner's credentials. API search charges apply; the UI
links to the provider's current pricing.

The adapter retrieves up to six ranked results without page content, filters
unsafe/duplicate URLs and preserves provider order. The query limit is 128
Unicode characters and the response cap is 512 KiB. It rejects redirects and
never automatically retries paid requests. Missing configuration, invalid keys,
insufficient balance, rate limiting and upstream errors remain visible.

`web_open` retrieves a selected public HTTPS source and returns a run/owner-scoped
handle. `web_read` places query-matching passages first. These use the existing
HTTP reader, not DeepSeek Fetch or a language model. Google HTML search and the
verified-browser fallback are absent. `WebOptions.Search` can supply another
trusted adapter without changing the tool flow.

The scope is twelve operations, three source documents, a 2 MB retrieval cap,
1,500 text blocks per page and 12 KB selected text per read. The network client
has bounded timeouts, pins public destination IPs, and checks redirects.
Temporary research documents are released when the run ends or is canceled.

Search snippets select sources; successfully read sources retain canonical IDs,
URLs, titles, domains and retrieval timestamps in durable tool results. The UI
shows only read sources. Existing status events describe searching, reading and
comparison. All page text is untrusted tool data. Model guidance is defense in
depth; actual tool schemas and permissions are enforced by Go independently.
No claim is made that prompts alone eliminate hallucinations or prompt injection.

The connector reads public server-rendered HTML/plain text. It does not execute
JavaScript, inherit browser logins, solve CAPTCHA, scrape unrelated tabs, or
perform purchases, form submissions, downloads or arbitrary scripts. Search
markup, site access rules and rate limits can cause explicit retrieval errors.
Additional search adapters can be added as separate capabilities.
Inference/search still depend on the selected providers and network.

## Verification

Go tests cover pairing ownership, expiry, replay rejection, revocation, CLI
commands, source extraction, cancellation and the real agent/tool loop. Frontend
tests exercise the real TanStack client, streaming, errors, cancellation,
pairing validation, and the existing UI behavior. The `companion-test` target
runs the real binary and Chromium against an isolated authenticated Go runtime.
Only model output and web pages are deterministic fixtures; no real provider
credentials, production database, or paid inference is used.

See `packages/tamizhi/client/README.md` for commands and UI setup.

## Leo provider

`provider.leo` registers the `leo/default` model. It is selected by default when
Leo is present in a connected catalog. Auto resolves to Leo under the normal
default companion configuration, while explicit BYOK model IDs remain available.
No external model API or model weights are used. Stateless planners inspect only
the current user turn and its tool results, then emit calls into the existing
Go agent loop. Custom planners can be supplied to `LeoPlugin(...)`.

The initial workflows cover greetings/help, tool schema discovery, explicit
installed-tool calls (including MCP), owned memory and bounded web research.
Plain public-topic lookups (for example “Leo movie”) and informational questions
can infer web research. Bounded intent rules strip conversational prefixes and
recognize memory/tool-discovery phrases first. Requests recognized as private/app
information or actions ask for clarification. Slash commands are optional. Page text is only quoted/escaped data;
source titles or content never choose subsequent tools. Read excerpts retain
source links. Failures and missing tools are surfaced without invented answers.
Context compaction is a bounded verbatim extract with the durable transcript
retained. The UI still supports BYOK for broader model-backed reasoning.
