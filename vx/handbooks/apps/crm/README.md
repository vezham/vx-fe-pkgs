# CRM local-first workspace

CRM is the proving app for a Vezham workspace inspired by Colanode. It uses the
shared AppLayout/SectionLayout, account/workspace picker, Control Center theme,
and HeroUI components with compound dot notation. Colanode is a feature reference;
this implementation does not wrap its server or copy its client database.

Track completed and pending implementation work in [TODO.md](./TODO.md).

Reference feature inventory: Colanode `packages/core/src/registry/nodes` (node
kinds and field types) and `packages/ui/src/components` (pages, messages,
databases, files, spaces and workspaces).

The local browser is a single-user environment. Person fields identify the local
user. Account invitations, server-enforced roles and grants, other people's direct
messages, presence/typing across devices, live CRDT coediting, email/push
notifications and public sharing require the future authenticated server. These
are not simulated as working local features. Node locks are editing conveniences,
not an authorization boundary. Native desktop/mobile packaging is outside this
static web app.

## Storage and durability

`@vezham/workspace-contracts` is the shared Zod/TypeScript baseline. The browser
stores one validated workspace state in IndexedDB, with Blobs in separate scoped
records. A write transaction commits state, history, outbox and associated file
bytes together. A failed transaction does not leave metadata pointing at a
partially saved file. Workspace deletion removes scoped records and rejects late
writes into deleted scopes through the shared IndexedDB hook.

LocalStorage contains only small preferences and current workspace selection.
No content is copied there as a fallback. `isLoaded` records a successful validated read separately from completion of initialization (`isReady`), so write failures retain the editor while an initial read failure does not expose an empty writable workspace. An invalid saved schema is preserved
and reported rather than silently overwritten. This is a new version-1 baseline;
there is no legacy migration or backward compatibility layer.

Commands reject stale revisions and cyclic or invalid parentage. Rich-text drafts
retain their base document; a concurrent document change requires an explicit
copy/discard choice. This is optimistic concurrency, not collaborative CRDT
merging. The save indicator waits for both editor drafts and IndexedDB writes.
Pending drafts also protect browser unloading. A browser crash can still lose
unacknowledged edits; only an acknowledged save is durable.

Trash operations have explicit group UUIDs, so separately deleted children remain
in Trash even if timestamps happen to match. Permanent deletion removes scoped
file bytes, content-bearing queued operations, historical snapshots and old
activity titles, while retaining a content-free purge operation for later sync.

Current bounds are 50 MB per file, 140 MB of file bytes per portable JSON export,
and 200 MB per imported JSON file. Export a smaller space/folder when needed.
The UI keeps the latest 200 workspace revision snapshots and 500 activity events;
the sync outbox is not truncated. Backup import creates new local IDs from current
items and file bytes; it does not replay another installation's outbox, activity,
or previous revision history. Keep the exported backup if that archival metadata
is needed. Imported/duplicated references inside the exported tree are remapped.

## Static hosting

- `pnpm exec nx run crm:dev` starts development.
- `pnpm exec nx run crm:build` builds/prerenders, then generates `workspace-sw.js`.
- `pnpm exec nx run crm:serve-static` serves `.output/public` with SPA fallbacks.
- Deploy `.output/public`; route unknown application paths to `/_shell.html`.
- No SSR process, database secret or API server is required for local workflows.

Offline reopening is enabled after a successful production load on HTTPS or
localhost. The worker precaches the shell and same-origin build assets. It does
not cache API responses or send workspace content to a server. Updates wait for
an explicit reload in Storage & backup. Development builds do not register this
worker. The generated generic `public/sw.js` remains owned by metadata generation;
CRM registers its own built `workspace-sw.js` instead.

## Neon/server foundation

See the [workspace contracts handbook](../../../../packages/workspace/contracts/README.md)
and [proposed PostgreSQL schema](../../../../packages/workspace/contracts/schema/postgres.sql).
Local UUIDs and remote PostgreSQL UUIDs are separate. Push operations use immutable
operation IDs, installation sequence numbers, entity revisions and expected remote
revisions. Acknowledgements remove only the accepted operations and preserve newer
local edits. Conflicts remain queued; no transport is enabled yet.

The proposed PostgreSQL schema covers workspaces, OIDC principals, memberships,
devices, persistent content-free entity identities, workspace/device mappings, hierarchical nodes, database fields and
views, cells, relations, file objects, revisions, grants, user state, idempotency
receipts and a change feed. Request identity and RLS policies must be implemented
before using it. This design SQL has not been applied to Neon.

Push-only upload is the first cloud milestone. Multi-device synchronization also
needs pull/initial download and explicit conflict handling. Files need verified
object uploads; Neon should hold metadata, not base64 file payloads. REST and
GraphQL can serialize the same contracts. Realtime rich-text coediting is a later
separate CRDT protocol, not a property of `remote_id` mappings.

## Verification

- `pnpm exec nx run-many -t test -p crm,workspace-contracts,hooks --parallel=1`
- `pnpm exec nx run crm:typecheck`
- `pnpm exec nx run-many -t lint -p crm,workspace-contracts,hooks,react`
- `CI=true PRE_PORT=8080 pnpm exec nx run crm:e2e -- --project=chromium --retries=0`
- `CI=true PRE_PORT=8080 pnpm exec nx run crm:e2e -- --project=mobile --retries=0`

The 12 browser tests (six desktop and six mobile) use a static file server. They cover offline edits/reopening,
cross-tab propagation, messages/threads/reactions/attachments, record editing,
table/board/calendar views and confirmed restore/deletion. Unit tests cover graph
invariants, stale writes, typed values/rollups, backups, trash group isolation,
atomic storage and push acknowledgements. React Doctor runs locally with
`--no-score --no-supply-chain`; external scoring is not authorized.
