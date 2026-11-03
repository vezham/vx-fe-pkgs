import { Button, Switch } from '@vezham/react-v3'
import type { TamizhiAPI } from '@vezham/tamizhi-contracts'

interface Props {
  plugins: TamizhiAPI.PluginInfo[]
  isDisabled: boolean
  onUpdate: (name: string, enabled: boolean) => void
}

export const BackendPlugins = ({ plugins, isDisabled, onUpdate }: Props) => (
  <section className="flex flex-col gap-3">
    <h3 className="font-medium">Plugins</h3>
    {plugins.map(plugin => (
      <div key={plugin.name} className="flex items-center gap-2">
        <Switch
          isSelected={plugin.enabled}
          isDisabled={isDisabled}
          onChange={enabled => onUpdate(plugin.name, enabled)}>
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <span className="flex flex-col text-sm">
              <span>{plugin.name}</span>
              <span className="text-muted text-xs">
                {plugin.kind} · {plugin.required ? 'Required' : 'Optional'} ·{' '}
                {plugin.status}
              </span>
              {plugin.error && (
                <span className="text-danger text-xs" role="alert">
                  {plugin.error}
                </span>
              )}
            </span>
          </Switch.Content>
        </Switch>
        {plugin.enabled && plugin.status === 'failed' && (
          <Button
            size="sm"
            variant="secondary"
            isDisabled={isDisabled}
            onPress={() => onUpdate(plugin.name, true)}
            aria-label={`Retry ${plugin.name}`}>
            Retry
          </Button>
        )}
      </div>
    ))}
  </section>
)
