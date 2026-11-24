// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Resizable } from '@vezham/react-pro-v3/resizable'

export function Vertical() {
  return (
    <div className="bg-background border-border h-[400px] w-full overflow-hidden rounded-xl border">
      <Resizable orientation="vertical">
        <Resizable.Panel defaultSize={60} minSize={20}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="text-foreground text-sm font-medium">Top</span>
          </div>
        </Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel defaultSize={40} minSize={20}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="text-sm font-medium">Bottom</span>
          </div>
        </Resizable.Panel>
      </Resizable>
    </div>
  )
}
