// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { ComboBox, Input, Label, ListBox } from '@vezham/react-v3'

const animals = [
  { id: 'aardvark', name: 'Aardvark' },
  { id: 'cat', name: 'Cat' },
  { id: 'dog', name: 'Dog' },
  { id: 'kangaroo', name: 'Kangaroo' },
  { id: 'panda', name: 'Panda' },
  { id: 'snake', name: 'Snake' }
]

export function ReadOnly() {
  return (
    <ComboBox isReadOnly className="w-[256px]" defaultSelectedKey="cat">
      <Label>Favorite Animal</Label>
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
  )
}
