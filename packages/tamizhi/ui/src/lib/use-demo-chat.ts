import { useEffect, useEffectEvent, useRef, useState } from 'react'

import { useLocalStore } from '@vezham/hooks'
import type { TamizhiClient } from '@vezham/tamizhi-client'
import type {
  ApprovalRequest,
  ModelInfo,
  RunRequest,
  ToolActivity
} from '@vezham/tamizhi-contracts'
import type { Conversation, Message, Persona } from '@vezham/tamizhi-contracts'

import { detectOutfit } from './avatar-data'
import { EMPTY_CONVERSATIONS, parseConversations } from './conversation-storage'
import { createDemoReply, detectPersona } from './demo'

const STORAGE_KEY = 'tamizhi.demo.v1'

const createId = () => {
  if (typeof crypto !== 'undefined') {
    if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
    if (typeof crypto.getRandomValues === 'function') {
      return Array.from(crypto.getRandomValues(new Uint32Array(4)), value =>
        value.toString(36)
      ).join('-')
    }
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
}

export const useDemoChat = (
  isInstant = false,
  selectedChatId?: string | null,
  storageKey = STORAGE_KEY,
  client?: TamizhiClient
) => {
  const {
    value: conversations,
    setValue: setConversations,
    isReady,
    isSaved
  } = useLocalStore(storageKey, EMPTY_CONVERSATIONS, {
    parse: parseConversations,
    debounceMs: 150
  })
  const [sessionChatId, setActiveId] = useState<string | null>(null)
  const activeId = selectedChatId === undefined ? sessionChatId : selectedChatId
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([])
  const [activities, setActivities] = useState<ToolActivity[]>([])
  const [models, setModels] = useState<ModelInfo[]>([])
  const runOptions = useRef<Pick<RunRequest, 'model' | 'fast' | 'permission'>>({
    model: 'Auto',
    fast: false,
    permission: 'ask'
  })
  const remote = useRef<AbortController | null>(null)
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
  const persona = messages[messages.length - 1]?.persona ?? 'helper'

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current)
      remote.current?.abort()
    },
    []
  )

  const stop = () => {
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
    selectedPersona?: Persona
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
      const assistant: Message = {
        id,
        role: 'assistant',
        persona: selectedPersona ?? detectPersona(prompt),
        outfit: detectOutfit(prompt),
        text: ''
      }
      setConversations(chats =>
        chats.map(chat =>
          chat.id === chatId
            ? { ...chat, messages: [...history, assistant] }
            : chat
        )
      )
      const consume = async () => {
        let text = ''
        try {
          for await (const event of client.stream(
            {
              conversationId: chatId,
              messages: history.map(message => ({
                role: message.role,
                content: message.text
              })),
              ...runOptions.current
            },
            controller.signal
          )) {
            if (controller.signal.aborted) break
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
            if (event.type === 'approval')
              setApprovals(current => [...current, event])
            if (event.type === 'tool' || event.type === 'tool-result')
              setActivities(current => [...current, event])
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
      selectedPersona ?? detectPersona(prompt)
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
      persona: reply.persona,
      outfit: detectOutfit(prompt),
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
    selectedPersona?: Persona,
    startNew = false,
    conversationTitle?: string
  ) => {
    const prompt = value.trim().slice(0, 32_000)
    if (!prompt || (busy.current && !startNew) || !isReady) return
    if (startNew) stop()
    const chatId = (startNew ? null : activeId) ?? createId()
    const user: Message = {
      id: createId(),
      role: 'user',
      text: prompt,
      persona: selectedPersona ?? detectPersona(prompt),
      outfit: detectOutfit(prompt)
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
    streamReply(chatId, history, prompt, selectedPersona)
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
      user.persona
    )
  }

  const newChat = () => {
    stop()
    setActiveId(null)
  }
  const selectChat = (id: string) => {
    stop()
    setActiveId(id)
  }
  const deleteChat = (id: string) => {
    if (id === activeId) newChat()
    setConversations(chats => chats.filter(chat => chat.id !== id))
  }
  const rate = (messageId: string, rating: 'up' | 'down') => {
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

  return {
    error,
    approvals,
    activities,
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
