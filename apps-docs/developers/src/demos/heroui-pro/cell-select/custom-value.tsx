// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { FaceSmile, Globe, Palette } from '@gravity-ui/icons'
import { useState } from 'react'

import { CellSelect } from '@vezham/react-pro-v3'
import type { Key } from '@vezham/react-v3'
import { ListBox } from '@vezham/react-v3'

const iconSets = [
  { icon: <FaceSmile />, id: 'gravity', name: 'Gravity' },
  { icon: <Palette />, id: 'heroicons', name: 'Heroicons' },
  { icon: <Globe />, id: 'lucide', name: 'Lucide' }
]

export function CustomValue() {
  const [iconSet, setIconSet] = useState<Key | null>('gravity')

  return (
    <div className="w-[252px]">
      <CellSelect
        aria-label="Icon set"
        value={iconSet}
        onChange={v => setIconSet(v)}>
        <CellSelect.Trigger>
          <CellSelect.Label>Icons</CellSelect.Label>
          <CellSelect.Value>
            {({ defaultChildren, isPlaceholder, state }: any) => {
              if (isPlaceholder || state.selectedItems.length === 0) {
                return defaultChildren
              }

              const selected = iconSets.find(
                s => s.id === state.selectedItems[0]?.key
              )

              if (!selected) return defaultChildren

              return (
                <span className="flex items-center justify-end gap-1.5 text-end">
                  {selected.name}
                  <span className="text-muted">{selected.icon}</span>
                </span>
              )
            }}
          </CellSelect.Value>
        </CellSelect.Trigger>
        <CellSelect.Popover>
          <ListBox>
            {iconSets.map(set => (
              <ListBox.Item key={set.id} id={set.id} textValue={set.name}>
                {set.icon}
                {set.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </CellSelect.Popover>
      </CellSelect>
    </div>
  )
}
