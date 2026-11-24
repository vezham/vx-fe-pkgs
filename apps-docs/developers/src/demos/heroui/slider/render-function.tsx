// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Label, Slider } from '@vezham/react-v3'

export function RenderFunction() {
  return (
    <Slider
      className="w-full max-w-xs"
      defaultValue={30}
      render={props => <div {...props} data-custom="foo" />}>
      <Label>Volume</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  )
}
