# Documentation layout

All docs routes use the notebook shell with the shared `NotebookHeader`, section
row, and sidebar controls. For a single-page collection, use
`getNotebookLayoutOptions`; UI libraries, assets, and the handbook keep their
section-specific notebook options. Keep each collection's own navigation.
Use the shared `NotebookDrawerHeader` and `NotebookDrawerFooter` for mobile and
tablet navigation across UI, Assets, Packages, and Handbook. The UI docs drawer
is the layout baseline: brand and section picker on mobile, collection selector
and section picker on tablet, and collection controls with ControlCenter in the
mobile footer. Derive section options and selection from the same navigation as
the desktop header.
`NotebookHeader` and `NotebookDrawerFooter` render `ControlCenter` by default.
It reads the current locale and path from the router. Use `controls` only for a
page-specific replacement, or `controls={false}` to hide it.

## UI documentation layout

Use `/docs/ui/react-v3/web/getting-started` as the layout baseline for all UI
libraries, including Pro and the in-house Vezham library. Reuse
`getPlatformLayoutOptions`, `PlatformNotebookHeader`, section tabs, and the
sidebar drawer components. Use `getting-started` for the introductory page.
Change this layout only when the user explicitly requests it.

Each library has its own sub-navigation and MDX content collection. Derive
section order, visibility, and labels from that collection's content tree and
metadata through `platform-sections.ts`. Share layout components, not section
lists. Platform switching resolves live MDX pages, not generated gallery lists. Store placeholder content as TODO text in the library's
`getting-started/index.mdx`, rather than a dedicated TODO React page/component.
Show platform tabs only for registered MDX collections that contain pages.

Content collections:

- Vezham v3: `content/docs-react-v3/{web,native}`
- Vezham Pro v3: `content/docs-react-pro-v3/{web,native}`
- In-house Vezham: `content/docs-react/{web,native}`

UI and package entry routes open the first section listed in content metadata.
Keep redirect logic in their shared route helpers.

All three UI libraries use `/docs/ui/{library}/{web,native}/*` as canonical URLs.
Each library uses the same four route files; page and markdown URLs require a
platform. Library roots resolve the first available platform and content section
(currently Web Getting Started). Native content for the
in-house library is currently a TODO in MDX using the shared docs layout.
The in-house `react` library is the default for shared docs helpers and UI
components. `/docs` and `/docs/ui` open its Web Getting Started page. Pass
`react-v3` or `react-pro-v3` explicitly for those libraries.
Keep library labels, selector metadata, groups, platform labels, and route bases
in `src/config/ui-libraries.ts`. Routes supply page-title context explicitly;
`src/lib/page-head.ts` only formats browser and social metadata, without parsing
URLs to infer library or section names.
Keep UI route files as adapters to `UiDocsPage` and the shared route options and
Markdown handler in `src/lib/docs/platform-route.ts`. Search and LLM endpoints
share the collection registry in `src/lib/docs/runtimes.ts`.
Keep platform switching and section links on the selected library and fall back
to its section index when a page is unavailable.

## Handbook routes

There is no `/handbook` landing page or redirect. The Handbook card on Home links
directly to `/handbook/markdown`. Handbook pages resolve only from the content
collection; missing pages return 404. Markdown lives in `content/handbook/markdown` within the same collection,
with its MDX index rendered at `/handbook/markdown`. Register the handbook runtime
only once for search and LLM endpoints. Handbook route files are adapters to
`HandbookDocsPage` and `handbook-route.ts`; its tabs come from the same content
tree as its sidebar. Keep TODO text in MDX; do not add generic TODO page
components, platformless UI branches, or redirects for retired URLs.
Scope and normalize the handbook sidebar with the shared page-tree filter used
by UI and Packages; section roots should not add an extra sidebar folder.
Markdown groups use `SidebarGroup` with HeroUI Disclosure so child links
retain the flat Assets Guides sidebar styling, with icons and collapsible group
headers. Keep group labels, icons, and ordering in content metadata.
Keep the reusable renderer, tree helpers, and tests together in
`src/components/docs/sidebar-group`. Loaders import `filterSidebarTree` or
`createSidebarGroups` from its `tree` module; pages import `SidebarGroup` from
the folder entry point. Keep collection-specific loading and metadata outside
this component folder. Share metadata icon resolution independently through
`resolveDocsIcon` in `src/lib/docs/icons.ts`.

## Asset library routes

Keep asset galleries, details, packages, FAQ, and framework guides under
`src/routes/{-$lang}/docs/assets`. Galleries use `icons`, `illustrations`, and
`logos`; framework documentation uses `guides`. Their public paths start with
`/docs/assets`, alongside UI documentation at `/docs/ui`. Keep the app homepage
at `src/routes/{-$lang}/index.tsx`.

## Package documentation

Package docs use `/docs/packages/{package}/*` and
`content/docs-packages/{package}`. Keep the package registry and installed
versions in `src/config/packages.ts`. The package dropdown occupies the notebook
platform-switch position; the current documented version appears beside the
brand. Only the latest documented version is available for now. Derive package
sections from the content tree: `meta.json` controls their order and section
index MDX files supply their titles. Keep TODO content in MDX. `/docs/packages` opens the
default package's Getting Started page.
Use HeroUI Sheet for the package picker in the mobile drawer footer; keep Select
on tablet and desktop. Both use the same content-derived options and navigation.
`PackageSelector` handles responsive presentation internally; layouts pass only
the shared `secondary` control.

## Standalone page layout

Use `.vx-page__content` from `packages/vx/styles/page.css`, imported by the app's
`src/app/global.css`, for non-docs page content including Home. It centers content
up to 1285px wide with responsive padding.
Keep full-width sections outside this container. Page utilities may override the
default width, margins, or padding when needed. Docs pages use the shared styles
in `packages/vx/styles/docs/index.css`.
