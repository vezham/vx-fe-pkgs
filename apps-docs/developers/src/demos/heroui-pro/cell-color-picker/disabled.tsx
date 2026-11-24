// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CellColorPicker } from '@vezham/react-pro-v3'
import { ColorArea } from '@vezham/react-v3'

export function Disabled() {
  return (
    <div className="w-[252px]">
      <CellColorPicker aria-label="Accent" defaultValue="#3B82F6">
        <CellColorPicker.Trigger isDisabled>
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
        </CellColorPicker.Popover>
      </CellColorPicker>
    </div>
  )
}
