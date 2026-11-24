// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberValue } from '@vezham/react-pro-v3'

export function Compact() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-6">
      {(
        [
          { label: '1,234', value: 1234 },
          { label: '45,678', value: 45678 },
          { label: '1,234,567', value: 1234567 },
          { label: '9,876,543,210', value: 9876543210 }
        ] as const
      ).map(item => (
        <div key={item.value} className="flex items-baseline gap-4">
          <span className="text-muted w-20 text-xs">{item.label}</span>
          <NumberValue
            className="text-foreground text-2xl font-semibold"
            notation="compact"
            value={item.value}
          />
        </div>
      ))}
    </div>
  )
}
