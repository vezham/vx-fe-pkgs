// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Resizable } from '@vezham/react-pro-v3/resizable'

export function Default() {
  return (
    <div className="bg-background border-border h-[400px] w-full overflow-hidden rounded-xl border">
      <Resizable orientation="horizontal">
        <Resizable.Panel
          defaultSize="180px"
          groupResizeBehavior="preserve-pixel-size"
          maxSize="260px"
          minSize="140px">
          <div className="flex h-full items-center justify-center p-6">
            <span className="text-sm font-medium">Sidebar</span>
          </div>
        </Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel minSize={30}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="text-foreground text-sm font-medium">
              Main content
            </span>
          </div>
        </Resizable.Panel>
      </Resizable>
    </div>
  )
}
