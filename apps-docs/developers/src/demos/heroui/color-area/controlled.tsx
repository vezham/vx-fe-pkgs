// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { useState } from 'react'

import type { Color } from '@vezham/react-v3'
import { ColorArea, ColorSwatch, parseColor } from '@vezham/react-v3'

export function ColorAreaControlled() {
  const [color, setColor] = useState<Color>(parseColor('#9B80FF'))

  return (
    <div className="flex flex-col gap-4">
      <ColorArea
        colorSpace="rgb"
        value={color}
        xChannel="red"
        yChannel="green"
        onChange={setColor}>
        <ColorArea.Thumb />
      </ColorArea>
      <div className="flex w-[300px] items-center gap-3">
        <ColorSwatch color={color} size="md" />
        <p className="text-muted text-sm">
          Current color:{' '}
          <span className="font-medium">
            {color ? color.toString('hex') : '(empty)'}
          </span>
        </p>
      </div>
    </div>
  )
}
