// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ItemCard } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

export function WithoutIcon() {
  return (
    <div className="w-[500px] rounded-2xl p-6">
      <ItemCard>
        <ItemCard.Content>
          <ItemCard.Title>Delete account</ItemCard.Title>
          <ItemCard.Description>
            Permanently remove your account and all data
          </ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <Button size="sm" variant="danger-soft">
            Delete
          </Button>
        </ItemCard.Action>
      </ItemCard>
    </div>
  )
}
