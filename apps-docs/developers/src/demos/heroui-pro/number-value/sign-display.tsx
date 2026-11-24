// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberValue } from '@vezham/react-pro-v3'

export function SignDisplay() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-6">
      {(['auto', 'always', 'exceptZero', 'never'] as const).map(sign => (
        <div key={sign} className="flex items-baseline gap-4">
          <span className="text-muted w-24 text-xs">{sign}</span>
          <div className="flex gap-4">
            <NumberValue
              className="text-foreground font-semibold"
              signDisplay={sign}
              value={42}
            />
            <NumberValue
              className="text-foreground font-semibold"
              signDisplay={sign}
              value={0}
            />
            <NumberValue
              className="text-foreground font-semibold"
              signDisplay={sign}
              value={-42}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
