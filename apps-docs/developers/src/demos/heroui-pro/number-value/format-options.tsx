// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberValue } from '@vezham/react-pro-v3'

export function FormatOptions() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-6">
      <div className="flex items-baseline gap-4">
        <span className="text-muted w-32 text-xs">Compact currency</span>
        <NumberValue
          className="text-foreground text-2xl font-semibold"
          value={1234567}
          formatOptions={{
            currency: 'USD',
            maximumFractionDigits: 1,
            notation: 'compact',
            style: 'currency'
          }}
        />
      </div>
      <div className="flex items-baseline gap-4">
        <span className="text-muted w-32 text-xs">Accounting</span>
        <NumberValue
          className="text-foreground text-2xl font-semibold"
          value={-1234.56}
          formatOptions={{
            currency: 'USD',
            currencySign: 'accounting',
            style: 'currency'
          }}
        />
      </div>
    </div>
  )
}
