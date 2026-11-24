// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { useMemo, useState } from 'react'

import type { Key } from '@vezham/react-v3'
import {
  Description,
  ErrorMessage,
  Label,
  Tag,
  TagGroup
} from '@vezham/react-v3'

export function ErrorMessageBasic() {
  const [selected, setSelected] = useState<Iterable<Key>>(new Set())
  const isInvalid = useMemo(() => Array.from(selected).length === 0, [selected])

  return (
    <TagGroup
      selectedKeys={selected}
      selectionMode="multiple"
      onSelectionChange={keys => setSelected(keys)}>
      <Label>Required Categories</Label>
      <TagGroup.List>
        <Tag id="news">News</Tag>
        <Tag id="travel">Travel</Tag>
        <Tag id="gaming">Gaming</Tag>
        <Tag id="shopping">Shopping</Tag>
      </TagGroup.List>
      <Description>Select at least one category</Description>
      <ErrorMessage>
        {!!isInvalid && <>Please select at least one category</>}
      </ErrorMessage>
    </TagGroup>
  )
}
