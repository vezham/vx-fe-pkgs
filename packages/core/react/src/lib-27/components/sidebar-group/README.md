# Sidebar groups

Import `SidebarGroup` from `@vezham/react/components/sidebar-group`. It renders
page-tree folders with Disclosure headings and flat child links.

Use `SidebarGroup.filterTree(options)` to scope a tree to a collection section.
Use `SidebarGroup.createGroups(options)` to also move folder index pages into
their child lists, leaving the heading available to toggle the group.

```tsx
import { SidebarGroup } from '@vezham/react/components/sidebar-group'

const children = SidebarGroup.createGroups({
  docsBase: '/handbook',
  prefix: 'markdown',
  nodes: sourceTree.children,
  resolveIcon: resolveDocsIcon
})

const layoutOptions = {
  ...options,
  sidebar: {
    ...options.sidebar,
    components: { ...options.sidebar?.components, Folder: SidebarGroup }
  }
}
```

Pass the localized collection URL as `docsBase`. An empty `prefix` selects only
the collection landing page. Inputs are not mutated.

Keep collection labels, icons, ordering, and pages in content metadata. Icon
resolution is optional and belongs to the consuming app: pass a `resolveIcon`
callback when metadata contains icon placeholders. Icons otherwise pass through.
