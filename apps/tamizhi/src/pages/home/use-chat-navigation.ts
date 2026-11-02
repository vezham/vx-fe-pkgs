import { useNavigate, useParams, useRouter } from '@tanstack/react-router'
import { useEffect, useEffectEvent } from 'react'

import type { APIAttachment } from '@vezham/tamizhi-contracts'
import { EXAMPLES, useDemoChat } from '@vezham/tamizhi-ui'

import { tamizhiClient } from '../../app/tamizhi-client'

interface Props {
  isInstant: boolean
  isOffline: boolean
}

const getChatId = (itemId?: string) =>
  itemId && itemId !== 'new' && !itemId.startsWith('example-') ? itemId : null

export const useChatNavigation = ({ isInstant, isOffline }: Props) => {
  const { chatId: itemId } = useParams({ strict: false })
  const chat = useDemoChat(
    isInstant,
    getChatId(itemId),
    undefined,
    tamizhiClient
  )
  const router = useRouter()
  const navigate = useNavigate()

  const openChat = (chatId: string, replace = false) =>
    navigate({ to: '/chat/$chatId', params: { chatId }, replace })

  const activateRoute = useEffectEvent((pathname: string) => {
    const destination = pathname.split('/')[2]

    if (destination?.startsWith('example-')) {
      const example = EXAMPLES.find(
        item => item.id === destination.slice('example-'.length)
      )
      const createdId =
        example && !isOffline
          ? chat.send(example.prompt, example.persona, true, example.title)
          : undefined
      void openChat(createdId ?? 'new', true)
      return
    }

    if (
      !destination ||
      (!chat.isRemote &&
        destination !== 'new' &&
        !chat.conversations.some(item => item.id === destination))
    )
      void openChat('new', true)
  })

  useEffect(() => {
    if (!chat.isReady) return

    const unsubscribe = router.subscribe('onResolved', event => {
      if (event.toLocation.pathname.startsWith('/chat'))
        activateRoute(event.toLocation.pathname)
    })
    activateRoute(router.state.location.pathname)
    return unsubscribe
  }, [chat.isReady, router])

  const send = (prompt: string, attachments?: APIAttachment[]) => {
    if (isOffline) return
    const createdId = chat.send(
      prompt,
      undefined,
      false,
      undefined,
      attachments
    )
    if (createdId && createdId !== chat.activeId) void openChat(createdId, true)
  }

  const deleteActiveChat = () => {
    if (!chat.activeId) return
    chat.deleteChat(chat.activeId)
    void openChat('new')
  }

  const branchChat = async (messageId: string) => {
    const id = await chat.branchChat(messageId)
    if (id) void openChat(id)
    return id
  }

  return {
    ...chat,
    send,
    branchChat,
    selectChat: (id: string) => {
      void openChat(id)
    },
    deleteActiveChat
  }
}
