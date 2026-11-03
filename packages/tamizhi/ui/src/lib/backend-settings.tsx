import { useEffect, useState } from 'react'

import { Button, Input, Label, Modal, TextField } from '@vezham/react-v3'
import type { TamizhiAPI } from '@vezham/tamizhi-contracts'

import { AccountControls } from './account-controls'
import { BackendPlugins } from './backend-plugins'
import type { TamizhiChatProps } from './chat'
import { ProviderSettings } from './provider-settings'

const checkpointDate = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'UTC'
})

const ConnectedBackendSettings = ({
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
  const isAdmin = session?.user?.roles?.includes('admin') ?? false
  if (!api) return null
  const runAction = (work: Promise<unknown>) => {
    setBusy(true)
    setError(null)
    void work
      .catch(failure =>
        setError(
          failure instanceof Error
            ? failure.message
            : 'Unable to complete this action.'
        )
      )
      .finally(() => setBusy(false))
  }
  const updatePlugin = (name: string, enabled: boolean) => {
    runAction(
      api
        .setPlugin(name, enabled)
        .then(setPlugins)
        .catch(async () => {
          try {
            setPlugins(await api.plugins())
          } catch {
            /* vx-bot/NOTE: Preserve the mutation failure if reconciliation is unavailable. */
          }
          throw new Error(
            'Unable to confirm the plugin change. Reopen settings to refresh its status before retrying.'
          )
        })
    )
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
                    runAction(
                      api.conversations(query).then(page => {
                        setResults(page.items)
                        setCursor(page.nextCursor ?? '')
                      })
                    )
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
                      runAction(
                        api.conversations(query, cursor).then(page => {
                          setResults(current => [...current, ...page.items])
                          setCursor(page.nextCursor ?? '')
                        })
                      )
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
                        runAction(
                          api.rename(chatId, title).then(item => {
                            chat.acceptConversation(item)
                            setTitle('')
                          })
                        )
                      }>
                      Rename
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      isDisabled={busy || chat.isStreaming}
                      onPress={() =>
                        runAction(
                          api
                            .checkpoint(chatId, 'Saved checkpoint')
                            .then(() => api.checkpoints(chatId))
                            .then(setCheckpoints)
                        )
                      }>
                      Save checkpoint
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      isDisabled={busy || chat.isStreaming}
                      onPress={() =>
                        runAction(
                          api.compact(chatId).then(chat.acceptConversation)
                        )
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
                        {checkpointDate.format(new Date(item.createdAt))} UTC
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        isDisabled={busy || chat.isStreaming}
                        onPress={() =>
                          runAction(
                            api
                              .restore(chatId, item.id)
                              .then(chat.acceptConversation)
                          )
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
                    runAction(
                      api
                        .remember(fact)
                        .then(() => {
                          setFact('')
                          return api.memory()
                        })
                        .then(setMemory)
                    )
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
                        runAction(
                          api
                            .forget(item.id)
                            .then(() => api.memory())
                            .then(setMemory)
                        )
                      }>
                      Forget
                    </Button>
                  </div>
                ))}
              </section>
              <BackendPlugins
                plugins={plugins}
                isDisabled={busy || !isAdmin}
                onUpdate={updatePlugin}
              />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export const BackendSettings = ({
  chat
}: {
  chat: TamizhiChatProps['chat']
}) =>
  chat.api ? (
    <ConnectedBackendSettings chat={chat} />
  ) : (
    <Modal>
      <Button size="sm" variant="ghost">
        AI settings
      </Button>
      <Modal.Backdrop>
        <Modal.Container size="sm">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Tamizhi settings</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="flex flex-col gap-3">
              <p className="text-sm font-medium">Local demo</p>
              <p className="text-muted text-sm">
                Connect this app to the Tamizhi service to sign in and manage AI
                providers. Your demo conversations remain available.
              </p>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
