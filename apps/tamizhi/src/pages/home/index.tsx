import { Outlet } from '@tanstack/react-router'
import { useState } from 'react'

import { SectionLayout } from '@vezham/react/layouts/section'
import { TamizhiChat } from '@vezham/react/tamizhi/ui'

import { getSidebarItems } from './sidebar'
import { useChatNavigation } from './use-chat-navigation'

export default () => {
  const [isInstant, setIsInstant] = useState(false)
  const [isOffline, setIsOffline] = useState(false)
  const chat = useChatNavigation({ isInstant, isOffline })
  const title = chat.messages.length ? chat.active?.title : undefined
  return (
    <div className="tamizhi">
      <TamizhiChat
        chat={chat}
        isInstant={isInstant}
        setIsInstant={setIsInstant}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        renderLayout={(content, openPlayground) => (
          <SectionLayout
            sectionKey="tamizhi"
            title="Tamizhi"
            navigationLabel="Tamizhi conversations"
            sidebarItems={getSidebarItems(chat.conversations)}
            tabs={[]}
            sync={false}
            filter={false}
            sort={false}
            toolbar={
              title ? (
                <h1 className="min-w-0 flex-1 truncate text-base font-semibold">
                  {title}
                </h1>
              ) : undefined
            }
            menuActions={[
              {
                key: 'playground',
                label: 'Playground',
                icon: 'vx:tuning',
                onAction: openPlayground
              },
              ...(chat.activeId
                ? [
                    {
                      key: 'delete-chat',
                      label: 'Delete chat',
                      icon: 'vx:trash',
                      onAction: chat.deleteActiveChat
                    }
                  ]
                : [])
            ]}>
            {title && (
              <header className="tamizhi__compact-header">
                <h1 className="min-w-0 truncate text-center text-base font-semibold">
                  {title}
                </h1>
              </header>
            )}
            {content}
            <Outlet />
          </SectionLayout>
        )}
      />
    </div>
  )
}
