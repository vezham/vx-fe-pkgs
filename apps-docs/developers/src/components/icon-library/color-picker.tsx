import {
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  Label
} from '@vezham/react-v3'

export const AssetColorPicker = ({
  label,
  value,
  onChange
}: {
  label: string
  value: string
  onChange: (color: string) => void
}) => (
  <ColorPicker
    className="flex"
    value={value}
    onChange={color => onChange(color.toString('hex'))}>
    <ColorPicker.Trigger aria-label={label}>
      <ColorSwatch />
      <Label>{label}</Label>
      <span className="text-muted text-sm">{value}</span>
    </ColorPicker.Trigger>
    <ColorPicker.Popover>
      <ColorArea
        aria-label={`${label} saturation and brightness`}
        className="max-w-full"
        colorSpace="hsb"
        xChannel="saturation"
        yChannel="brightness">
        <ColorArea.Thumb />
      </ColorArea>
      <ColorSlider channel="hue" colorSpace="hsb">
        <Label>Hue</Label>
        <ColorSlider.Output />
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
      <ColorField aria-label={`${label} hex`}>
        <ColorField.Group variant="secondary">
          <ColorField.Prefix>
            <ColorSwatch size="xs" />
          </ColorField.Prefix>
          <ColorField.Input />
        </ColorField.Group>
      </ColorField>
    </ColorPicker.Popover>
  </ColorPicker>
)
