// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Resizable } from '@vezham/react-pro-v3/resizable'

export function Nested() {
  return (
    <div className="bg-background border-border h-[500px] w-full overflow-hidden rounded-xl border">
      <Resizable orientation="horizontal">
        <Resizable.Panel defaultSize={25} minSize={15}>
          <div className="bg-surface flex h-full items-center justify-center p-6">
            <span className="text-surface-foreground text-sm font-medium">
              Sidebar
            </span>
          </div>
        </Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel defaultSize={75}>
          <Resizable orientation="vertical">
            <Resizable.Panel defaultSize={65} minSize={20}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="text-foreground text-sm font-medium">
                  Editor
                </span>
              </div>
            </Resizable.Panel>
            <Resizable.Handle />
            <Resizable.Panel defaultSize={35} minSize={15}>
              <div className="bg-surface-secondary flex h-full items-center justify-center p-6">
                <span className="text-surface-secondary-foreground text-sm font-medium">
                  Terminal
                </span>
              </div>
            </Resizable.Panel>
          </Resizable>
        </Resizable.Panel>
      </Resizable>
    </div>
  )
}
