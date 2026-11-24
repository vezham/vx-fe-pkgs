// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { useState } from 'react'

import { Label, Slider } from '@vezham/react-v3'

export function Controlled() {
  const [value, setValue] = useState(25)

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Slider
        value={value}
        onChange={nextValue => {
          if (typeof nextValue === 'number') {
            setValue(nextValue)
          }
        }}>
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
      <p className="text-muted text-sm">Current value: {value}</p>
    </div>
  )
}
