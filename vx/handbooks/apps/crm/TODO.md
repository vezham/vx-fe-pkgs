# CRM checklist

Completed and pending implementation and verification work for the local-first
CRM workspace. See [README.md](./README.md) for architecture, storage guarantees
and verification commands.

Checked items are implemented in the current baseline. Completed contracts and
SQL design do not mean cloud services are connected or the schema is deployed.

## Done

### Done: local workspace

- [x] Shared AppLayout/SectionLayout, responsive navigation and Control Center theme.
- [x] App-scoped workspace creation, switching, rename and deletion; isolated content.
- [x] Spaces, folders, nested pages, databases, records, channels and files.
- [x] Sidebar hierarchy, breadcrumbs and a project starter template.
- [x] Create, rename, move, duplicate, icons, page covers, favorites, pins and editing locks.
- [x] Rich pages: headings, formatting, lists, nested checklists, quotes, dividers, tables, links and undo/redo.
- [x] Workspace links, backlinks and linked child content.
- [x] Channels, editable messages, threads, reactions, pinned messages and archive/unarchive.
- [x] Message attachments and local channel read cursors.
- [x] Threaded comments on pages and records.
- [x] Database field creation, configuration, ordering and removal.
- [x] Text, number, checkbox, select, multi-select, date, email, phone, URL, person, file, relation and rollup fields.
- [x] Created/updated time and author fields; person fields use the local identity.
- [x] Table, board and calendar view creation, configuration, rename and removal.
- [x] Field visibility, multiple filters, sorting, record search and grouping.
- [x] Board drag/drop, keyboard-editable grouping fields and calendar month navigation.
- [x] Inline table edits, record properties, rich record content and comments.
- [x] Local file upload/download and image, audio, video, PDF and text previews.
- [x] Search over titles, page text and messages; recent items and activity.
- [x] Cascading trash, restore, independent-child restore protection and permanent deletion.
- [x] Recent version history, stale-write rejection and rich-text draft conflict recovery.
- [x] HTML/text page exports, CSV database exports and workspace/item JSON backups.
- [x] Backup file bytes, validated import as new items and reference remapping.

### Done: persistence and offline behavior

- [x] IndexedDB for content, history, outbox and file Blobs.
- [x] LocalStorage limited to small preferences and current workspace selection.
- [x] Atomic content/file transactions and rollback on failed writes.
- [x] Cross-tab propagation and revision checks against concurrent overwrites.
- [x] Preserve invalid stored content; report initialization failures without overwriting it.
- [x] Preserve the editor and recoverable drafts after failed writes.
- [x] Protect deleted workspace scopes against late writes.
- [x] Static/prerendered build and SPA fallback; no SSR server required.
- [x] Production service worker for offline reopening and explicit update activation.
- [x] Storage usage, persistent-storage request and backup controls.

### Done: future server foundation

- [x] Shared runtime schemas and TypeScript contracts in `@vezham/workspace-contracts`.
- [x] Immutable local IDs, nullable remote mappings and local/remote revisions.
- [x] Durable mutation outbox, operation IDs and installation sequence numbers.
- [x] Push batching, validated acknowledgements and conflict preservation.
- [x] Preserve newer edits and remote revisions when old acknowledgements arrive.
- [x] Content-free purge operations and retained identity design to prevent resurrection.
- [x] File-upload and reserved change-feed contracts.
- [x] Proposed Neon PostgreSQL tables, constraints, indexes and deny-by-default RLS.
- [x] REST/GraphQL adapter boundaries and server transaction/security requirements documented.

### Done: current verification

- [x] 38 unit tests across CRM models, shared storage hooks and sync contracts.
- [x] 12 browser tests: six desktop and six mobile viewport tests using Chromium.
- [x] Offline editing/reopening, cross-tab propagation and workspace isolation exercised.
- [x] Chat, attachments, database views, backup/import, trash and conflict recovery exercised.
- [x] Production build, type checks, ESLint and CSS style checks pass.
- [x] Local React Doctor: zero errors and warnings; external scoring disabled.
- [x] Scoped Fallow: zero dead-code findings and duplicate clone groups.
- [x] Desktop/mobile visual check and correction of unsupported navigation icons.

## Pending

### Local completeness and hardening

- [ ] Complete a feature-by-feature Colanode parity review and record remaining local gaps.
- [ ] Run the browser suite in Firefox and WebKit; mobile viewport tests are not native-device coverage.
- [ ] Complete keyboard, screen-reader and light/dark/system-theme acceptance checks.
- [ ] Exercise storage quota exhaustion, browser eviction and recovery from damaged backups.
- [ ] Benchmark large workspaces, long conversations and near-limit file/backup operations.
- [ ] Expand regression coverage to all field/view combinations and complex nested operations.
- [ ] Connect Tamizhi to workspace content through explicit, permission-checked read/write tools.

### First cloud milestone — push to Neon

- [ ] Validate the proposed SQL against PostgreSQL and establish the server migration baseline.
- [ ] Implement server authentication, principals, workspace registration and device registration.
- [ ] Implement membership/grant enforcement and request-scoped RLS policies.
- [ ] Implement the REST or GraphQL push adapter using the shared contracts.
- [ ] Resolve local references to remote IDs and enforce hierarchy/cell validation server-side.
- [ ] Apply revisions, projections, receipts and change-feed entries in one transaction.
- [ ] Implement idempotent retries, revision preconditions and permanent-deletion handling.
- [ ] Add verified object-storage uploads/downloads; keep file metadata in Neon.
- [ ] Add client connection settings, explicit sync status, retry/backoff and conflict-resolution UI.
- [ ] Verify push retries, authorization failures, interrupted uploads and deletion end to end.

### Later synchronization and collaboration

- [ ] Initial download, incremental pull, cursor retention and explicit full resync.
- [ ] Multi-device convergence and user-facing conflict resolution beyond upload acknowledgements.
- [ ] Invitations, membership management and server-enforced inherited roles/grants.
- [ ] Direct messages between authenticated users.
- [ ] Realtime presence, typing indicators and remote notifications.
- [ ] Live rich-text coediting through a separate CRDT protocol.
- [ ] Public sharing and email/push notifications.

Native desktop/mobile packaging is outside the current static web app scope.
Cloud implementation is planned after this local-first stage.
