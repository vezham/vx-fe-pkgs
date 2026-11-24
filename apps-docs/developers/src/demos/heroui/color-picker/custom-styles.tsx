// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import {
  ColorArea,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  Label
} from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <ColorPicker defaultValue="#0485F7">
      <ColorPicker.Trigger className="bg-default-soft rounded-xl px-3 py-2">
        <ColorSwatch size="lg" />
        <Label className="text-foreground font-medium">Theme color</Label>
      </ColorPicker.Trigger>
      <ColorPicker.Popover className="bg-surface">
        <ColorArea
          aria-label="Color area"
          className="max-w-full"
          colorSpace="hsb"
          xChannel="saturation"
          yChannel="brightness">
          <ColorArea.Thumb />
        </ColorArea>
        <ColorSlider channel="hue" className="gap-1 px-1" colorSpace="hsb">
          <Label>Hue</Label>
          <ColorSlider.Output className="text-muted" />
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
      </ColorPicker.Popover>
    </ColorPicker>
  )
}
