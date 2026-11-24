// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { CircleDashed } from '@gravity-ui/icons'
import React from 'react'

import { Chip, Separator } from '@vezham/react-v3'

export function ChipVariants() {
  const sizes = ['lg', 'md', 'sm'] as const
  const variants = ['primary', 'secondary', 'tertiary', 'soft'] as const
  const colors = ['accent', 'default', 'success', 'warning', 'danger'] as const

  return (
    <div className="flex flex-col gap-8 overflow-x-auto">
      {sizes.map((size, index) => (
        <React.Fragment key={size}>
          <div className="flex flex-col gap-4">
            <h3 className="text-muted text-sm font-semibold capitalize">
              {size}
            </h3>
            {/* Color labels header */}
            <div className="flex items-center gap-3">
              <div className="w-24 shrink-0" />
              {colors.map(color => (
                <div
                  key={color}
                  className="flex shrink-0 items-center justify-center"
                  style={{ width: '130px' }}>
                  <span className="text-muted text-xs capitalize">{color}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {variants.map(variant => (
                <div key={variant} className="flex items-center gap-3">
                  <div className="text-muted w-24 shrink-0 text-sm capitalize">
                    {variant}
                  </div>
                  {colors.map(color => (
                    <div
                      key={color}
                      className="flex shrink-0 items-center justify-center"
                      style={{ width: '130px' }}>
                      <Chip color={color} size={size} variant={variant}>
                        <CircleDashed />
                        <Chip.Label>Label</Chip.Label>
                        <CircleDashed />
                      </Chip>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {index < sizes.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  )
}
