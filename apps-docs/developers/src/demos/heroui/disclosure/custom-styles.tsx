// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { ShoppingBag } from '@gravity-ui/icons'
import { useState } from 'react'

import { Button, Disclosure } from '@vezham/react-v3'

export function CustomStyles() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="w-full max-w-sm">
      <Disclosure isExpanded={isExpanded} onExpandedChange={setIsExpanded}>
        <Disclosure.Heading>
          <Button
            className="border-border/70 text-foreground hover:bg-muted/30 w-full justify-between rounded-xl border bg-linear-to-b from-neutral-50/90 to-white px-4 py-3 font-medium shadow-sm ring-1 ring-black/5 dark:from-neutral-900/80 dark:to-neutral-900 dark:ring-white/10"
            slot="trigger"
            variant="ghost">
            <span className="flex items-center gap-2">
              <ShoppingBag className="text-muted size-4" />
              Shipping details
            </span>
            <Disclosure.Indicator className="text-muted" />
          </Button>
        </Disclosure.Heading>
        <Disclosure.Content>
          <Disclosure.Body className="border-border/70 bg-surface/50 text-muted mt-2 rounded-xl border p-4 text-sm leading-relaxed dark:bg-neutral-900/50">
            Orders ship within 2 business days. Standard delivery takes 3–5
            days; express is available at checkout.
          </Disclosure.Body>
        </Disclosure.Content>
      </Disclosure>
    </div>
  )
}
