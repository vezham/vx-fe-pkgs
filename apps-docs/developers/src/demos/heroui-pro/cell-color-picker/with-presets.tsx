// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { CellColorPicker } from '@vezham/react-pro-v3'
import {
  ColorArea,
  ColorField,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  Label,
  parseColor
} from '@vezham/react-v3'

const colorPresets = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#f43f5e'
]

export function WithPresets() {
  const [color, setColor] = useState(parseColor('#3B82F6'))

  return (
    <div className="w-[252px]">
      <CellColorPicker
        aria-label="Brand Color"
        value={color}
        onChange={setColor}>
        <CellColorPicker.Trigger>
          <CellColorPicker.Label>Brand Color</CellColorPicker.Label>
          <CellColorPicker.ValueDisplay />
          <CellColorPicker.Swatch />
        </CellColorPicker.Trigger>
        <CellColorPicker.Popover>
          <ColorSwatchPicker className="justify-center pt-2" size="xs">
            {colorPresets.map(preset => (
              <ColorSwatchPicker.Item key={preset} color={preset}>
                <ColorSwatchPicker.Swatch />
              </ColorSwatchPicker.Item>
            ))}
          </ColorSwatchPicker>
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
          <ColorField aria-label="Hex value">
            <ColorField.Group variant="secondary">
              <ColorField.Prefix>
                <ColorSwatch size="xs" />
              </ColorField.Prefix>
              <ColorField.Input />
            </ColorField.Group>
          </ColorField>
        </CellColorPicker.Popover>
      </CellColorPicker>
    </div>
  )
}
