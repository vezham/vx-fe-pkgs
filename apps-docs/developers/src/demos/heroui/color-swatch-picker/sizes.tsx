// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { ColorSwatchPicker } from '@vezham/react-v3'

const colors = [
  '#F43F5E',
  '#D946EF',
  '#8B5CF6',
  '#3B82F6',
  '#06B6D4',
  '#10B981',
  '#84CC16'
]

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export function Sizes() {
  return (
    <div className="flex flex-col gap-6">
      {sizes.map(size => (
        <div key={size} className="flex items-center gap-4">
          <span className="text-muted w-8 text-sm">{size}</span>
          <ColorSwatchPicker size={size}>
            {colors.map(color => (
              <ColorSwatchPicker.Item key={color} color={color}>
                <ColorSwatchPicker.Swatch />
                <ColorSwatchPicker.Indicator />
              </ColorSwatchPicker.Item>
            ))}
          </ColorSwatchPicker>
        </div>
      ))}
    </div>
  )
}
