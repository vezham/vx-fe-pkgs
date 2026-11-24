// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { useState } from 'react'

import type { Color } from '@vezham/react-v3'
import { ColorField, ColorSwatch, Label, parseColor } from '@vezham/react-v3'

export function Basic() {
  const [color, setColor] = useState<Color | null>(parseColor('#0485F7'))

  return (
    <ColorField
      className="w-[280px]"
      name="color"
      value={color}
      onChange={setColor}>
      <Label>Color</Label>
      <ColorField.Group>
        <ColorField.Prefix>
          <ColorSwatch color={color ?? undefined} size="xs" />
        </ColorField.Prefix>
        <ColorField.Input />
      </ColorField.Group>
    </ColorField>
  )
}
