// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import type { ComponentProps } from 'react'

import { Tabs } from '@vezham/react-v3'

const Link = (props: ComponentProps<'a'>) => <a {...props} />

export function RenderFunction() {
  return (
    <Tabs
      className="w-full max-w-md"
      render={props => <div {...props} data-custom="foo" />}>
      <Tabs.ListContainer>
        <Tabs.List aria-label="Options">
          <Tabs.Tab
            href="/docs/ui/react-v3/web/getting-started"
            id="getting-started"
            render={(domProps: any) => <Link {...domProps} />}>
            Getting Started
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab
            href="/docs/ui/react-v3/web/components"
            id="components"
            render={(domProps: any) => <Link {...domProps} />}>
            Components
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab
            href="/docs/ui/react-v3/web/releases"
            id="releases"
            render={(domProps: any) => <Link {...domProps} />}>
            Releases
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel className="pt-4" id="overview">
        <p>View your project overview and recent activity.</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="analytics">
        <p>Track your metrics and analyze performance data.</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="reports">
        <p>Generate and download detailed reports.</p>
      </Tabs.Panel>
    </Tabs>
  )
}
