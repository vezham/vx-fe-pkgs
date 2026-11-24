// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { ColorSwatch } from '@vezham/react-v3'

export function ColorSwatchCustomStyles() {
  const colors = ['#0485F7', '#EF4444', '#F59E0B', '#10B981', '#D946EF']

  return (
    <div className="flex flex-col gap-8">
      {/* Glow effect */}
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Glow Effect</span>
        <div className="flex items-center gap-4">
          {colors.map(color => (
            <ColorSwatch
              key={color}
              color={color}
              size="xl"
              style={() => ({
                boxShadow: `0 0 20px 2px ${color}`
              })}
            />
          ))}
        </div>
      </div>

      {/* Gradient swatch */}
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Gradient</span>
        <div className="flex items-center gap-4">
          {colors.map(color => (
            <ColorSwatch
              key={color}
              color={color}
              size="xl"
              style={({ color: c }) => ({
                background: `linear-gradient(135deg, ${c.toString('css')}, white)`
              })}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
