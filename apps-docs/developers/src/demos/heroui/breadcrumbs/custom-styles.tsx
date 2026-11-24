// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Breadcrumbs } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <Breadcrumbs className="bg-default-soft rounded-lg px-3 py-2">
      <Breadcrumbs.Item className="text-muted hover:text-accent" href="#">
        Home
      </Breadcrumbs.Item>
      <Breadcrumbs.Item className="text-muted hover:text-accent" href="#">
        Products
      </Breadcrumbs.Item>
      <Breadcrumbs.Item className="text-foreground font-medium">
        Laptop
      </Breadcrumbs.Item>
    </Breadcrumbs>
  )
}
