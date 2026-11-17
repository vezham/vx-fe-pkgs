import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { useNotebookLayout } from '@vezham/docs-react/layouts/notebook'
import { Sidebar } from '@vezham/icons-react'

import { Brand } from '@components/brand'
import { ControlCenter } from '@components/docs/control-center'
import { UserControls } from '@components/docs/user-controls'
import type { Locale } from '@generated/vx'

type Props = ComponentPropsWithoutRef<'header'> & {
  locale: Locale
  leading?: ReactNode
  controls?: ReactNode
}

export const NotebookHeader = ({
  locale,
  leading,
  controls,
  children,
  ...props
}: Props) => {
  const { navItems, slots } = useNotebookLayout()
  const searchTrigger =
    slots.searchTrigger === false ? undefined : slots.searchTrigger
  const FullSearchTrigger = searchTrigger?.full
  const SmallSearchTrigger = searchTrigger?.sm
  const SidebarTrigger = slots.sidebar.trigger

  return (
    <header
      {...props}
      id="nd-subnav"
      className={`layout:[--fd-header-height:--spacing(14)] lg:layout:[--fd-header-height:--spacing(24)] sticky top-(--fd-docs-row-1) z-10 flex flex-col backdrop-blur-sm transition-colors [grid-area:header] ${props.className ?? ''}`}>
      <div data-header-body="" className="flex h-14 gap-2 px-4 md:px-6">
        <div className="flex flex-1 items-center gap-2">
          <Brand.Link locale={locale} />
          {leading}
        </div>
        {FullSearchTrigger && (
          <FullSearchTrigger
            hideIfDisabled
            className="my-auto w-full max-w-sm rounded-xl ps-2.5 max-md:hidden"
          />
        )}
        <div className="flex flex-1 items-center justify-end md:gap-2">
          <div className="flex items-center gap-6 max-lg:hidden">
            {navItems.map(item => {
              if (item.type === 'custom') return item.children
              if (item.type !== 'main' && item.type !== 'button') return null
              return (
                <a
                  key={item.url}
                  href={item.url}
                  className="text-muted hover:text-foreground text-sm transition-colors">
                  {item.text}
                </a>
              )
            })}
          </div>
          <div className="flex items-center md:hidden">
            {SmallSearchTrigger && (
              <SmallSearchTrigger hideIfDisabled className="p-2" />
            )}
            <SidebarTrigger
              aria-label="Toggle sidebar"
              className="text-muted hover:bg-default-hover -me-1.5 inline-flex size-8 items-center justify-center rounded-md p-2">
              <Sidebar size={16} />
            </SidebarTrigger>
          </div>
          <div className="flex items-center gap-2 max-md:hidden">
            {controls ?? <ControlCenter />}
            <UserControls />
          </div>
        </div>
      </div>
      {children}
    </header>
  )
}
