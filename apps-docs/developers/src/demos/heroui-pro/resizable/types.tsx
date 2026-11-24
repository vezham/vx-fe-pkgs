// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Resizable } from '@vezham/react-pro-v3/resizable'

const types: Array<'line' | 'drag' | 'pill' | 'handle'> = [
  'line',
  'drag',
  'pill',
  'handle'
]

export function Types() {
  return (
    <div className="flex w-full flex-col gap-6">
      {types.map(type => (
        <div key={type} className="flex flex-col gap-2">
          <span className="text-muted text-xs font-medium tracking-wide uppercase">
            {type}
          </span>
          <div className="bg-background border-border h-[200px] w-full overflow-hidden rounded-xl border">
            <Resizable>
              <Resizable.Panel defaultSize={50} minSize={20}>
                <div className="bg-surface flex h-full items-center justify-center p-4">
                  <span className="text-surface-foreground text-sm font-medium">
                    Left
                  </span>
                </div>
              </Resizable.Panel>
              <Resizable.Handle type={type} />
              <Resizable.Panel defaultSize={50} minSize={20}>
                <div className="flex h-full items-center justify-center p-4">
                  <span className="text-foreground text-sm font-medium">
                    Right
                  </span>
                </div>
              </Resizable.Panel>
            </Resizable>
          </div>
        </div>
      ))}
    </div>
  )
}
