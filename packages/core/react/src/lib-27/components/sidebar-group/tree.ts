import type { ReactNode } from 'react'

import type { Item, Node } from '@vezham/docs-core/page-tree'

export type SidebarGroupTreeOptions = {
  docsBase: string
  nodes: readonly Node[]
  prefix: string
  preserveSeparators?: boolean
  resolveIcon?: (icon: ReactNode) => ReactNode
}

const matchesSection = (node: Item, docsBase: string, prefix: string) => {
  if (!prefix) return node.url === docsBase || node.url === `${docsBase}/`
  const base = `${docsBase}/`
  if (!node.url.startsWith(base)) return false

  const path = node.url.slice(base.length)
  return path === prefix || path.startsWith(`${prefix}/`)
}

const filterNodes = ({
  docsBase,
  nodes,
  prefix,
  preserveSeparators = false,
  resolveIcon = icon => icon
}: SidebarGroupTreeOptions): Node[] =>
  nodes.flatMap((node): Node[] => {
    if (node.type === 'page') {
      return matchesSection(node, docsBase, prefix)
        ? [{ ...node, icon: resolveIcon(node.icon) }]
        : []
    }
    if (node.type === 'separator')
      return preserveSeparators
        ? [{ ...node, icon: resolveIcon(node.icon) }]
        : []
    if (node.type !== 'folder') return []

    const children = filterNodes({
      docsBase,
      nodes: node.children,
      prefix,
      resolveIcon,
      preserveSeparators:
        preserveSeparators ||
        Boolean(node.index && matchesSection(node.index, docsBase, prefix)) ||
        node.children.some(
          child =>
            child.type === 'page' && matchesSection(child, docsBase, prefix)
        )
    })
    const index =
      node.index && matchesSection(node.index, docsBase, prefix)
        ? { ...node.index, icon: resolveIcon(node.index.icon) }
        : undefined

    return children.length || index
      ? [
          {
            ...node,
            icon: resolveIcon(node.icon),
            defaultOpen: true,
            root: false,
            children,
            index
          }
        ]
      : []
  })

export const filterSidebarTree = (props: SidebarGroupTreeOptions): Node[] => {
  const nodes = filterNodes(props)
  if (nodes.length !== 1 || nodes[0].type !== 'folder') return nodes

  const { children, index } = nodes[0]
  return index?.type === 'page' ? [index, ...children] : children
}

// vx-bot/NOTE: Group headings toggle their pages; index pages remain regular links.
const groupNodes = (nodes: Node[]): Node[] =>
  nodes.map(node =>
    node.type === 'folder'
      ? {
          ...node,
          index: undefined,
          children: groupNodes([
            ...(node.index ? [node.index] : []),
            ...node.children
          ])
        }
      : node
  )

export const createSidebarGroups = (props: SidebarGroupTreeOptions): Node[] =>
  groupNodes(filterSidebarTree(props))
