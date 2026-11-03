import { useEffect, useState } from 'react'

import { Button, Dropdown, Input, Label, TextField } from '@vezham/react-v3'
import type { TamizhiAPIClient } from '@vezham/tamizhi-client'
import type { TamizhiAPI } from '@vezham/tamizhi-contracts'

export const ProviderSettings = ({
  api,
  onChange
}: {
  api: TamizhiAPIClient
  onChange: () => Promise<void>
}) => {
  const [providers, setProviders] = useState<TamizhiAPI.ProviderSettings[]>([])
  const [selected, setSelected] = useState('openai')
  const [apiKey, setAPIKey] = useState('')
  const [projectId, setProjectId] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  useEffect(() => {
    const controller = new AbortController()
    void api
      .providers(controller.signal)
      .then(setProviders)
      .catch(() => {
        if (!controller.signal.aborted)
          setError('Sign in to manage your provider keys.')
      })
    return () => controller.abort()
  }, [api])
  const provider = providers.find(item => item.id === selected)
  const connect = async () => {
    if (!apiKey.trim() || busy) return
    setBusy(true)
    setError(null)
    setNotice(null)
    try {
      const saved = await api.connectProvider(selected, apiKey)
      setAPIKey('')
      setProviders(current =>
        current.map(item => (item.id === saved.id ? saved : item))
      )
      setNotice(
        `${saved.name} connected. ${saved.models.length} chat models available.`
      )
      try {
        await onChange()
      } catch {
        setError(
          'Connection saved, but the model list could not refresh. Refresh status to try again.'
        )
      }
    } catch (failure) {
      setError(
        failure instanceof Error
          ? `${failure.message} Refresh status before retrying if the connection was interrupted.`
          : 'Unable to confirm the provider connection. Refresh status before retrying.'
      )
    } finally {
      setBusy(false)
    }
  }
  const connectAccount = async () => {
    if (!provider || busy) return
    setBusy(true)
    setError(null)
    try {
      const authorization = await api.authorizeProvider(
        provider.id,
        projectId.trim(),
        window.location.href
      )
      setAPIKey('')
      window.location.assign(authorization.url)
    } catch {
      setError(
        'Unable to start account connection. Check the project ID and try again.'
      )
      setBusy(false)
    }
  }
  const remove = async () => {
    setBusy(true)
    setError(null)
    setNotice(null)
    try {
      await api.removeProvider(selected)
      setAPIKey('')
      setProviders(current =>
        current.map(item =>
          item.id === selected
            ? {
                ...item,
                connected: false,
                models: [],
                authMethod: undefined,
                projectId: undefined,
                transcriptionModel: undefined,
                speechModel: undefined
              }
            : item
        )
      )
      setNotice('Provider connection removed.')
      try {
        await Promise.all([api.providers().then(setProviders), onChange()])
      } catch {
        setError(
          'Connection removed, but its status could not refresh. Refresh status to try again.'
        )
      }
    } catch {
      setError('Unable to confirm removal. Refresh status before retrying.')
    } finally {
      setBusy(false)
    }
  }
  const refresh = async () => {
    if (busy) return
    setBusy(true)
    setError(null)
    try {
      await Promise.all([api.providers().then(setProviders), onChange()])
    } catch {
      setError(
        'Unable to refresh connection status. Try again when the connection is available.'
      )
    } finally {
      setBusy(false)
    }
  }
  return (
    <section className="flex flex-col gap-3" aria-label="AI provider keys">
      <h3 className="font-medium">AI providers</h3>
      <p className="text-muted text-xs">
        Connect a supported account or add your API key. Credentials are
        encrypted on the backend and are never saved in browser storage.
      </p>
      <Dropdown>
        <Button
          variant="secondary"
          size="sm"
          aria-label="Choose AI provider"
          isDisabled={busy}>
          {provider?.name ?? 'Choose provider'}
        </Button>
        <Dropdown.Popover>
          <Dropdown.Menu
            aria-label="AI providers"
            selectionMode="single"
            selectedKeys={[selected]}
            onAction={id => {
              setSelected(String(id))
              setAPIKey('')
              setProjectId(
                providers.find(item => item.id === String(id))?.projectId ?? ''
              )
              setError(null)
              setNotice(null)
            }}>
            {providers.map(item => (
              <Dropdown.Item key={item.id} id={item.id} textValue={item.name}>
                {item.name}
                {item.connected ? ' · Connected' : ''}
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
      {provider?.oauthAvailable && (
        <div className="flex flex-col items-start gap-2">
          <TextField
            value={projectId}
            onChange={setProjectId}
            isDisabled={busy}>
            <Label>Google Cloud project ID</Label>
            <Input
              placeholder="my-google-project"
              maxLength={30}
              autoComplete="off"
            />
          </TextField>
          <p className="text-muted text-xs">
            This project's Gemini API quota and billing apply. Enable the
            Generative Language API and use a project you are authorized to
            access.
          </p>
          <Button
            size="sm"
            variant="primary"
            isDisabled={!projectId.trim()}
            isPending={busy}
            onPress={() => void connectAccount()}>
            Connect Google account
          </Button>
        </div>
      )}
      <TextField value={apiKey} onChange={setAPIKey} isDisabled={busy}>
        <Label>{provider?.connected ? 'Replace API key' : 'API key'}</Label>
        <Input
          type="password"
          autoComplete="off"
          spellCheck={false}
          maxLength={8192}
          placeholder="Enter your provider API key"
        />
      </TextField>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="primary"
          isPending={busy}
          isDisabled={!apiKey.trim() || !provider}
          onPress={() => void connect()}>
          Test & save key
        </Button>
        {provider?.connected && (
          <Button
            size="sm"
            variant="danger-soft"
            isDisabled={busy}
            onPress={() => void remove()}>
            Disconnect
          </Button>
        )}
      </div>
      {provider?.connected && (
        <p className="text-muted text-xs">
          {provider.authMethod === 'oauth'
            ? `Google account · ${provider.projectId} · `
            : ''}
          {provider.models.length} chat models
          {provider.transcriptionModel
            ? ` · Voice input: ${provider.transcriptionModel}`
            : ''}
          {provider.speechModel ? ` · Speech: ${provider.speechModel}` : ''}
        </p>
      )}
      {error && (
        <Button
          size="sm"
          variant="secondary"
          isDisabled={busy}
          onPress={() => void refresh()}>
          Refresh status
        </Button>
      )}
      {error && (
        <p role="alert" className="text-danger text-xs">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="text-success text-xs">
          {notice}
        </p>
      )}
    </section>
  )
}
