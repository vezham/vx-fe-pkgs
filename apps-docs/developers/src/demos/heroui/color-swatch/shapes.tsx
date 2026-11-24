// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { ColorSwatch } from '@vezham/react-v3'

export function ColorSwatchShapes() {
  return (
    <div className="flex items-center gap-3">
      <ColorSwatch color="#0485F7" shape="circle" />
      <ColorSwatch color="#0485F7" shape="square" />
    </div>
  )
}
