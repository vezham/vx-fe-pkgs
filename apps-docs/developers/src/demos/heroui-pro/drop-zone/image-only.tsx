// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Picture } from '@gravity-ui/icons'

import { DropZone } from '@vezham/react-pro-v3'

export function ImageOnly() {
  return (
    <DropZone className="w-[420px]">
      <DropZone.Area
        getDropOperation={types =>
          [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml'
          ].some(t => types.has(t))
            ? 'copy'
            : 'cancel'
        }>
        <DropZone.Icon>
          <Picture />
        </DropZone.Icon>
        <DropZone.Label>Drop your images here</DropZone.Label>
        <DropZone.Description>
          Accepts PNG, JPG, GIF, WebP, and SVG.
        </DropZone.Description>
        <DropZone.Trigger>Select Images</DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input accept="image/*" />
    </DropZone>
  )
}
