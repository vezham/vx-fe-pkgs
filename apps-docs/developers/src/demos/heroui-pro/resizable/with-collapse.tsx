// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useRef, useState } from 'react'
import type { PanelImperativeHandle } from 'react-resizable-panels'

import { Resizable } from '@vezham/react-pro-v3/resizable'
import { Button } from '@vezham/react-v3'

export function WithCollapse() {
  const panelRef = useRef<PanelImperativeHandle>(null)
  const [isCollapsed, setCollapsed] = useState(false)

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            if (isCollapsed) panelRef.current?.expand()
            else panelRef.current?.collapse()
          }}>
          {isCollapsed ? 'Expand' : 'Collapse'} sidebar
        </Button>
      </div>
      <div className="bg-background border-border h-[400px] w-full overflow-hidden rounded-xl border">
        <Resizable orientation="horizontal">
          <Resizable.Panel
            collapsible
            collapsedSize={0}
            defaultSize={25}
            handleRef={panelRef}
            id="sidebar"
            minSize={15}
            onCollapse={() => setCollapsed(true)}
            onExpand={() => setCollapsed(false)}>
            <div className="bg-surface flex h-full items-center justify-center p-4">
              <span className="text-surface-foreground text-sm font-medium">
                Sidebar
              </span>
            </div>
          </Resizable.Panel>
          <Resizable.Handle />
          <Resizable.Panel defaultSize={75} id="main">
            <div className="flex h-full items-center justify-center p-4">
              <span className="text-foreground text-sm font-medium">
                Main content
              </span>
            </div>
          </Resizable.Panel>
        </Resizable>
      </div>
    </div>
  )
}
