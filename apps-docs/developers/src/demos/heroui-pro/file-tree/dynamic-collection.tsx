// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Collection } from 'react-aria-components/Collection'

import { FileTree } from '@vezham/react-pro-v3'

interface FileNode {
  id: string
  name: string
  children?: FileNode[]
}

const fileStructure: FileNode[] = [
  {
    children: [
      {
        children: [
          { id: 'fe-layout', name: 'layout.tsx' },
          { id: 'fe-page', name: 'page.tsx' },
          { id: 'fe-globals', name: 'globals.css' }
        ],
        id: 'frontend',
        name: 'frontend'
      },
      {
        children: [
          { id: 'api-index', name: 'index.ts' },
          { id: 'api-routes', name: 'routes.ts' }
        ],
        id: 'api',
        name: 'api'
      }
    ],
    id: 'apps',
    name: 'apps'
  },
  {
    children: [
      {
        children: [
          { id: 'react-index', name: 'index.ts' },
          { id: 'react-pkg-json', name: 'package.json' }
        ],
        id: 'react-pkg',
        name: 'react'
      }
    ],
    id: 'packages',
    name: 'packages'
  },
  { id: 'root-readme', name: 'README.md' },
  { id: 'root-agents', name: 'AGENTS.md' },
  { id: 'root-package', name: 'package.json' }
]

export function DynamicCollection() {
  return (
    <FileTree
      aria-label="Dynamic file tree"
      className="max-h-[380px] w-[300px]"
      defaultExpandedKeys={['apps', 'frontend', 'packages', 'react-pkg']}
      items={fileStructure}>
      {function renderItem(item: FileNode) {
        return (
          <FileTree.Item id={item.id} textValue={item.name} title={item.name}>
            {!!item.children && (
              <Collection items={item.children}>{renderItem}</Collection>
            )}
          </FileTree.Item>
        )
      }}
    </FileTree>
  )
}
