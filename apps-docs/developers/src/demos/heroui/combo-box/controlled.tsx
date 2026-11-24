// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { useState } from 'react'

import type { Key } from '@vezham/react-v3'
import { ComboBox, Input, Label, ListBox } from '@vezham/react-v3'

export function Controlled() {
  const animals = [
    {
      id: 'cat',
      name: 'Cat'
    },
    {
      id: 'dog',
      name: 'Dog'
    },
    {
      id: 'bird',
      name: 'Bird'
    },
    {
      id: 'fish',
      name: 'Fish'
    },
    {
      id: 'hamster',
      name: 'Hamster'
    }
  ]

  const [selectedKey, setSelectedKey] = useState<Key | null>('cat')

  const selectedAnimal = animals.find(a => a.id === selectedKey)

  return (
    <div className="space-y-2">
      <ComboBox
        className="w-[256px]"
        selectedKey={selectedKey}
        onSelectionChange={key => setSelectedKey(key)}>
        <Label>Animal (controlled)</Label>
        <ComboBox.InputGroup>
          <Input placeholder="Search animals..." />
          <ComboBox.Trigger />
        </ComboBox.InputGroup>
        <ComboBox.Popover>
          <ListBox>
            {animals.map(animal => (
              <ListBox.Item
                key={animal.id}
                id={animal.id}
                textValue={animal.name}>
                {animal.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </ComboBox.Popover>
      </ComboBox>
      <p className="text-muted text-sm">
        Selected: {selectedAnimal?.name || 'None'}
      </p>
    </div>
  )
}
