// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Picture } from '@gravity-ui/icons'

import { DropZone } from '@vezham/react-pro-v3'

export function CustomIcon() {
  return (
    <DropZone className="w-[420px]">
      <DropZone.Area>
        <DropZone.Icon>
          <Picture />
        </DropZone.Icon>
        <DropZone.Label>Set your profile photo</DropZone.Label>
        <DropZone.Description>
          PNG or JPG under 2 MB. Best at 400 x 400 px.
        </DropZone.Description>
        <DropZone.Trigger>Pick Image</DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input accept="image/png,image/jpeg" />
    </DropZone>
  )
}
