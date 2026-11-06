# Workspace contracts

Shared browser/server contracts for the local-first CRM workspace. This is a new
baseline: version 1 rejects incompatible content; no legacy migration exists.

- `src/lib/schema.ts`: runtime Zod validation and TypeScript data types.
- `src/lib/sync.ts`: transport-neutral push/acknowledgement and change-feed types.
- `schema/postgres.sql`: proposed Neon PostgreSQL server baseline, not executed by
  this package. There is currently no remote connection or cloud synchronization.

## Local data and identifiers

Content, revisions, the mutation outbox, and file Blobs live in IndexedDB, scoped
by app and workspace. Small preferences and selected workspace stay in
localStorage. Content and associated file bytes commit in one IndexedDB
transaction. Browser storage can be cleared or evicted: a complete JSON backup
includes file bytes, and the Storage screen can request persistent storage.

Each entity has an immutable local UUID (`id`), independent nullable `remoteId`
(the PostgreSQL `entities.id`, referenced by `nodes.id`, conceptually `remote_id`), local `revision`, and
`remoteRevision`. A workspace has its own remote UUID once registered. `clientId`
identifies an installation, not a user account or authorization principal.
Server authentication must map an OIDC identity to a principal and membership;
never trust a client-supplied author, role, or workspace ID for access decisions.

Database field/view IDs are stable UUIDs. Parent references, record relations,
message replies, and attachment references use local IDs in browser payloads.
The server resolves them through the workspace/device `entity_mappings` local-to-remote mapping;
responses and change feeds must translate references for the receiving device.
Cross-workspace foreign keys are prohibited. Server projections must validate
parent kinds, cycles, fields, and cell values transactionally, beyond SQL FKs.

## Future API adapter

The contract is transport-neutral; a REST implementation could use:

- `POST /v1/workspaces`: register a local workspace and return `remote_id`.
- `POST /v1/workspaces/{remote_id}/push`: validate `PushRequest`, return
  `PushResponse`. A GraphQL mutation can accept the same logical envelope.
- `GET /v1/workspaces/{remote_id}/changes?after={cursor}`: reserved change feed.
- `POST /v1/workspaces/{remote_id}/files/uploads`: authorize an object upload,
  then verify size/hash before accepting the associated file mutation.

No credentials, PostgreSQL drivers, or backend handlers belong in the static
app. Cloud transport is deliberately not active yet.

Pushes carry immutable operation IDs, installation sequence numbers, local
entity revision, and expected remote revision. Persist a receipt keyed by
workspace/client/operation and return the identical acknowledgement on retries;
reject reuse of an operation ID or sequence with different content. Authenticate
and check membership/inherited grants for every operation. Resolve parent and
relation dependencies before accepting a child. Report unready dependencies as
retryable, without acknowledging unrelated operations as accepted.

Compare expected remote revision while holding the entity row lock. Apply the
entity, projections, history, receipt, and change-feed entry in one transaction.
A revision mismatch returns a conflict and the authoritative server state.
The client preserves conflicts for explicit resolution; it never silently
replaces newer local edits. Only accepted operation IDs leave the outbox.
Each batch sends the earliest pending operation per entity (up to 100), keeping
later edits blocked behind a conflict. Subsequent edits receive the acknowledged
remote mapping/revision. Outbox operations are never discarded to meet a cap.

Files use object storage later, not base64 PostgreSQL columns. Local backups use
base64 solely for portability. Permanent deletion removes local bytes, snapshots,
and queued content, and queues a content-free purge. The server must delete
payload/revisions/projections/object bytes while retaining the content-free `entities` row, its `purged_at` marker, device mappings, and
idempotency tombstones so stale writes cannot recreate the entity. Retention and
change-feed expiry require an explicit full-resync protocol before rollout.

Push-only transfers one device's changes. Multi-device synchronization also needs
the reserved pull feed, conflict resolution, and an initial download. Simultaneous
rich-text coediting needs a separate CRDT protocol; revision checks are not CRDTs.

## Server security work before enabling cloud

The SQL schema enables RLS with no policies, so a restricted role is denied by
default. Add membership/grant policies, request transaction identity, inheritance,
owner-transfer constraints, and audit access before using it. Migration owners
bypass ordinary RLS; the API must not use that role. Deploying the schema,
authentication, REST/GraphQL, realtime subscriptions, and object storage are later
server work, not features of the local browser implementation.

The SQL identity table owns the canonical remote revision, including after purge.
`entity_mappings` permits multiple devices to map their local UUIDs to the same
remote entity, but a local UUID cannot be remapped to another entity. A node is the
content-bearing row attached to that identity. Purge removes node content, marks
the identity purged, and retains mappings/receipts. Never recycle purged IDs.
Fields, views, and record cells have authoritative relational rows; the API
serializer rebuilds the wire JSON. Keep rich documents in `nodes.document`,
remaining kind metadata in `nodes.data`, and derived plain text in `search_text`.
Update identity revision, payload, relational values, history, receipt, and feed
in the same transaction. No projection is updated by the browser directly.

Hierarchy mutations must serialize their cycle check and write per workspace
(for example, a transaction-scoped advisory lock), or use a serializable
transaction with retries. Locking only the moved node does not prevent two
concurrent opposite moves from creating a cycle. Cell/reference validation and
purge cleanup must run under the same transaction boundary.
