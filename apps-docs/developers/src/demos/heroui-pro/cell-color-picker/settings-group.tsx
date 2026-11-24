// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'
import type { Color } from 'react-aria-components/ColorArea'

import { CellColorPicker } from '@vezham/react-pro-v3'
import { ColorArea, ColorSlider, Label, parseColor } from '@vezham/react-v3'

export function SettingsGroup() {
  const [accent, setAccent] = useState<Color>(parseColor('#3B82F6'))
  const [success, setSuccess] = useState<Color>(parseColor('#22C55E'))
  const [danger, setDanger] = useState<Color>(parseColor('#EF4444'))

  const colors = [
    { color: accent, label: 'Accent', setColor: setAccent },
    { color: success, label: 'Success', setColor: setSuccess },
    { color: danger, label: 'Danger', setColor: setDanger }
  ] as const

  return (
    <div className="flex w-[252px] flex-col gap-2">
      {colors.map(({ color, label, setColor }) => (
        <CellColorPicker
          key={label}
          aria-label={label}
          value={color}
          onChange={setColor}>
          <CellColorPicker.Trigger>
            <CellColorPicker.Label>{label}</CellColorPicker.Label>
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
      ))}
    </div>
  )
}
