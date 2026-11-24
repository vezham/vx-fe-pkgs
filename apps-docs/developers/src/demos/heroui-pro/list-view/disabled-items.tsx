// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { File, Folder, Lock } from '@gravity-ui/icons'

import { ListView } from '@vezham/react-pro-v3'

const files = [
  { icon: 'folder', id: '1', name: 'Documents' },
  { icon: 'file', id: '2', name: 'Budget.xlsx' },
  { icon: 'file', id: '3', locked: true, name: 'Archived.zip' },
  { icon: 'folder', id: '4', name: 'Photos' },
  { icon: 'file', id: '5', locked: true, name: 'Old backup.tar' },
  { icon: 'file', id: '6', name: 'README.md' }
]

export function DisabledItems() {
  return (
    <div className="w-full max-w-md">
      <ListView
        aria-label="Files"
        disabledKeys={files.filter(f => f.locked).map(f => f.id)}
        items={files}
        selectionMode="multiple">
        {file => (
          <ListView.Item id={file.id} textValue={file.name}>
            <ListView.ItemContent>
              {file.icon === 'folder' ? <Folder /> : <File />}
              <div className="flex min-w-0 flex-col">
                <ListView.Title>{file.name}</ListView.Title>
              </div>
            </ListView.ItemContent>
            {!!file.locked && (
              <ListView.ItemAction>
                <Lock className="text-muted size-3.5" />
              </ListView.ItemAction>
            )}
          </ListView.Item>
        )}
      </ListView>
    </div>
  )
}
