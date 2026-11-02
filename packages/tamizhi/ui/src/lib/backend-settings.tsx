import { useEffect, useState } from 'react'

import {
  Button,
  Input,
  Label,
  Modal,
  Switch,
  TextField
} from '@vezham/react-v3'
import type { TamizhiAPI } from '@vezham/tamizhi-contracts'

import { AccountControls } from './account-controls'
import type { TamizhiChatProps } from './chat'
import { ProviderSettings } from './provider-settings'

export const BackendSettings = ({
  chat
}: {
  chat: TamizhiChatProps['chat']
}) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [session, setSession] = useState<TamizhiAPI.AuthSession | null>(null)
  const [plugins, setPlugins] = useState<TamizhiAPI.PluginInfo[]>([])
  const [memory, setMemory] = useState<TamizhiAPI.Memory[]>([])
  const [checkpoints, setCheckpoints] = useState<TamizhiAPI.Checkpoint[]>([])
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<TamizhiAPI.Conversation[]>([])
  const [cursor, setCursor] = useState('')
  const [title, setTitle] = useState('')
  const [fact, setFact] = useState('')
  const chatId = chat.activeId ?? ''
  const api = chat.api
  useEffect(() => {
    if (!api || !open) return
    let canceled = false
    void Promise.all([
      api.authSession(),
      api.plugins(),
      api.memory(),
      chat.activeId ? api.checkpoints(chat.activeId) : Promise.resolve([])
    ])
      .then(([user, installed, facts, saved]) => {
        if (!canceled) {
          setSession(user)
          setPlugins(installed)
          setMemory(facts)
          setCheckpoints(saved)
        }
      })
      .catch(() => {
        if (!canceled)
          setError(
            'Unable to load backend settings. Sign in or check the connection.'
          )
      })
    return () => {
      canceled = true
    }
  }, [api, open, chat.activeId])
  if (!api) return null
  const action = (work: () => Promise<unknown>) => {
    setBusy(true)
    setError(null)
    void work()
      .catch(failure =>
        setError(
          failure instanceof Error
            ? failure.message
            : 'Unable to complete this action.'
        )
      )
      .finally(() => setBusy(false))
  }
  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Button size="sm" variant="ghost">
        AI settings
      </Button>
      <Modal.Backdrop>
        <Modal.Container size="lg" scroll="inside">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Tamizhi settings</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="flex flex-col gap-6">
              {error && (
                <p role="alert" className="text-danger text-sm">
                  {error}
                </p>
              )}
              <section className="flex flex-col gap-3">
                <h3 className="font-medium">Account</h3>
                <AccountControls api={api} />
              </section>
              <ProviderSettings api={api} onChange={chat.refreshModels} />
              <section className="flex flex-col gap-3">
                <h3 className="font-medium">Conversations</h3>
                <TextField value={query} onChange={setQuery}>
                  <Label>Search chats</Label>
                  <Input placeholder="Search by title" />
                </TextField>
                <Button
                  size="sm"
                  variant="secondary"
                  isDisabled={busy}
                  onPress={() =>
                    action(async () => {
                      const page = await api.conversations(query)
                      setResults(page.items)
                      setCursor(page.nextCursor ?? '')
                    })
                  }>
                  Search
                </Button>
                {results.map(item => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="justify-start truncate"
                    onPress={() => {
                      chat.acceptConversation(item)
                      chat.selectChat(item.id)
                      setOpen(false)
                    }}>
                    {item.title}
                  </Button>
                ))}
                {cursor && (
                  <Button
                    size="sm"
                    variant="ghost"
                    isDisabled={busy}
                    onPress={() =>
                      action(async () => {
                        const page = await api.conversations(query, cursor)
                        setResults(current => [...current, ...page.items])
                        setCursor(page.nextCursor ?? '')
                      })
                    }>
                    Load more
                  </Button>
                )}
              </section>
              {chat.activeId && (
                <section className="flex flex-col gap-3">
                  <h3 className="font-medium">Current chat</h3>
                  <TextField value={title} onChange={setTitle}>
                    <Label>Title</Label>
                    <Input placeholder={chat.active?.title} maxLength={128} />
                  </TextField>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      isDisabled={busy || chat.isStreaming || !title.trim()}
                      onPress={() =>
                        action(async () => {
                          chat.acceptConversation(
                            await api.rename(chatId, title)
                          )
                          setTitle('')
                        })
                      }>
                      Rename
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      isDisabled={busy || chat.isStreaming}
                      onPress={() =>
                        action(async () => {
                          await api.checkpoint(chatId, 'Saved checkpoint')
                          setCheckpoints(await api.checkpoints(chatId))
                        })
                      }>
                      Save checkpoint
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      isDisabled={busy || chat.isStreaming}
                      onPress={() =>
                        action(async () => {
                          chat.acceptConversation(await api.compact(chatId))
                        })
                      }>
                      Compact context
                    </Button>
                  </div>
                  {checkpoints.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-2 text-sm">
                      <span>
                        {item.label} ·{' '}
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        isDisabled={busy || chat.isStreaming}
                        onPress={() =>
                          action(async () => {
                            chat.acceptConversation(
                              await api.restore(chatId, item.id)
                            )
                          })
                        }>
                        Restore
                      </Button>
                    </div>
                  ))}
                </section>
              )}
              <section className="flex flex-col gap-3">
                <h3 className="font-medium">Memory</h3>
                <TextField value={fact} onChange={setFact}>
                  <Label>Remember a fact</Label>
                  <Input maxLength={8000} />
                </TextField>
                <Button
                  size="sm"
                  variant="secondary"
                  isDisabled={busy || !fact.trim()}
                  onPress={() =>
                    action(async () => {
                      await api.remember(fact)
                      setFact('')
                      setMemory(await api.memory())
                    })
                  }>
                  Remember
                </Button>
                {memory.map(item => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-2 text-sm">
                    <p className="min-w-0 break-words">{item.text}</p>
                    <Button
                      size="sm"
                      variant="danger-soft"
                      isDisabled={busy}
                      onPress={() =>
                        action(async () => {
                          await api.forget(item.id)
                          setMemory(await api.memory())
                        })
                      }>
                      Forget
                    </Button>
                  </div>
                ))}
              </section>
              <section className="flex flex-col gap-3">
                <h3 className="font-medium">Plugins</h3>
                {plugins.map(plugin => (
                  <Switch
                    key={plugin.name}
                    isSelected={plugin.enabled}
                    isDisabled={
                      busy || !session?.user?.roles?.includes('admin')
                    }
                    onChange={enabled =>
                      action(async () => {
                        setPlugins(await api.setPlugin(plugin.name, enabled))
                      })
                    }>
                    <Switch.Content>
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                      <span className="flex flex-col text-sm">
                        <span>{plugin.name}</span>
                        <span className="text-muted text-xs">
                          {plugin.kind} · {plugin.status}
                        </span>
                      </span>
                    </Switch.Content>
                  </Switch>
                ))}
              </section>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
