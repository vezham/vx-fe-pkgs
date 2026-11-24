// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { ColorSlider, Label } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <ColorSlider
      channel="hue"
      className="w-full max-w-sm"
      defaultValue="hsl(220, 70%, 50%)">
      <Label className="text-foreground font-medium">Hue</Label>
      <ColorSlider.Output className="text-muted tabular-nums" />
      <ColorSlider.Track className="ring-border h-4! rounded-none! ring-1 [&::after]:rounded-r-sm! [&::before]:rounded-l-sm!">
        <ColorSlider.Thumb className="border-background size-4 rounded-sm! border-2 shadow-md ring-1 ring-black/10 dark:ring-white/20" />
      </ColorSlider.Track>
    </ColorSlider>
  )
}
