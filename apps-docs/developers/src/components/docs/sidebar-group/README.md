# Sidebar groups

Reusable notebook sidebar groups with HeroUI Disclosure and flat page links.
Keep collection labels, icons, ordering, and pages in content metadata.

- `index.tsx`: `SidebarGroup` folder renderer.
- `tree.ts`: section filtering and group preparation.
- `tree.test.ts`: filtering and group preparation tests.

Content icon resolution lives independently in `src/lib/docs/icons.ts` as
`resolveDocsIcon`, shared by any docs component that needs metadata icons.

Prepare the content tree in the route loader:

```tsx
import { createSidebarGroups } from '@components/docs/sidebar-group/tree'

const children = createSidebarGroups({
  docsBase: '/handbook',
  nodes: sourceTree.children,
  prefix: 'markdown'
})
```

Pass the localized collection URL as `docsBase`. An empty `prefix` selects only
the collection landing page. Group indexes become regular links inside their
groups, leaving the group heading available to toggle its pages.

Register the renderer in the notebook layout options:

```tsx
import { SidebarGroup } from '@components/docs/sidebar-group'

const layoutOptions = {
  ...options,
  sidebar: {
    ...options.sidebar,
    components: { ...options.sidebar?.components, Folder: SidebarGroup }
  }
}
```

Use `filterSidebarTree` from `./tree` when only section filtering is needed and
the existing folder/index presentation should remain. Loaders import the tree
helper directly to avoid importing the Disclosure renderer.
