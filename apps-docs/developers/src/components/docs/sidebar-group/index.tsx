import type { ReactNode } from 'react'

import type { Folder } from '@vezham/docs-core/page-tree'
import { Disclosure } from '@vezham/react-v3'

export const SidebarGroup = ({
  item,
  children
}: {
  item: Folder
  children: ReactNode
}) => (
  <Disclosure
    defaultExpanded={item.defaultOpen ?? true}
    className="mt-6 first:mt-0 [&:not([data-expanded])+[data-slot=disclosure]]:mt-3">
    <Disclosure.Heading>
      <Disclosure.Trigger className="flex w-full items-center gap-2 px-2 text-start [&_svg]:size-4 [&_svg]:shrink-0">
        {item.icon}
        {item.name}
        {/* wjdlz/REF: for state icon - <Disclosure.Indicator /> */}
      </Disclosure.Trigger>
    </Disclosure.Heading>
    <Disclosure.Content>
      <div className="flex flex-col gap-0.5 pt-1.5">{children}</div>
    </Disclosure.Content>
  </Disclosure>
)
