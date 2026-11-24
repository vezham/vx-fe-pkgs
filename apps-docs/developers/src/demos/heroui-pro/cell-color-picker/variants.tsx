// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CellColorPicker } from '@vezham/react-pro-v3'
import { ColorArea, ColorSlider, Label } from '@vezham/react-v3'

export function Variants() {
  const variants = ['default', 'secondary'] as const

  return (
    <div className="flex w-[252px] flex-col gap-3">
      {variants.map(variant => (
        <div key={variant} className="flex flex-col gap-1">
          <span className="text-muted text-xs">{variant}</span>
          <CellColorPicker
            aria-label="Accent"
            defaultValue="#3B82F6"
            variant={variant}>
            <CellColorPicker.Trigger>
              <CellColorPicker.Label>Accent</CellColorPicker.Label>
              <CellColorPicker.ValueDisplay />
              <CellColorPicker.Swatch />
            </CellColorPicker.Trigger>
            <CellColorPicker.Popover>
              <ColorArea
                aria-label="Color area"
                className="max-w-full"
                colorSpace="hsb"
                xChannel="saturation"
                yChannel="brightness">
                <ColorArea.Thumb />
              </ColorArea>
              <ColorSlider
                aria-label="Hue"
                channel="hue"
                className="gap-1 px-1"
                colorSpace="hsb">
                <Label>Hue</Label>
                <ColorSlider.Output className="text-muted" />
                <ColorSlider.Track>
                  <ColorSlider.Thumb />
                </ColorSlider.Track>
              </ColorSlider>
            </CellColorPicker.Popover>
          </CellColorPicker>
        </div>
      ))}
    </div>
  )
}
