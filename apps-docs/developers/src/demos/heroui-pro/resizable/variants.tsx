// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Resizable } from '@vezham/react-pro-v3/resizable'

type Variant = 'primary' | 'secondary' | 'tertiary'

const variants: Array<{
  bg: string
  fg: string
  label: string
  variant: Variant
}> = [
  {
    bg: 'bg-background',
    fg: 'text-foreground',
    label: 'primary — background',
    variant: 'primary'
  },
  {
    bg: 'bg-surface',
    fg: 'text-surface-foreground',
    label: 'secondary — surface',
    variant: 'secondary'
  },
  {
    bg: 'bg-surface-secondary',
    fg: 'text-surface-secondary-foreground',
    label: 'tertiary — surface secondary',
    variant: 'tertiary'
  }
]

export function Variants() {
  return (
    <div className="flex w-full flex-col gap-6">
      {variants.map(({ bg, fg, label, variant }) => (
        <div key={variant} className="flex flex-col gap-2">
          <span className="text-muted text-xs font-medium tracking-wide uppercase">
            {label}
          </span>
          <div
            className={`${bg} border-border h-[180px] w-full overflow-hidden rounded-xl border`}>
            <Resizable>
              <Resizable.Panel defaultSize={50}>
                <div
                  className={`flex h-full items-center justify-center p-4 ${fg}`}>
                  <span className="text-sm font-medium">Left</span>
                </div>
              </Resizable.Panel>
              <Resizable.Handle variant={variant} />
              <Resizable.Panel defaultSize={50}>
                <div
                  className={`flex h-full items-center justify-center p-4 ${fg}`}>
                  <span className="text-sm font-medium">Right</span>
                </div>
              </Resizable.Panel>
            </Resizable>
          </div>
        </div>
      ))}
    </div>
  )
}
