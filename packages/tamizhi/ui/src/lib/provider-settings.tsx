import {
  Button,
  Dropdown,
  Input,
  Label,
  Switch,
  TextField
} from '@vezham/react-v3'
import type { TamizhiAPIClient } from '@vezham/tamizhi-client'
import type { TamizhiAPI } from '@vezham/tamizhi-contracts'

import { useProviderSettings } from './use-provider-settings'

const ProviderAccountConnection = ({
  projectId,
  setProjectId,
  busy,
  connectAccount
}: Pick<
  ReturnType<typeof useProviderSettings>,
  'projectId' | 'setProjectId' | 'busy' | 'connectAccount'
>) => (
  <div className="flex flex-col items-start gap-2">
    <TextField value={projectId} onChange={setProjectId} isDisabled={busy}>
      <Label>Google Cloud project ID</Label>
      <Input
        placeholder="my-google-project"
        maxLength={30}
        autoComplete="off"
      />
    </TextField>
    <p className="text-muted text-xs">
      This project's Gemini API quota and billing apply. Enable the Generative
      Language API and use a project you are authorized to access.
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
)

const ProviderSearchSettings = ({
  provider,
  busy,
  updateSearch
}: Pick<ReturnType<typeof useProviderSettings>, 'busy' | 'updateSearch'> & {
  provider: TamizhiAPI.ProviderSettings
}) => (
  <div className="flex flex-col gap-2">
    <Switch
      aria-label="Leo web search"
      isSelected={provider.searchEnabled ?? false}
      isDisabled={busy || !provider.connected}
      onChange={enabled => void updateSearch(enabled)}>
      <Switch.Content className="flex w-full flex-row-reverse items-center justify-between gap-3">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        Leo web search
      </Switch.Content>
    </Switch>
    <p className="text-muted text-xs">
      Search with your DeepSeek key. Leo reads source pages directly and does
      not call a language model or DeepSeek Fetch.{' '}
      <a
        className="underline"
        href="https://api-docs.deepseek.com/quick_start/pricing/"
        target="_blank"
        rel="noopener noreferrer">
        Search API pricing
      </a>
    </p>
    {!provider.connected && (
      <p className="text-muted text-xs">
        Connect your key first. Web search stays off until you enable it.
      </p>
    )}
  </div>
)

const ProviderModelSummary = ({
  provider
}: {
  provider: TamizhiAPI.ProviderSettings
}) => (
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
)

export const ProviderSettings = ({
  api,
  onChange
}: {
  api: TamizhiAPIClient
  onChange: () => Promise<void>
}) => {
  const {
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
  } = useProviderSettings(api, onChange)
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
            onAction={id => selectProvider(String(id))}>
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
        <ProviderAccountConnection
          projectId={projectId}
          setProjectId={setProjectId}
          busy={busy}
          connectAccount={connectAccount}
        />
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
      {provider?.id === 'deepseek' && (
        <ProviderSearchSettings
          provider={provider}
          busy={busy}
          updateSearch={updateSearch}
        />
      )}
      {provider?.connected && <ProviderModelSummary provider={provider} />}
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
