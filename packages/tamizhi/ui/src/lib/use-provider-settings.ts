import { useEffect, useState } from 'react'

import type { TamizhiAPIClient } from '@vezham/tamizhi-client'
import type { TamizhiAPI } from '@vezham/tamizhi-contracts'

export const useProviderSettings = (
  api: TamizhiAPIClient,
  onChange: () => Promise<void>
) => {
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
                searchEnabled: false,
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
  const updateSearch = async (enabled: boolean) => {
    if (busy || !provider?.connected) return
    setBusy(true)
    setError(null)
    setNotice(null)
    try {
      const saved = await api.setProviderSearch(provider.id, enabled)
      setProviders(current =>
        current.map(item => (item.id === saved.id ? saved : item))
      )
      setNotice(
        enabled
          ? 'Leo web search enabled. DeepSeek search charges apply.'
          : 'Leo web search disabled.'
      )
    } catch {
      setError(
        'Unable to confirm the search setting. Refresh status before retrying.'
      )
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
  const selectProvider = (id: string) => {
    setSelected(id)
    setAPIKey('')
    setProjectId(providers.find(item => item.id === id)?.projectId ?? '')
    setError(null)
    setNotice(null)
  }
  return {
    providers,
    selected,
    provider,
    apiKey,
    setAPIKey,
    projectId,
    setProjectId,
    busy,
    error,
    notice,
    connect,
    connectAccount,
    remove,
    updateSearch,
    refresh,
    selectProvider
  }
}
