// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { ColorArea } from '@vezham/react-v3'

export function RenderFunction() {
  return (
    <ColorArea
      defaultValue="rgb(116, 52, 255)"
      render={props => <div {...props} data-custom="slider" />}>
      <ColorArea.Thumb
        render={props => <div {...props} data-custom="thumb" />}
      />
    </ColorArea>
  )
}
