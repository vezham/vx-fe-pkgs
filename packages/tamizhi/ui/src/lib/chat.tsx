import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import { Button, Card, useMediaQuery } from '@vezham/react-v3'
import type { APIAttachment } from '@vezham/tamizhi-contracts'

import { AccountControls } from './account-controls'
import { OUTFITS, detectOutfit } from './avatar-data'
import { BackendSettings } from './backend-settings'
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
import { useSpeechOutput } from './use-speech-output'

export interface TamizhiChatProps {
  chat: Omit<ReturnType<typeof useDemoChat>, 'send'> & {
    send: (prompt: string, attachments?: APIAttachment[]) => unknown
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
  const speech = useSpeechOutput(chat.api)
  const welcomeId = useId()
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false)
  const isCompact = useMediaQuery('(width < 64rem)', {
    initializeWithValue: false
  })
  const [isAnimated, setIsAnimated] = useState(true)
  const [model, setModel] = useState('Auto')
  const availableModel =
    chat.isRemote &&
    model !== 'Auto' &&
    !chat.models.some(item => item.id === model)
      ? 'Auto'
      : model
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
    <>
      <BackendSettings chat={chat} />
      <Playground
        outfit={outfit}
        expression={expression}
        palette={palette}
        isAnimated={isAnimated}
        isOffline={isOffline}
        isInstant={isInstant}
        connection={chat.isRemote ? 'Backend' : 'Local'}
        model={availableModel}
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
    </>
  )

  const ComposerComponent =
    composerVariant === 'embed' ? ComposerLite : Composer
  const content = (
    <section ref={main} className="tamizhi__main" aria-label="Tamizhi chat">
      {chat.api && <AccountControls api={chat.api} />}
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
            onSpeak={
              chat.capabilities?.speech
                ? text => void speech.speak(text)
                : undefined
            }
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
      {speech.error && (
        <p role="alert" className="text-danger px-4 text-xs">
          {speech.error}
        </p>
      )}
      {chat.runEvents.length > 0 && (
        <div
          className="text-muted flex flex-wrap gap-2 px-4 py-1 text-xs"
          role="status">
          {chat.runEvents
            .filter(event => event.type !== 'subagent-event')
            .slice(-3)
            .map((event, index) =>
              event.type === 'client-action' ? (
                <a
                  key={`${event.runId}-${index}`}
                  href={event.output.path}
                  className="text-accent underline">
                  Open {event.output.path}
                </a>
              ) : (
                <span key={`${event.runId}-${index}`}>
                  {event.type === 'status' ? event.name : 'Delegated task'}
                </span>
              )
            )}
        </div>
      )}
      {chat.approvals.map(approval => (
        <Card
          key={`${approval.runId}-${approval.callId}`}
          className="mx-4 mb-2"
          variant="secondary">
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
        api={chat.api}
        allowImages={chat.capabilities?.images}
        allowPDF={chat.capabilities?.pdf}
        allowVoice={chat.capabilities?.transcription}
        models={chat.isRemote ? chat.models : undefined}
        model={availableModel}
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
        onSend={(prompt, attachments) => {
          shouldFollow.current.enabled = true
          resetAppearance()
          chat.configureRun({
            model: availableModel,
            fast: isFastMode,
            permission:
              permission === 'Full access'
                ? 'full'
                : permission === 'Approve for me'
                  ? 'safe'
                  : 'ask'
          })
          chat.send(prompt, attachments)
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
