// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Breadcrumbs } from '@vezham/react-v3'

export function RenderFunction() {
  return (
    <Breadcrumbs render={props => <ol {...props} data-custom="foo" />}>
      <Breadcrumbs.Item
        render={props => <li {...(props as any)} data-custom="bar" />}>
        Home
      </Breadcrumbs.Item>
      <Breadcrumbs.Item
        render={props => <li {...(props as any)} data-custom="bar" />}>
        Products
      </Breadcrumbs.Item>
      <Breadcrumbs.Item
        render={props => <li {...(props as any)} data-custom="bar" />}>
        Electronics
      </Breadcrumbs.Item>
      <Breadcrumbs.Item
        render={props => <li {...(props as any)} data-custom="bar" />}>
        Laptop
      </Breadcrumbs.Item>
    </Breadcrumbs>
  )
}
