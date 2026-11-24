// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberValue } from '@vezham/react-pro-v3'

export function TabularNums() {
  return (
    <div className="flex flex-col items-end gap-1 rounded-2xl p-6">
      {[228441, 71887, 156540, 1234, 98234].map(v => (
        <NumberValue
          key={v}
          className="text-foreground text-xl font-semibold"
          currency="USD"
          style="currency"
          value={v}
        />
      ))}
    </div>
  )
}
