// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Label, Slider } from '@vezham/react-v3'

export function CustomOutput() {
  return (
    <Slider className="w-full max-w-xs" defaultValue={[25, 75]}>
      <Label>Range</Label>
      <Slider.Output>
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')
        }
      </Slider.Output>
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
