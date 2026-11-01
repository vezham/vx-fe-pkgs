import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import { Button, Card, useMediaQuery } from '@vezham/react-v3'

import { OUTFITS, detectOutfit } from './avatar-data'
import { BotPicker } from './bot-picker'
import { Companion } from './companion'
import { Composer } from './composer'
import { ComposerLite } from './composer-lite'
import { Conversation } from './conversation'
import { Playground } from './playground'
import { PlaygroundPanel } from './playground-panel'
import { TamizhiPluginSlot } from './plugins'
import { useAvatarAppearance } from './use-avatar-appearance'
import { useAvatarPlacement } from './use-avatar-placement'
import type { useDemoChat } from './use-demo-chat'

export interface TamizhiChatProps {
  chat: Omit<ReturnType<typeof useDemoChat>, 'send'> & {
    send: (prompt: string) => unknown
  }
  isInstant: boolean
  setIsInstant: (value: boolean) => void
  isOffline: boolean
  setIsOffline: (value: boolean) => void
  compact?: boolean
  composerVariant?: 'app' | 'embed'
  composerNote?: ReactNode
  renderLayout: (content: ReactNode, openPlayground: () => void) => ReactNode
}

export const TamizhiChat = ({
  chat,
  isInstant,
  setIsInstant,
  isOffline,
  setIsOffline,
  compact = false,
  composerVariant = 'app',
  composerNote,
  renderLayout
}: TamizhiChatProps) => {
  const welcomeId = useId()
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false)
  const isCompact = useMediaQuery('(width < 64rem)', {
    initializeWithValue: false
  })
  const [isAnimated, setIsAnimated] = useState(true)
  const [model, setModel] = useState('Auto')
  const [isFastMode, setIsFastMode] = useState(false)
  const [permission, setPermission] = useState('Ask for approval')
  const [botName, setBotName] = useState('Tamizhi')
  const composerInput = useRef<HTMLTextAreaElement>(null)
  const scroll = useRef<HTMLDivElement>(null)
  const shouldFollow = useRef({ chatId: null as string | null, enabled: true })
  const {
    manualOutfit,
    expression,
    palette,
    isListening,
    setManualOutfit,
    setExpression,
    setPalette,
    setIsListening,
    reset: resetAppearance
  } = useAvatarAppearance(chat.activeId)
  const hasMessages = chat.messages.length > 0
  const { main, welcomeAvatarSlot, chatAvatarSlot, avatarLayer } =
    useAvatarPlacement(hasMessages, isAnimated)
  const lastUser = [...chat.messages]
    .reverse()
    .find(message => message.role === 'user')
  const outfit =
    manualOutfit ?? (lastUser ? detectOutfit(lastUser.text) : 'rest')
  const outfitInfo = OUTFITS.find(item => item.id === outfit) ?? OUTFITS[0]

  useEffect(() => {
    if (
      scroll.current &&
      (shouldFollow.current.chatId !== chat.activeId ||
        shouldFollow.current.enabled)
    )
      scroll.current.scrollTop = scroll.current.scrollHeight
  }, [chat.messages, chat.activeId])

  const playground = (
    <Playground
      outfit={outfit}
      expression={expression}
      palette={palette}
      isAnimated={isAnimated}
      isOffline={isOffline}
      isInstant={isInstant}
      connection={chat.isRemote ? 'Backend' : 'Local'}
      model={model}
      lastOutfit={lastUser ? detectOutfit(lastUser.text) : undefined}
      onOutfitChange={value => {
        setManualOutfit(value)
        setPalette(undefined)
      }}
      onExpressionChange={setExpression}
      onPaletteChange={setPalette}
      onAnimatedChange={setIsAnimated}
      onOfflineChange={value => {
        if (value === isOffline) return
        if (value) chat.stop()
        setIsOffline(value)
      }}
      onInstantChange={setIsInstant}
    />
  )

  const ComposerComponent =
    composerVariant === 'embed' ? ComposerLite : Composer
  const content = (
    <section ref={main} className="tamizhi__main" aria-label="Tamizhi chat">
      <div
        className="tamizhi__scroll"
        ref={scroll}
        onScroll={() => {
          const element = scroll.current
          if (element)
            shouldFollow.current = {
              chatId: chat.activeId,
              enabled:
                element.scrollHeight -
                  element.scrollTop -
                  element.clientHeight <
                100
            }
        }}>
        {!hasMessages ? (
          <section className="tamizhi-welcome" aria-labelledby={welcomeId}>
            <div className="tamizhi-welcome__stage" ref={welcomeAvatarSlot} />
            <BotPicker
              headingId={welcomeId}
              name={botName}
              outfit={outfit}
              onSelect={(name, value) => {
                setBotName(name)
                setManualOutfit(value)
                setPalette(undefined)
                setExpression('neutral')
              }}
            />
            <TamizhiPluginSlot name="welcome" />
          </section>
        ) : (
          <Conversation
            messages={chat.messages}
            isStreaming={chat.isStreaming}
            isAnimated={isAnimated}
            isOffline={isOffline}
            onRetry={() => {
              shouldFollow.current.enabled = true
              chat.retry()
            }}
            onToggleTask={chat.toggleTask}
            onRate={chat.rate}
            onBranch={chat.branchChat}
          />
        )}
      </div>
      <div
        ref={avatarLayer}
        className="tamizhi__companion-layer"
        aria-hidden="true">
        <Companion
          outfit={outfit}
          expression={expression}
          palette={palette}
          isListening={isListening}
          isThinking={chat.isStreaming}
          isAnimated={isAnimated}
          isOffline={isOffline}
          focusTargetRef={composerInput}
        />
      </div>
      {hasMessages && (
        <span className="sr-only" role="status">
          {outfitInfo.name} mode
        </span>
      )}
      {chat.error && (
        <p role="alert" className="text-danger px-4 py-2 text-sm">
          {chat.error}
        </p>
      )}
      {chat.approvals.map(approval => (
        <Card key={approval.callId} className="mx-4 mb-2" variant="secondary">
          <Card.Header>
            <Card.Title>Allow {approval.name}?</Card.Title>
            <Card.Description>
              Review the requested action before continuing.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <pre className="max-h-32 overflow-auto text-xs whitespace-pre-wrap">
              {JSON.stringify(approval.input, null, 2)}
            </pre>
          </Card.Content>
          <Card.Footer className="gap-2">
            <Button
              size="sm"
              variant="secondary"
              onPress={() => void chat.approve(approval, false)}>
              Deny
            </Button>
            <Button
              size="sm"
              variant="primary"
              onPress={() => void chat.approve(approval, true)}>
              Allow
            </Button>
          </Card.Footer>
        </Card>
      ))}
      {chat.activities.length > 0 && (
        <p role="status" className="text-muted truncate px-4 py-1 text-xs">
          {chat.activities.at(-1)?.name} ·{' '}
          {chat.activities.at(-1)?.type === 'tool-result'
            ? 'Complete'
            : 'Running'}
        </p>
      )}
      <ComposerComponent
        models={chat.isRemote ? chat.models : undefined}
        model={model}
        onModelChange={setModel}
        isFastMode={isFastMode}
        onFastModeChange={setIsFastMode}
        permission={permission}
        onPermissionChange={setPermission}
        note={composerNote}
        isStreaming={chat.isStreaming}
        isReady={chat.isReady}
        isOffline={isOffline}
        avatarSlotRef={chatAvatarSlot}
        inputRef={composerInput}
        onListeningChange={setIsListening}
        onSend={prompt => {
          shouldFollow.current.enabled = true
          resetAppearance()
          chat.configureRun({
            model,
            fast: isFastMode,
            permission:
              permission === 'Full access'
                ? 'full'
                : permission === 'Approve for me'
                  ? 'safe'
                  : 'ask'
          })
          chat.send(prompt)
        }}
        onStop={chat.stop}
      />
    </section>
  )
  return (
    <div className="tamizhi-view">
      {renderLayout(content, () => setIsPlaygroundOpen(true))}
      <PlaygroundPanel
        isOpen={isPlaygroundOpen}
        isCompact={compact || isCompact}
        onOpenChange={setIsPlaygroundOpen}>
        {playground}
      </PlaygroundPanel>
      <span className="sr-only" role="status">
        {chat.isStreaming
          ? 'Tamizhi is responding.'
          : chat.messages.length
            ? 'Response complete.'
            : 'Ready for a conversation.'}
      </span>
    </div>
  )
}
