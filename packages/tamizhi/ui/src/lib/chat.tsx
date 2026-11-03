import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import { useMediaQuery } from '@vezham/react-v3'
import type { APIAttachment } from '@vezham/tamizhi-contracts'

import { AccountControls } from './account-controls'
import { OUTFITS } from './avatar-data'
import { BackendSettings } from './backend-settings'
import { ChatContent } from './chat-content'
import { ChatFeedback } from './chat-feedback'
import { Companion } from './companion'
import { Composer } from './composer'
import { ComposerLite } from './composer-lite'
import { getAvailableModel } from './models'
import { Playground } from './playground'
import { PlaygroundPanel } from './playground-panel'
import { resolveOutfit } from './resolve-outfit'
import { useAvatarAppearance } from './use-avatar-appearance'
import { useAvatarPlacement } from './use-avatar-placement'
import { useSpeechOutput } from './use-speech-output'
import type { useTamizhiChat } from './use-tamizhi-chat'
import { WelcomeSuggestions } from './welcome-suggestions'

export interface TamizhiChatProps {
  chat: Omit<ReturnType<typeof useTamizhiChat>, 'send'> & {
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
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false)
  const isCompact = useMediaQuery('(width < 64rem)', {
    initializeWithValue: false
  })
  const [isAnimated, setIsAnimated] = useState(true)
  const [model, setModel] = useState('Auto')
  const availableModel = getAvailableModel(
    model,
    chat.isRemote ? chat.models : undefined
  )
  const [isFastMode, setIsFastMode] = useState(false)
  const [permission, setPermission] = useState('Ask for approval')
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
  const outfit = resolveOutfit({
    manual: manualOutfit,
    run: chat.runOutfitOverride,
    activity: chat.activityAppearance?.outfit,
    message: lastUser?.outfit,
    profile: chat.profile.outfit
  })
  const outfitInfo = OUTFITS.find(item => item.id === outfit) ?? OUTFITS[0]

  useEffect(() => {
    if (
      scroll.current &&
      (shouldFollow.current.chatId !== chat.activeId ||
        shouldFollow.current.enabled)
    )
      scroll.current.scrollTop = scroll.current.scrollHeight
  }, [chat.messages, chat.activeId])

  const selectProfile = (id: string) => {
    if (chat.isStreaming || id === chat.profile.id) return
    if (hasMessages) chat.newChat()
    chat.selectProfile(id)
    resetAppearance()
  }

  const sendMessage = (prompt: string, attachments?: APIAttachment[]) => {
    if (isOffline || !chat.isReady || chat.isStreaming) return
    shouldFollow.current.enabled = true
    chat.configureAppearance({ outfit: manualOutfit ?? undefined })
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
  }

  const playground = (
    <>
      <BackendSettings chat={chat} />
      <Playground
        profile={chat.profile}
        profiles={chat.profiles}
        isProfileDisabled={chat.isStreaming}
        startsNewChat={hasMessages}
        onProfileChange={selectProfile}
        outfit={outfit}
        expression={expression}
        palette={palette}
        isAnimated={isAnimated}
        isOffline={isOffline}
        isInstant={isInstant}
        connection={chat.isRemote ? 'Backend' : 'Local'}
        model={availableModel}
        lastOutfit={lastUser?.outfit}
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
        <ChatContent
          chat={chat}
          variant={composerVariant}
          avatarSlotRef={welcomeAvatarSlot}
          isAnimated={isAnimated}
          isOffline={isOffline}
          onSelectProfile={selectProfile}
          onRetry={() => {
            shouldFollow.current.enabled = true
            chat.retry()
          }}
          onSpeak={
            chat.capabilities?.speech
              ? text => void speech.speak(text)
              : undefined
          }
        />
      </div>
      <div
        ref={avatarLayer}
        className="tamizhi__companion-layer"
        aria-hidden="true">
        <Companion
          outfit={outfit}
          persona={chat.activityAppearance?.persona ?? chat.persona}
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
      <ChatFeedback chat={chat} speechError={speech.error} />
      {!hasMessages && (
        <WelcomeSuggestions
          variant={composerVariant}
          profile={chat.profile}
          profiles={chat.profiles}
          onSuggest={sendMessage}
          isDisabled={isOffline || !chat.isReady || chat.isStreaming}
        />
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
        onSend={sendMessage}
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
    </div>
  )
}
