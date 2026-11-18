import type { ReactNode } from 'react'

import type { Folder } from '@vezham/docs-core/page-tree'
import { Disclosure } from '@vezham/react-v3'

import { createSidebarGroups, filterSidebarTree } from './tree'

export type SidebarGroupProps = {
  item: Folder
  children: ReactNode
}

const SidebarGroupRoot = ({ item, children }: SidebarGroupProps) => (
  <Disclosure
    defaultExpanded={item.defaultOpen ?? true}
    className="mt-6 first:mt-0 [&:not([data-expanded])+[data-slot=disclosure]]:mt-3">
    <Disclosure.Heading>
      <Disclosure.Trigger className="flex w-full items-center gap-2 px-2 text-start [&_svg]:size-4 [&_svg]:shrink-0">
        {item.icon}
        {item.name}
      </Disclosure.Trigger>
    </Disclosure.Heading>
    <Disclosure.Content>
      <div className="flex flex-col gap-0.5 pt-1.5">{children}</div>
    </Disclosure.Content>
  </Disclosure>
)

export const SidebarGroup = Object.assign(SidebarGroupRoot, {
  filterTree: filterSidebarTree,
  createGroups: createSidebarGroups
})

export type { SidebarGroupTreeOptions } from './tree'
