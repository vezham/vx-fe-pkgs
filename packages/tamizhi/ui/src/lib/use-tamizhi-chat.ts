import { useEffect, useEffectEvent, useRef, useState } from 'react'

import { useLocalStore } from '@vezham/hooks'
import type { TamizhiClient } from '@vezham/tamizhi-client'
import type {
  APIAttachment,
  APICapabilities,
  APIConversation,
  ApprovalRequest,
  ModelInfo,
  RunRequest,
  StoredConversationData,
  StreamEvent,
  TamizhiAppearance,
  TamizhiProfileOptions,
  ToolActivity
} from '@vezham/tamizhi-contracts'
import type { Conversation, Message, Persona } from '@vezham/tamizhi-contracts'
import { streamEventSchema, wireMessageSchema } from '@vezham/tamizhi-contracts'

import { detectOutfit } from './avatar-data'
import { EMPTY_CONVERSATIONS, parseConversations } from './conversation-storage'
import { createId } from './create-id'
import { createDemoReply, detectPersona } from './demo'
import {
  getActivityAppearance,
  getTamizhiProfile,
  getTamizhiProfiles
} from './profiles'

const STORAGE_KEY = 'tamizhi.demo.v1'
const fromWire = (
  item: StoredConversationData | APIConversation
): Conversation => ({
  id: item.id,
  title: item.title ?? 'Chat',
  version: item.version,
  messages: item.messages
    .filter(
      message =>
        message.role === 'user' ||
        (message.role === 'assistant' && message.content.trim())
    )
    .map(message => ({
      id: message.id ?? createId(),
      role: message.role as 'user' | 'assistant',
      text: message.content,
      persona:
        wireMessageSchema.shape.persona.safeParse(message.persona).data ??
        'helper',
      outfit: wireMessageSchema.shape.outfit.safeParse(message.outfit).data,
      profileId: message.profileId,
      outfitLocked: message.outfitLocked,
      attachments: message.attachments,
      rating:
        message.rating === 'like'
          ? 'up'
          : message.rating === 'dislike'
            ? 'down'
            : undefined,
      tasks: message.tasks
    }))
})

