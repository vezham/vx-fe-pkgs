# Tamizhi

Tamizhi supports a standalone static/prerendered app and an embedded assistant in AppLayout. Both share HeroUI UI, avatar behavior, browser-safe contracts and a typed client. The production backend lives in the sibling **vx-be-kit-lab** Go workspace.

| Package                     | Responsibility                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| `@vezham/tamizhi-contracts` | Generated Go API types plus browser runtime validation                                                 |
| `@vezham/tamizhi-client`    | Authenticated API requests, SSE streaming/reconnect, explicit cancellation and typed feature endpoints |
| `@vezham/tamizhi-ui`        | Standalone composer, compact composer-lite, avatar, embed, messages and capability-driven controls     |
| `@vezham/tamizhi-core`      | Earlier TypeScript prototype; retained for comparison/tests, not the production backend                |

## Backend connection

Set the public build variable `V_TAMIZHI_API_URL` for the standalone app. Without it, the app retains its local prepared-reply demo. **Tuning → AI settings** remains visible and explains that provider management needs a connected API. Users add their own provider keys in **Tuning → AI settings** after signing in. Keys are encrypted on the Go backend and never saved in browser local storage.

The backend uses **Neon Postgres** through Go `pgx`. Its server-only `DATABASE_URL` comes from Neon Console; keep its TLS options and use a pooled URL for API traffic. The browser only receives `V_TAMIZHI_API_URL` and never connects directly to Postgres. SQLite is reserved for explicit local development and test fixtures.

