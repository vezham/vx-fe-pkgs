// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { File, Folder } from '@gravity-ui/icons'
import { useState } from 'react'
import type { Selection } from 'react-aria-components/GridList'

import { ListView } from '@vezham/react-pro-v3'

const files = [
  { icon: 'folder', id: '1', name: 'Documents', updated: '2 days ago' },
  { icon: 'folder', id: '2', name: 'Photos', updated: '1 week ago' },
  { icon: 'file', id: '3', name: 'README.md', updated: '3 hours ago' },
  { icon: 'file', id: '4', name: 'package.json', updated: 'Yesterday' },
  { icon: 'folder', id: '5', name: 'src', updated: 'Just now' }
]

export function Secondary() {
  const [selected, setSelected] = useState<Selection>(new Set())

  return (
    <div className="w-full max-w-md">
      <ListView
        aria-label="Files"
        items={files}
        selectedKeys={selected}
        selectionMode="multiple"
        variant="secondary"
        onSelectionChange={setSelected}>
        {file => (
          <ListView.Item id={file.id} textValue={file.name}>
            <ListView.ItemContent>
              {file.icon === 'folder' ? <Folder /> : <File />}
              <div className="flex min-w-0 flex-col">
                <ListView.Title>{file.name}</ListView.Title>
                <ListView.Description>
                  Updated {file.updated}
                </ListView.Description>
              </div>
            </ListView.ItemContent>
          </ListView.Item>
        )}
      </ListView>
    </div>
  )
}
