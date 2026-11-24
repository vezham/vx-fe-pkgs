// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { FileCode, Folder, FolderOpen } from '@gravity-ui/icons'
import { Collection } from 'react-aria-components/Collection'
import { useTreeData } from 'react-aria-components/useTreeData'

import { FileTree, useFileTreeDrag } from '@vezham/react-pro-v3'

const folderIcon = ({ isExpanded }: { isExpanded: boolean }) =>
  isExpanded ? <FolderOpen /> : <Folder />

interface DndFileNode {
  id: string
  title: string
  children?: DndFileNode[]
}

const dndInitialItems: DndFileNode[] = [
  {
    children: [
      {
        children: [
          { children: [], id: 'button-tsx', title: 'button.tsx' },
          { children: [], id: 'card-tsx', title: 'card.tsx' },
          { children: [], id: 'modal-tsx', title: 'modal.tsx' }
        ],
        id: 'components',
        title: 'components'
      },
      {
        children: [
          { children: [], id: 'compose-ts', title: 'compose.ts' },
          { children: [], id: 'cn-ts', title: 'cn.ts' }
        ],
        id: 'utils',
        title: 'utils'
      },
      { children: [], id: 'index-ts', title: 'index.ts' }
    ],
    id: 'src',
    title: 'src'
  },
  { children: [], id: 'package-json', title: 'package.json' },
  { children: [], id: 'tsconfig-json', title: 'tsconfig.json' },
  { children: [], id: 'readme', title: 'README.md' }
]

export function DragAndDrop() {
  const tree = useTreeData<DndFileNode>({
    getChildren: item => item.children ?? [],
    getKey: item => item.id,
    initialItems: dndInitialItems
  })

  const { dragAndDropHooks } = useFileTreeDrag({ tree })

  return (
    <FileTree
      aria-label="Draggable file tree"
      className="w-[300px]"
      defaultExpandedKeys={['src', 'components', 'utils']}
      dragAndDropHooks={dragAndDropHooks}
      items={tree.items}
      renderEmptyState={() => <div>No files</div>}
      selectionMode="multiple">
      {function renderItem(item: (typeof tree.items)[number]) {
        const hasChildren = item.children && item.children.length > 0

        return (
          <FileTree.Item
            icon={hasChildren ? folderIcon : <FileCode />}
            id={item.key}
            textValue={item.value.title}
            title={item.value.title}>
            {!!hasChildren && (
              <Collection items={item.children ?? []}>{renderItem}</Collection>
            )}
          </FileTree.Item>
        )
      }}
    </FileTree>
  )
}
