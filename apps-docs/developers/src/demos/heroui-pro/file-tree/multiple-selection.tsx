// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { FileTree } from '@vezham/react-pro-v3'
import type { Selection } from '@vezham/react-v3'

export function MultipleSelection() {
  const [selected, setSelected] = useState<Selection>(new Set())

  return (
    <div className="flex flex-col items-center gap-4">
      <FileTree
        aria-label="Selectable file tree"
        className="w-[280px]"
        defaultExpandedKeys={['src', 'components']}
        selectedKeys={selected}
        selectionMode="multiple"
        onSelectionChange={setSelected}>
        <FileTree.Item id="src" textValue="src" title="src">
          <FileTree.Item
            id="components"
            textValue="components"
            title="components">
            <FileTree.Item
              id="button"
              textValue="button.tsx"
              title="button.tsx"
            />
            <FileTree.Item id="card" textValue="card.tsx" title="card.tsx" />
            <FileTree.Item id="modal" textValue="modal.tsx" title="modal.tsx" />
          </FileTree.Item>
          <FileTree.Item id="utils" textValue="utils" title="utils">
            <FileTree.Item
              id="helpers"
              textValue="helpers.ts"
              title="helpers.ts"
            />
          </FileTree.Item>
        </FileTree.Item>
        <FileTree.Item id="readme" textValue="README.md" title="README.md" />
      </FileTree>
      <p className="text-muted text-sm">
        Selected:{' '}
        {selected === 'all' ? 'all' : [...selected].join(', ') || 'none'}
      </p>
    </div>
  )
}
