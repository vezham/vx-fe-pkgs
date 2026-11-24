// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Globe } from '@gravity-ui/icons'
import { useState } from 'react'

import { InlineSelect, ItemCard } from '@vezham/react-pro-v3'
import type { Key } from '@vezham/react-v3'
import { ListBox } from '@vezham/react-v3'

export function WithSelect() {
  const [lang, setLang] = useState<Key | null>('en')

  return (
    <div className="w-[500px] rounded-2xl p-6">
      <ItemCard>
        <ItemCard.Icon>
          <Globe />
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>Language</ItemCard.Title>
          <ItemCard.Description>
            Choose your preferred language
          </ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <InlineSelect
            aria-label="Language"
            value={lang}
            onChange={value => setLang(value)}>
            <InlineSelect.Trigger>
              <InlineSelect.Value />
              <InlineSelect.Indicator />
            </InlineSelect.Trigger>
            <InlineSelect.Popover>
              <ListBox>
                <ListBox.Item id="en" textValue="English">
                  English
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="es" textValue="Spanish">
                  Spanish
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="fr" textValue="French">
                  French
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="ja" textValue="Japanese">
                  Japanese
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </InlineSelect.Popover>
          </InlineSelect>
        </ItemCard.Action>
      </ItemCard>
    </div>
  )
}
