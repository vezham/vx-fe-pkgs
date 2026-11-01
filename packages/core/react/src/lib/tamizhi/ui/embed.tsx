import {
  AddCircle,
  AltArrowDown,
  Tuning,
  VezhamTamizhi
} from '@vezham/icons-react'
import { Button, Dropdown, Header } from '@vezham/react-v3'

import { TamizhiChat } from './chat'
import { EXAMPLES } from './demo'
import { useTamizhiSession } from './session'

export const TamizhiEmbed = () => {
  const session = useTamizhiSession()
  const { chat, isOffline } = session
  return (
    <TamizhiChat
      {...session}
      compact
      composerVariant="embed"
      composerNote={
        <>
          <p className="text-xs">AI may make mistakes. Verify all outputs.</p>
          <a
            href="https://vezham.com/tamizhi"
            target="_blank"
            rel="noopener noreferrer"
            className="tamizhi-embed__attribution-link">
            Powered by <VezhamTamizhi size={18} aria-hidden="true" />{' '}
            <span>Tamizhi</span>
          </a>
        </>
      }
      renderLayout={(content, openPlayground) => (
        <div className="tamizhi-embed w-full">
          <nav
            aria-label="Tamizhi preview navigation"
            className="flex shrink-0 items-center gap-1 pb-2">
            <Dropdown>
              <Dropdown.Trigger
                aria-label="Choose a Tamizhi chat"
                className="button button--ghost button--sm flex min-w-0 flex-1 flex-row flex-nowrap items-center justify-start gap-2">
                <span className="truncate">
                  {chat.active?.title ?? 'New chat'}
                </span>
                <AltArrowDown
                  className="shrink-0"
                  size={16}
                  aria-hidden="true"
                />
              </Dropdown.Trigger>
              <Dropdown.Popover className="max-h-80 w-72 overflow-y-auto">
                <Dropdown.Menu aria-label="Tamizhi chats and examples">
                  {chat.conversations.map(item => (
                    <Dropdown.Item
                      key={item.id}
                      id={item.id}
                      textValue={item.title}
                      onPress={() => chat.selectChat(item.id)}>
                      {item.title}
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Section>
                    <Header>Examples</Header>
                    {EXAMPLES.map(item => (
                      <Dropdown.Item
                        key={item.id}
                        id={`example-${item.id}`}
                        textValue={item.title}
                        isDisabled={isOffline || !chat.isReady}
                        onPress={() =>
                          chat.send(item.prompt, item.persona, true, item.title)
                        }>
                        {item.title}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Section>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              aria-label="New Tamizhi chat"
              onPress={chat.newChat}>
              <AddCircle size={18} aria-hidden="true" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              aria-label="Tamizhi playground"
              onPress={openPlayground}>
              <Tuning size={18} aria-hidden="true" />
            </Button>
          </nav>
          {content}
        </div>
      )}
    />
  )
}
