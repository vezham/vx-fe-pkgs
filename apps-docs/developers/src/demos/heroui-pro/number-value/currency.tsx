// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberValue } from '@vezham/react-pro-v3'

export function Currency() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-6">
      <div className="flex items-baseline gap-4">
        <span className="text-muted w-12 text-xs">USD</span>
        <NumberValue
          className="text-foreground text-2xl font-semibold"
          currency="USD"
          style="currency"
          value={228441}
        />
      </div>
      <div className="flex items-baseline gap-4">
        <span className="text-muted w-12 text-xs">EUR</span>
        <NumberValue
          className="text-foreground text-2xl font-semibold"
          currency="EUR"
          style="currency"
          value={228441}
        />
      </div>
      <div className="flex items-baseline gap-4">
        <span className="text-muted w-12 text-xs">JPY</span>
        <NumberValue
          className="text-foreground text-2xl font-semibold"
          currency="JPY"
          maximumFractionDigits={0}
          style="currency"
          value={228441}
        />
      </div>
      <div className="flex items-baseline gap-4">
        <span className="text-muted w-12 text-xs">GBP</span>
        <NumberValue
          className="text-foreground text-2xl font-semibold"
          currency="GBP"
          style="currency"
          value={228441}
        />
      </div>
    </div>
  )
}
