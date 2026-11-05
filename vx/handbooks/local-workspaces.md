# Local workspaces

The shared `AppLayout` automatically provides local workspaces for apps with an
app identity (`useApp().id`). Each app gets its own catalog and current selection.
An existing outer `WorkspaceProvider` is reused, so hosts can customize the
initial name or scope without creating nested catalogs. Test is the first content
integration and uses the shared `My Workspace` default. App roots do not need
their own workspace provider or initialization.

The original user avatar, identity header, status controls, and Preferences entry
remain. Guests use the same presentation with a `Guest` name and avatar fallback;
logout is available only for signed-in users. Workspace switching and creation
are available through a workspace submenu, matching the availability menu.
Small screens open the workspace list inside the account bottom sheet with a
back action. Guests use the `VezhamAccounts` icon as their avatar fallback. Preferences opens Settings → Account when the host enables
its Settings route.

`WorkspaceProvider` reads the app identity or accepts an explicit `appId`.
`defaultName` controls the initial workspace. Hosts rendered without an app
identity must provide an explicit workspace scope to enable persistence.

`useWorkspace()` exposes the active workspace, catalog, readiness, storage errors,
and create/select actions. Local workspace IDs are created with
`crypto.getRandomValues`, which works on local HTTP development origins.

Use `useWorkspaceStore(key, initialValue, options)` for workspace-owned browser
data. It uses `@vezham/hooks` `useIndexedDBStore` and scopes keys by app ID
and workspace ID. Keep defaults and parsers stable. Workspace catalogs, notes,
and local Tamizhi conversation histories are stored in the `vezham` IndexedDB
database (`records` object store). Current workspace selection and preferences
(theme, recent profiles, etc.) remain in localStorage. Remote Tamizhi histories
remain owned by their API client.

Storage loads asynchronously after mount. Check `isReady` before editing and
`isSaved` before claiming a durable save. `setValue` updates the UI immediately
and returns `Promise<boolean>` after its transaction completes. Functional
updates must be pure: they run optimistically and again against the latest saved
record inside one read/write transaction. Accepted writes finish after unmount.
`create(name)` resolves to the new ID after saving; only then does it select it.
Failures surface through `error` and do not fall back to localStorage.

BroadcastChannel notifies other tabs about committed records; storage events
synchronize the current workspace selection. Invalid catalogs are preserved and
reported as errors. This baseline includes no legacy localStorage migration.

The Test scratchpad demonstrates isolation, reload persistence, and offline edits
while the app is open. Its embedded Tamizhi session is also workspace-scoped.
Existing app feature stores must adopt this scoped hook when they are integrated;
wrapping an app does not automatically re-scope unrelated React Query caches,
bookmarks, archives, preferences, or remote records.

AFFiNE's local workspace flow informed the UX: a local workspace needs no login,
creation selects it, and switching selects a distinct data scope. The implementation
uses Vezham HeroUI components and has no AFFiNE runtime dependency.

Cloud workspaces, account linking, remote IDs, document synchronization, and
collaboration remain future work. Local workspaces do not claim cloud sync or
cross-device persistence. Static/prerendered markup uses stable defaults and
browser storage is loaded on subscription after mount.

Each workspace has an overflow menu with Rename and Delete. Renaming preserves
its ID and records. Deletion requires confirmation, protects the last workspace,
and switches an active deleted workspace to a remaining one. Catalog changes,
scoped notes, and local embedded chat history are deleted in one IndexedDB
transaction. Scoped deletion markers prevent delayed or cross-tab writes from
recreating removed records. Destructive changes update the UI only after commit.
Only records stored through the workspace namespace are deleted; unrelated app
preferences and remote API data are not part of local workspace deletion.