The Go backend is linked to [Tamizhi on Neon](https://console.neon.tech/app/projects/late-flower-50992894/) in Singapore. Credentials stay in the backend repository’s git-ignored `.env.local`; project-scoped MCP and Neon skills are configured there.

```tsx
import { createTamizhiClient } from '@vezham/tamizhi-client'
import { TamizhiSessionProvider, TamizhiEmbed } from '@vezham/tamizhi-ui'
import '@vezham/tamizhi-ui/index.css'

const client = createTamizhiClient({
  baseURL: 'https://api.example.com/api/tamizhi',
  credentials: 'include'
})

<TamizhiSessionProvider client={client} storageKey="my-app:tamizhi">
  <TamizhiEmbed />
</TamizhiSessionProvider>
```

For menu integration pass `<AppLayout tamizhi={{ client }} ... />`. Browser login uses the Go API's OIDC cookie session; host applications can also supply asynchronous authorization headers. Keep frontend/API on the same site for cookie sessions and configure exact API CORS origins. Static/prerendered output never requires SSR.

## App profiles and appearance

The shared **Who’s helping?** picker lists named app/domain profiles covering all 18 available outfits. **Tamizhi**, **CRM**, **Mail**, and **School OS** use their workspace app IDs; the remaining entries are domain presets such as Kitchen, Research, Dev Studio, Finance, and Security. See the [YAML profile registry](ui/vx.tamizhi.yaml) for names, stable IDs, personas, and outfits. Each profile declares its default persona and outfit. Unknown app IDs use Tamizhi. The standalone app lets users choose a profile through the welcome picker. Embeds automatically use the host app's profile and show a compact greeting, such as **How can I help with CRM?**, with **How can I help?** for the default Tamizhi profile. Embeds do not show the welcome profile switcher. The testing-only Tuning panel includes a profile selector for both surfaces, with static image previews of each profile's outfit rendered through the shared snapshot renderer. It resets manual appearance overrides; changing profile in an existing conversation starts a new chat while keeping the previous conversation in history. Profile switching is disabled while streaming. The app and embed welcome screens are maintained separately in `ui/src/lib/welcome.tsx` and `ui/src/lib/welcome-embed.tsx`; the chat keeps the shared avatar renderer and placement logic.

Edit the top-level `profiles:` list in `ui/vx.tamizhi.yaml` to configure the built-in profiles. The generator validates personas, outfits, activity overrides, unique IDs, and the required `vezham-tamizhi` default using the shared contracts. It writes typed data to `ui/src/generated/profiles.ts`; that file is ignored by Git and must not be edited manually. The browser imports the generated data and does not load or parse YAML. Host-provided `profiles` overrides remain typed TypeScript values. The optional `category` groups profiles in the welcome picker; uncategorized host profiles appear under **Other apps**. The picker keeps Tamizhi first, shows up to three recent choices stored in this browser, and searches app names or categories. Each profile appears once, with the full list available in a bounded scroll area.

Nx generates the registry before UI builds, tests, typechecks, and lint, with the YAML and generator included in its cache inputs. Run `pnpm nx run tamizhi-ui:profiles:generate` to regenerate explicitly, or `pnpm nx run tamizhi-ui:profiles:watch` while editing source consumers. The library's Vite dev server, tests, and `pnpm nx run tamizhi-ui:build --watch` also regenerate when the YAML changes. Use the library build watcher when a running app consumes the compiled package.

`@vezham/start` reads the app environment once through the runtime adapter and
provides its resolved identity via `useApp` from `@vezham/hooks`. `AppLayout`
automatically uses that app ID for its embedded Tamizhi session; app roots do not
need to import `APP_ID` or pass it again. Custom profiles and clients remain
explicit configuration:

```tsx
import type { TamizhiProfile } from '@vezham/tamizhi-ui'

const profiles: TamizhiProfile[] = [{
  id: 'vezham-crm',
  name: 'CRM',
  persona: 'planner',
  outfit: 'planner',
  activities: {
    mcp_crm_revenue_report: { outfit: 'money' },
    'skill.sales-coaching': { persona: 'helper', outfit: 'coach' }
  }
}]

<AppLayout tamizhi={{ profiles, client }} {...layoutProps} />
```

Use `tamizhi={{ appId: 'vezham-crm' }}` to override the host identity explicitly.
Standalone integrations can read `useApp()?.id` at their app boundary and pass it
as the fifth `useTamizhiChat` argument. Outside a runtime provider, the layout uses
Tamizhi's global default unless an explicit app ID is supplied.

Direct integrations can pass `appId` and `profiles` to `TamizhiSessionProvider`; standalone integrations pass them as the fifth `useTamizhiChat` argument. Host profiles replace built-ins with the same ID and can add new named choices. Tamizhi UI remains independent of runtime environment modules.

Activity keys must match actual execution event names, including the `mcp_<server>_<tool>` names used by the Go MCP plugin. Register skill execution names the same way; arbitrary prompt text does not select a skill. Configuring a mapping does not install a tool or skill. A matching `tool`/`approval` event applies its appearance until the matching `tool-result`, cancellation, or run completion. Concurrent and delegated calls are tracked independently by run/call ID. After an activity finishes, the avatar returns to the selected profile or the next active mapped activity. A manual outfit in Tuning takes precedence. Expressions and connection reactions remain independent.

Messages preserve their profile ID, persona and outfit through local storage, remote history, retries and branches. The Go runtime applies a fixed instruction for recognized personas while preserving host system instructions. App profile selection changes assistant behavior and presentation; backend authorization remains controlled by the authenticated user and configured tools.

When connected, history stays in memory in the browser and persists on the backend. The local demo continues using `useLocalStore`; remote conversations are not written into demo local storage. Incoming server messages retain their IDs so retry, feedback, tasks and branching operate on the canonical conversation.

The server streams durable sequenced events. The client reconnects with the last received sequence after a dropped response, without resubmitting a prompt/tool execution. Stop calls the cancellation API. Server restart preserves replayable events and marks unfinished runs interrupted.

## Login and SSO

Both standalone and embed show account controls without requiring an API error first. The sign-in chooser lists configured Google, Microsoft, GitHub and enterprise connections from the backend identity broker. OIDC authorization code, PKCE and HttpOnly sessions run on the Go backend. Sign-in restores the original app/host page only when its origin is explicitly trusted. Sign-out revokes the Tamizhi session without signing out of unrelated SSO applications.

Configure the broker using the backend's `config/tamizhi.sso.example.json` template; upstream providers still require client registrations. Clients can call `api.authSession()` for anonymous-safe identity/login metadata and `api.getLoginURL(returnTo, connection)` for a selected connection. Secrets are never part of the static build.

**Signing in does not automatically grant AI credits.** ChatGPT plan sharing for hosted apps requires provider access/registration; Gemini account authorization is implemented when its server registration is configured; Claude third-party inference uses supported API credentials. Model authorization remains separate from app SSO. The backend `docs/tamizhi-auth.md` records official references and remaining integration requirements. BYOK remains available.

## Provider settings

**Test & save key** validates the selected provider by discovering its account model catalog. OpenAI, Anthropic, Gemini, DeepSeek, Kimi and xAI are supported. Both standalone and embed update their model picker and capabilities after a key changes. The disconnected demo retains sample presets; connected models come from the account. OpenAI accounts with transcription/speech models enable voice input and read-aloud.

When the server configures its optional `geminiOAuth` block, select Gemini, enter your authorized Google Cloud project ID and choose **Connect Google account**. The browser performs Google consent without an API key. The backend encrypts and renews tokens, discovers models and handles streaming; disconnect removes the connection and models. That project's API permissions, quota and billing apply; Google consumer subscription credits are not imported. The backend `config/tamizhi.oauth.example.json` documents the required web-client registration and callback.

The backend encrypts saved keys with an owner-bound AES-GCM key. Its server-only `TAMIZHI_ENCRYPTION_KEY` (base64, 32 random bytes) or persistent owner-only `.vezham/tamizhi/credential-key` must be backed up separately from Neon. Removing or replacing a key cancels that user's active runs. Provider responses contain connection status and model metadata, never the secret.

## Available controls

- Model and Fast mode use the installed backend catalog; permissions are enforced by the backend, with explicit action approval cards.
- Both composers upload text, images and PDFs when the server/model supports them. Local demo attachments remain text-only. Voice input uses MediaRecorder and real transcription, with a one-minute recording limit. Read-aloud uses the speech endpoint.
- Tuning → AI settings exposes sign-in/out, server chat search/rename, checkpoints/restore, context compaction, memory and admin plugin enablement.
- Child-agent activity/approval events share the parent stream. Tool results and navigation requests remain typed data; navigation is shown as a local link.
- Feedback, task state and branching persist through the Go API. Layout routing remains in the standalone app.

All components use HeroUI compound notation and Control Center theme tokens. UI extension slots remain available through `TamizhiUIProvider` for `welcome`, `composer-actions` and `message-actions`. Assistant-message avatars use 28px static image snapshots of the saved message outfit/persona. The main companion keeps its live typing, streaming, and connection reactions. The upstream Momo engine/assets/licenses remain in the UI package.

## Contract synchronization

Run in the backend repository:

```sh
pnpm nx run tamizhi-contracts-go:generate
scripts/sync-tamizhi-contracts /path/to/this-repo
scripts/sync-tamizhi-contracts /path/to/this-repo --check
```

The frontend source keeps only `contracts/src/lib/generated/api.ts`. The optional API reference lives outside source at `contracts/openapi.yaml`, generated from the backend OpenAPI document during synchronization. The backend generates `openapi.yaml` directly from Go DTOs and sync copies it unchanged into the frontend reference. Backend `schemas.json` remains in the Go repository. Neither reference is included in frontend source or the browser package. The sync script checks both the TypeScript contracts and YAML reference with `--check`.

Do not manually edit `contracts/src/lib/generated/api.ts` or `contracts/openapi.yaml`. Go owns wire DTOs. Changes to browser Zod validation and behavioral adapters must accompany wire changes; integration tests validate the actual server/client combination.

## Verification

```sh
pnpm nx run-many -t test,typecheck,lint -p tamizhi-contracts,tamizhi-client,tamizhi-ui,tamizhi --parallel=1
pnpm nx run tamizhi:build
# First build the API through Nx in the backend workspace.
TAMIZHI_BACKEND_DIR=/path/to/vx-be-kit-lab pnpm nx run tamizhi-client:test --skip-nx-cache
```

The Go integration test uses a local mocked provider and temporary SQLite database. Running it requires the built API binary in the supplied repository. Real paid provider requests require a user-supplied BYOK key; the fixtures do not verify a vendor account. The optional Chromium suite checks login, BYOK settings, image forwarding, microphone recording/denial and native audio playback against local Go/OIDC/provider fixtures. Run it with `TAMIZHI_BACKEND_DIR=/path/to/vx-be-kit-lab pnpm nx run tamizhi-ui:browser-test`. Docker, deployment and CI verification are excluded from this work. The backend README describes setup, plugin configuration, execution boundaries and current single-process deployment constraints.

## Upstream review history

See the [Tamizhi upstream sync handbook](https://github.com/vezham-labs/vx-be-kit-lab/blob/timeline/vx/handbooks/tamizhi-upstream-sync.md)
for reviewed DSH commits, adopted behaviors, verification, and deferred work.
Optional integration failures and saved-versus-applied settings status follow
that ledger. Failed optional plugins remain visible in AI settings and can be
retried explicitly.
