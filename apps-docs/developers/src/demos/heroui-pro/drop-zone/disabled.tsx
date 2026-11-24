// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { DropZone } from '@vezham/react-pro-v3'

export function Disabled() {
  return (
    <DropZone className="w-[420px]">
      <DropZone.Area isDisabled>
        <DropZone.Icon />
        <DropZone.Label>File upload unavailable</DropZone.Label>
        <DropZone.Description>
          Uploads are temporarily disabled.
        </DropZone.Description>
        <DropZone.Trigger isDisabled>Select File</DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input />
    </DropZone>
  )
}
