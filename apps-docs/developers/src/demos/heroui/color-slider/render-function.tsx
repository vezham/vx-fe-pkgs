// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { ColorSlider, Label } from '@vezham/react-v3'

export function RenderFunction() {
  return (
    <ColorSlider
      channel="hue"
      className="w-full max-w-xs"
      defaultValue="hsl(0, 100%, 50%)"
      render={props => <div {...props} data-custom="foo" />}>
      <Label>Hue</Label>
      <ColorSlider.Output />
      <ColorSlider.Track>
        <ColorSlider.Thumb />
      </ColorSlider.Track>
    </ColorSlider>
  )
}
