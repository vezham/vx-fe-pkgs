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

function FileList({
  label,
  selectionMode
}: {
  label: string
  selectionMode: 'none' | 'single' | 'multiple'
}) {
  const [selected, setSelected] = useState<Selection>(new Set())

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        {selectionMode !== 'none' && (
          <span className="text-muted text-xs">
            {selected === 'all'
              ? 'All selected'
              : (selected as Set<string>).size > 0
                ? `${(selected as Set<string>).size} selected`
                : 'None selected'}
          </span>
        )}
      </div>
      <ListView
        aria-label={label}
        items={files}
        selectedKeys={selected}
        selectionMode={selectionMode}
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

export function SelectionModes() {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-8 sm:flex-row">
      <div className="flex-1">
        <FileList label="None" selectionMode="none" />
      </div>
      <div className="flex-1">
        <FileList label="Single" selectionMode="single" />
      </div>
      <div className="flex-1">
        <FileList label="Multiple" selectionMode="multiple" />
      </div>
    </div>
  )
}