export const useTamizhiChat = (
  isInstant = false,
  selectedChatId?: string | null,
  storageKey = STORAGE_KEY,
  client?: TamizhiClient,
  options: TamizhiProfileOptions = {}
) => {
  const profiles = getTamizhiProfiles(options.profiles)
  const [selection, setSelection] = useState({
    appId: options.appId,
    id: options.appId
  })
  const appearance = useRef<Partial<TamizhiAppearance>>({})
  const local = useLocalStore(storageKey, EMPTY_CONVERSATIONS, {
    parse: parseConversations,
    debounceMs: 150
  })
  const [remoteConversations, setRemoteConversations] = useState<
    Conversation[]
  >([])
  const [loadedClient, setLoadedClient] = useState<TamizhiClient | null>(null)
  const conversations = client
    ? client.api && loadedClient !== client
      ? []
      : remoteConversations
    : local.value
  const setConversations = client ? setRemoteConversations : local.setValue
  const isReady = client?.api ? loadedClient === client : local.isReady
  const isSaved = client ? true : local.isSaved
  const [capabilities, setCapabilities] = useState<APICapabilities | null>(null)
  const [sessionChatId, setActiveId] = useState<string | null>(null)
  const activeId = selectedChatId === undefined ? sessionChatId : selectedChatId
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([])
  const [activities, setActivities] = useState<ToolActivity[]>([])
  const [runEvents, setRunEvents] = useState<
    (StreamEvent & { uiId: string })[]
  >([])
  const [models, setModels] = useState<ModelInfo[]>([])
  const runOptions = useRef<Pick<RunRequest, 'model' | 'fast' | 'permission'>>({
    model: 'Auto',
    fast: false,
    permission: 'ask'
  })
  const remote = useRef<AbortController | null>(null)
  const currentRun = useRef<string | null>(null)
  const acceptConversation = (
    item: StoredConversationData | APIConversation
  ) => {
    const chat = fromWire(item)
    setConversations(current => [
      chat,
      ...current.filter(value => value.id !== chat.id)
    ])
    return chat
  }
  useEffect(() => {
    if (!client?.api) return
    const controller = new AbortController()
    void Promise.all([
      client.api.conversations('', '', controller.signal),
      client.api.capabilities(controller.signal)
    ])
      .then(([page, features]) => {
        if (controller.signal.aborted) return
        setRemoteConversations(page.items.map(fromWire))
        setCapabilities(features)
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setError(
            'Unable to load conversations. Sign in or check the Tamizhi connection.'
          )
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadedClient(client)
      })
    return () => controller.abort()
  }, [client])
  useEffect(() => {
    if (!client) return
    const controller = new AbortController()
    void client
      .models(controller.signal)
      .then(setModels)
      .catch(() => {
        if (!controller.signal.aborted)
          setError('Unable to load AI models. Check the Tamizhi connection.')
      })
    return () => controller.abort()
  }, [client])
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const busy = useRef(false)
  const streamingChatId = useRef<string | null>(null)
  const active = conversations.find(chat => chat.id === activeId)
  const messages = active?.messages ?? []
  const lastUser = [...messages]
    .reverse()
    .find(message => message.role === 'user')
  const profile = getTamizhiProfile(
    lastUser?.profileId ??
      (selection.appId === options.appId ? selection.id : options.appId),
    profiles
  )
  const persona = messages[messages.length - 1]?.persona ?? profile.persona
  const activityAppearance = isStreaming
    ? getActivityAppearance(profile, activities)
    : undefined
  const acceptRemoteConversation = useEffectEvent(acceptConversation)
  useEffect(() => {
    if (
      !client?.api ||
      !isReady ||
      !activeId ||
      streamingChatId.current === activeId
    )
      return
    const controller = new AbortController()
    void client
      .conversation(activeId, controller.signal)
      .then(item => {
        if (!controller.signal.aborted) acceptRemoteConversation(item)
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setError('Unable to load this conversation.')
      })
    return () => controller.abort()
  }, [client, activeId, isReady])

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current)
      remote.current?.abort()
    },
    []
  )

  const stop = () => {
    if (client?.api && currentRun.current)
      void client.api
        .cancel(currentRun.current)
        .catch(() => setError('Unable to stop the backend run.'))
    currentRun.current = null
    remote.current?.abort()
    remote.current = null
    setApprovals([])
    if (timer.current) clearInterval(timer.current)
    timer.current = null
    busy.current = false
    streamingChatId.current = null
    setIsStreaming(false)
    setConversations(chats =>
      chats.map(chat => ({
        ...chat,
        messages: chat.messages.map(message =>
          message.role === 'assistant' && !message.text
            ? { ...message, text: 'Response stopped.' }
            : message
        )
      }))
    )
  }

  const stopInactiveStream = useEffectEvent(() => {
    if (streamingChatId.current && streamingChatId.current !== activeId) stop()
  })

  useEffect(() => {
    stopInactiveStream()
  }, [activeId])

  const streamReply = (
    chatId: string,
    history: Message[],
    prompt: string,
    selectedPersona?: Persona,
    title?: string
  ) => {
    if (client) {
      const controller = new AbortController()
      const id = createId()
      remote.current = controller
      busy.current = true
      streamingChatId.current = chatId
      setIsStreaming(true)
      setError(null)
      setApprovals([])
      setActivities([])
      setRunEvents([])
      const assistant: Message = {
        id,
        role: 'assistant',
        persona: history.at(-1)?.persona ?? profile.persona,
        outfit: history.at(-1)?.outfit ?? profile.outfit,
        profileId: history.at(-1)?.profileId ?? profile.id,
        outfitLocked: history.at(-1)?.outfitLocked,
        text: ''
      }
      setConversations(chats =>
        chats.map(chat =>
          chat.id === chatId
            ? { ...chat, messages: [...history, assistant] }
            : chat
        )
      )
      const chatTitle =
        title ??
        conversations.find(item => item.id === chatId)?.title ??
        prompt.slice(0, 48)
      const consume = async () => {
        let text = ''
        try {
          for await (const event of client.stream(
            {
              conversationId: chatId,
              title: chatTitle,
              messages: (client.api ? history.slice(-1) : history).map(
                message => ({
                  id: message.id,
                  role: message.role,
                  content: message.text,
                  attachments: message.attachments,
                  persona: message.persona,
                  outfit: message.outfit,
                  outfitLocked: message.outfitLocked,
                  profileId: message.profileId
                })
              ),
              ...runOptions.current,
              activityProfiles: profile.activities
            },
            controller.signal
          )) {
            if (controller.signal.aborted) break
            currentRun.current = event.runId
            if (event.type === 'error') throw new Error(event.message)
            if (event.type === 'text') {
              text += event.delta
              const current = text
              setConversations(chats =>
                chats.map(chat =>
                  chat.id === chatId
                    ? {
                        ...chat,
                        messages: chat.messages.map(message =>
                          message.id === id
                            ? { ...message, text: current }
                            : message
                        )
                      }
                    : chat
                )
              )
            }
            if (event.type === 'finish' && client.api) {
              const saved = await client.conversation(chatId, controller.signal)
              if (!controller.signal.aborted) acceptConversation(saved)
            }
            if (
              event.type === 'status' ||
              event.type === 'subagent' ||
              event.type === 'client-action'
            ) {
              const notice = { ...event, uiId: createId() }
              setRunEvents(current => [...current.slice(-99), notice])
            }
            if (event.type === 'subagent-event') {
              const child = streamEventSchema.safeParse(event.output)
              if (child.success && child.data.type === 'approval')
                setApprovals(current => [
                  ...current,
                  child.data as ApprovalRequest
                ])
              if (
                child.success &&
                (child.data.type === 'tool' ||
                  child.data.type === 'approval' ||
                  child.data.type === 'tool-result')
              )
                setActivities(current => [
                  ...current.slice(-99),
                  child.data as ToolActivity
                ])
            }
            if (event.type === 'approval')
              setApprovals(current => [...current, event])
            if (
              event.type === 'tool' ||
              event.type === 'approval' ||
              event.type === 'tool-result'
            )
              setActivities(current => [...current.slice(-99), event])
          }
        } catch (failure) {
          if (!controller.signal.aborted)
            setError(
              failure instanceof Error
                ? failure.message
                : 'Unable to complete the response.'
            )
        } finally {
          if (remote.current === controller) {
            remote.current = null
            currentRun.current = null
            busy.current = false
            streamingChatId.current = null
            setIsStreaming(false)
            setApprovals([])
            if (!text)
              setConversations(chats =>
                chats.map(chat =>
                  chat.id === chatId
                    ? {
                        ...chat,
                        messages: chat.messages.filter(
                          message => message.id !== id
                        )
                      }
                    : chat
                )
              )
          }
        }
      }
      void consume()
      return
    }
    const reply = createDemoReply(
      prompt,
      history.at(-1)?.persona ?? selectedPersona ?? profile.persona
    )
    const id = createId()
    const words = reply.text.match(/\S+\s*/g) ?? []
    let position = 0
    busy.current = true
    streamingChatId.current = chatId
    setIsStreaming(true)
    const assistant: Message = {
      id,
      role: 'assistant',
      persona: history.at(-1)?.persona ?? reply.persona,
      outfit: history.at(-1)?.outfit ?? profile.outfit,
      profileId: history.at(-1)?.profileId ?? profile.id,
      outfitLocked: history.at(-1)?.outfitLocked,
      text: isInstant ? reply.text : '',
      ...(isInstant && reply.tasks ? { tasks: reply.tasks } : {})
    }
    setConversations(chats =>
      chats.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: [...history, assistant] }
          : chat
      )
    )
    if (isInstant) {
      busy.current = false
      streamingChatId.current = null
      setIsStreaming(false)
      return
    }
    timer.current = setInterval(() => {
      position = Math.min(position + 2, words.length)
      const complete = position === words.length
      setConversations(chats =>
        chats.map(chat =>
          chat.id === chatId
            ? {
                ...chat,
                messages: chat.messages.map(message =>
                  message.id === id
                    ? {
                        ...message,
                        text: words.slice(0, position).join(''),
                        ...(complete && reply.tasks
                          ? { tasks: reply.tasks }
                          : {})
                      }
                    : message
                )
              }
            : chat
        )
      )
      if (complete) stop()
    }, 70)
  }

  const send = (
    value: string,
    selectedPersona?: Persona | APIAttachment[],
    startNew = false,
    conversationTitle?: string,
    attachments?: APIAttachment[]
  ) => {
    if (Array.isArray(selectedPersona)) {
      attachments = selectedPersona
      selectedPersona = undefined
    }
    const prompt = value.trim().slice(0, 32_000)
    if (!prompt || (busy.current && !startNew) || !isReady) return
    if (startNew) {
      stop()
      appearance.current = {}
    }
    const chatId = (startNew ? null : activeId) ?? createId()
    const autoDetect =
      !client &&
      profile.id === 'vezham-tamizhi' &&
      !options.profiles?.some(item => item.id === profile.id)
    const user: Message = {
      id: createId(),
      role: 'user',
      text: prompt,
      attachments,
      persona:
        selectedPersona ??
        (autoDetect ? detectPersona(prompt) : profile.persona),
      outfit:
        appearance.current.outfit ??
        (selectedPersona || autoDetect ? detectOutfit(prompt) : profile.outfit),
      profileId: profile.id,
      outfitLocked: Boolean(appearance.current.outfit) || undefined
    }
    const history = [...(startNew ? [] : messages), user].slice(-59)
    if (startNew || !active)
      setConversations(chats =>
        [
          {
            id: chatId,
            title: conversationTitle ?? prompt.slice(0, 48),
            messages: []
          },
          ...chats
        ].slice(0, 24)
      )
    setActiveId(chatId)
    streamReply(
      chatId,
      history,
      prompt,
      user.persona,
      conversationTitle ?? active?.title
    )
    return chatId
  }

  const retry = () => {
    if (busy.current || !active) return
    const lastUser = messages.reduce(
      (last, message, index) => (message.role === 'user' ? index : last),
      -1
    )
    if (lastUser < 0) return
    const user = messages[lastUser]
    streamReply(
      active.id,
      messages.slice(0, lastUser + 1),
      user.text,
      user.persona,
      active.title
    )
  }

  const newChat = () => {
    stop()
    appearance.current = {}
    setActiveId(null)
  }
  const selectChat = (id: string) => {
    stop()
    appearance.current = {}
    setActiveId(id)
  }
  const deleteChat = (id: string) => {
    if (client?.api) {
      void client.api
        .deleteConversation(id)
        .then(() => {
          if (id === activeId) setActiveId(null)
          setConversations(chats => chats.filter(chat => chat.id !== id))
        })
        .catch(() => setError('Unable to delete this conversation.'))
      return
    }
    if (id === activeId) newChat()
    setConversations(chats => chats.filter(chat => chat.id !== id))
  }
  const rate = (messageId: string, rating: 'up' | 'down') => {
    if (client?.api && activeId) {
      const selected = messages.find(
        message => message.id === messageId
      )?.rating
      void client.api
        .feedback(
          activeId,
          messageId,
          selected === rating ? '' : rating === 'up' ? 'like' : 'dislike'
        )
        .then(acceptConversation)
        .catch(() => setError('Unable to save feedback.'))
      return
    }
    setConversations(chats =>
      chats.map(chat =>
        chat.id === activeId
          ? {
              ...chat,
              messages: chat.messages.map(message =>
                message.id === messageId
                  ? {
                      ...message,
                      rating: message.rating === rating ? undefined : rating
                    }
                  : message
              )
            }
          : chat
      )
    )
  }

  const branchChat = (messageId: string) => {
    if (!active || busy.current) return
    if (client?.api)
      return client.api
        .branch(active.id, messageId)
        .then(item => {
          acceptConversation(item)
          setActiveId(item.id)
          return item.id
        })
        .catch(() => {
          setError('Unable to branch this conversation.')
          return undefined
        })
    const messageIndex = messages.findIndex(message => message.id === messageId)
    if (messageIndex < 0) return
    const id = createId()
    const branch: Conversation = {
      id,
      title: `Branch: ${active.title}`.slice(0, 48),
      messages: messages.slice(0, messageIndex + 1)
    }
    setConversations(chats => [branch, ...chats].slice(0, 24))
    setActiveId(id)
    return id
  }

  const toggleTask = (messageId: string, index: number, done: boolean) => {
    if (client?.api && activeId) {
      const tasks =
        messages
          .find(message => message.id === messageId)
          ?.tasks?.map((task, position) =>
            position === index ? { ...task, done } : task
          ) ?? []
      void client.api
        .tasks(activeId, messageId, tasks)
        .then(acceptConversation)
        .catch(() => setError('Unable to update tasks.'))
      return
    }
    setConversations(chats =>
      chats.map(chat =>
        chat.id === activeId
          ? {
              ...chat,
              messages: chat.messages.map(message =>
                message.id === messageId
                  ? {
                      ...message,
                      tasks: message.tasks?.map((task, taskIndex) =>
                        taskIndex === index ? { ...task, done } : task
                      )
                    }
                  : message
              )
            }
          : chat
      )
    )
  }

  const approve = async (approval: ApprovalRequest, approved: boolean) => {
    if (!client) return
    try {
      await client.approve({
        runId: approval.runId,
        callId: approval.callId,
        approved
      })
      setApprovals(current =>
        current.filter(item => item.callId !== approval.callId)
      )
    } catch {
      setError('Unable to send the approval decision. Please retry.')
    }
  }

  const refreshModels = async () => {
    if (!client?.api) return
    const [catalog, features] = await Promise.all([
      client.models(),
      client.api.capabilities()
    ])
    setModels(catalog)
    setCapabilities(features)
    setError(null)
  }
  const providerChanged = useEffectEvent(() => {
    void refreshModels().catch(() =>
      setError('Unable to refresh the provider model catalog.')
    )
  })
  useEffect(
    () => client?.subscribeProviderChanges?.(() => providerChanged()),
    [client]
  )
  return {
    profile,
    profiles,
    selectProfile: (id: string) => {
      if (!busy.current && profiles.some(item => item.id === id)) {
        appearance.current = {}
        setSelection({ appId: options.appId, id })
      }
    },
    configureAppearance: (value: Partial<TamizhiAppearance>) => {
      appearance.current = value
    },
    activityAppearance,
    runOutfitOverride: lastUser?.outfitLocked ? lastUser.outfit : undefined,
    refreshModels,
    api: client?.api,
    capabilities,
    acceptConversation,
    error,
    approvals,
    activities,
    runEvents,
    models,
    isRemote: Boolean(client),
    approve,
    configureRun: (
      options: Pick<RunRequest, 'model' | 'fast' | 'permission'>
    ) => {
      runOptions.current = options
    },
    conversations,
    activeId,
    active,
    messages,
    persona,
    isStreaming,
    isReady,
    isSaved,
    send,
    stop,
    retry,
    rate,
    branchChat,
    newChat,
    selectChat,
    deleteChat,
    toggleTask
  }
}
