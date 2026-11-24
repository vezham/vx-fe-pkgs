// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Label, Slider } from '@vezham/react-v3'

export function Range() {
  return (
    <Slider
      className="w-full max-w-xs"
      defaultValue={[100, 500]}
      formatOptions={{ currency: 'USD', style: 'currency' }}
      maxValue={1000}
      minValue={0}
      step={50}>
      <Label>Price Range</Label>
      <Slider.Output />
      <Slider.Track>
        {({ state }) => (
          <>
            <Slider.Fill />
            {state.values.map((_, i) => (
              <Slider.Thumb key={i} index={i} />
            ))}
          </>
        )}
      </Slider.Track>
    </Slider>
  )
}
