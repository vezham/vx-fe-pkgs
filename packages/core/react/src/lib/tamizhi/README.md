# Tamizhi in the React package

Tamizhi is temporarily published as `@vezham/react/tamizhi/ui` and
`@vezham/react/tamizhi/contracts`. These modules can become separate packages
later without bringing app routes or shell providers with them.

- `ui`: shared local demo, conversation persistence, chat view, avatar, and playground.
- `contracts`: current conversation data types, independent of React and rendering.
- `client`: reserved for the future browser API client. No API contract is invented here.

The standalone app owns `/chat/$chatId` routing and SectionLayout. The new
**Tamizhi Preview** menu entry uses the same chat view inside the existing info
panel/bottom sheet. The original **Tamizhi AI** embed is unchanged for comparison.

Keep `TamizhiSessionProvider` above responsive panel mounts. AppLayout supplies
it once per user; closing a panel or switching desktop/mobile does not destroy
its conversation or cancel a reply. Other hosts can provide their own stable
storageKey, including app/workspace/user scope. Browser storage is origin-local;
it does not synchronize conversations across hosted apps on different origins.
The standalone demo retains `tamizhi.demo.v1` for existing history. The new menu
embed uses a separate `tamizhi.embed.<user-id>.v1` key.

These are static/prerendered clients. Storage reads begin after mounting and
never require server handlers. `useLocalStore` preserves the prerendered initial
snapshot, validates stored history, and debounces writes until the stream pauses.
Avatar engine and mesh assets are bundled with the package; consumers do not
need a public `/momo` directory. Engine imports and canvas creation occur only
in browser effects. Keep the upstream licenses with the vendored assets.

Import the normal `@vezham/react` stylesheet through the Vx style entry. Theme
tokens come from the host Control Center. Do not persist API credentials in the
generic local store. The current API-key playground field remains in memory.

Before syncing the app back to vx-fe-apps, publish/link a package version with
these subpath exports, then sync the thin app page, route adapter, sidebar, and
app stylesheet. The former app-local chat modules and public/momo are now owned
by the React package.
