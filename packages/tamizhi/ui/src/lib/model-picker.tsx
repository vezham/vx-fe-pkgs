import { useRef, useState } from 'react'

import { AltArrowDown, Bolt, CheckRead, Stars } from '@vezham/icons-react'
import { Dropdown } from '@vezham/react-v3'
import {
  Button,
  Popover,
  Switch,
  Tooltip,
  useMediaQuery
} from '@vezham/react-v3'
import type { ModelInfo } from '@vezham/tamizhi-contracts'

import { ModelLogo } from './model-logo'
import { LEO_MODEL_ID, PREVIEW_MODELS, type PreviewModel } from './models'

const ModelFeatures = ({ model }: { model: PreviewModel }) => (
  <div className="w-64 max-w-[calc(100vw-2rem)] p-2 text-xs">
    <p className="font-semibold">{model.name}</p>
    <p className="text-muted mt-2">{model.description}</p>
    <dl className="border-separator mt-3 flex flex-col gap-2 border-t pt-3">
      {['Complex tasks', 'Generative UI', 'Speed', 'Cost'].map(
        (label, index) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <dt className="text-muted">{label}</dt>
            <dd
              aria-label={`${model.ratings[index]} of 3`}
              className="flex gap-1">
              {[1, 2, 3].map(level => (
                <span
                  key={level}
                  aria-hidden="true"
                  className={`h-1.5 w-4 rounded-full ${level <= model.ratings[index] ? 'bg-foreground' : 'bg-muted/25'}`}
                />
              ))}
            </dd>
          </div>
        )
      )}
    </dl>
    <p className="text-muted mt-3 text-xs">{model.context}</p>
  </div>
)

const LocalModelPicker = ({
  model: selectedModel,
  onModelChange
}: {
  model: string
  onModelChange: (model: string) => void
}) => {
  const [open, setOpen] = useState(false)
  const smallScreen = useMediaQuery('(width < 640px)')
  const manualModel = useRef(PREVIEW_MODELS[0].name)
  const auto = selectedModel === 'Auto'
  const selectedDetails = PREVIEW_MODELS.find(
    item => item.name === selectedModel
  )
  const tooltip = auto
    ? 'Automatically choose a model based on task complexity.'
    : (selectedDetails?.description ?? 'Choose an AI model.')
  return (
    <Popover isOpen={open} onOpenChange={setOpen}>
      <Button
        type="button"
        aria-label="AI model"
        variant="ghost"
        size="sm"
        className="min-w-0 gap-1 px-2">
        {auto ? (
          <Stars size={16} className="shrink-0" aria-hidden="true" />
        ) : (
          <ModelLogo
            provider={
              PREVIEW_MODELS.find(item => item.name === selectedModel)
                ?.provider ?? 'GPT'
            }
          />
        )}
        <span title={tooltip} className="max-w-16 truncate text-xs">
          {selectedModel}
        </span>
        <AltArrowDown size={12} className="shrink-0" aria-hidden="true" />
      </Button>
      <Popover.Content
        placement="top end"
        className="w-72 max-w-[calc(100vw-2rem)]">
        <Popover.Dialog aria-label="Choose AI model" className="p-2">
          <Switch
            aria-label="Auto model selection"
            isSelected={auto}
            onChange={enabled => {
              if (!auto) manualModel.current = selectedModel
              onModelChange(enabled ? 'Auto' : manualModel.current)
            }}
            className="bg-surface-secondary w-full rounded-2xl p-3">
            <Switch.Content className="flex w-full flex-row-reverse items-center justify-between gap-3">
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <span className="text-xs font-medium">Auto</span>
            </Switch.Content>
          </Switch>
          {auto ? (
            <p className="text-muted px-2 pt-3 pb-2 text-xs">
              Balances and switches between models based on each task’s
              complexity. Recommended.
            </p>
          ) : (
            <div
              aria-label="Available models"
              className="mt-2 flex max-h-[min(24rem,50dvh)] flex-col gap-1 overflow-y-auto overscroll-contain">
              {PREVIEW_MODELS.map(model => (
                <Tooltip key={model.name} delay={150} isDisabled={smallScreen}>
                  <Button
                    aria-label={`Select ${model.name}`}
                    variant="ghost"
                    className={`w-full shrink-0 justify-start gap-2 px-3 text-xs ${selectedModel === model.name ? 'bg-surface-secondary' : ''}`}
                    aria-pressed={selectedModel === model.name}
                    onPress={() => {
                      onModelChange(model.name)
                      manualModel.current = model.name
                      setOpen(false)
                    }}>
                    <ModelLogo provider={model.provider} size={16} />
                    <span className="min-w-0 flex-1 truncate text-start">
                      {model.name}
                    </span>
                    {selectedModel === model.name && (
                      <CheckRead size={16} aria-hidden="true" />
                    )}
                  </Button>
                  <Tooltip.Content
                    placement="right"
                    className="bg-surface border-border rounded-2xl border shadow-xl">
                    <ModelFeatures model={model} />
                  </Tooltip.Content>
                </Tooltip>
              ))}
            </div>
          )}
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}

export const FastModeToggle = ({
  isFastMode,
  onFastModeChange
}: {
  isFastMode: boolean
  onFastModeChange: (isFastMode: boolean) => void
}) => (
  <Tooltip delay={150}>
    <Button
      type="button"
      aria-label="Fast mode"
      aria-pressed={isFastMode}
      isIconOnly
      size="sm"
      variant="ghost"
      className={isFastMode ? 'text-accent bg-accent/10' : 'text-muted'}
      onPress={() => onFastModeChange(!isFastMode)}>
      <Bolt size={18} aria-hidden="true" />
    </Button>
    <Tooltip.Content>
      {isFastMode ? 'Fast mode on' : 'Fast mode off'}
    </Tooltip.Content>
  </Tooltip>
)

export const ModelPicker = (props: {
  model: string
  onModelChange: (model: string) => void
  catalog?: ModelInfo[]
}) =>
  props.catalog ? (
    <Dropdown>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        aria-label="AI model"
        isDisabled={props.catalog.length === 0}
        className="min-w-0 flex-row flex-nowrap gap-1 px-2">
        <Stars size={16} aria-hidden="true" />
        <span className="max-w-28 truncate text-xs">
          {props.catalog.length === 0
            ? 'No model'
            : (props.catalog.find(item => item.id === props.model)?.name ??
              props.model)}
        </span>
        <AltArrowDown size={12} aria-hidden="true" />
      </Button>
      <Dropdown.Popover placement="top end" className="w-64">
        <Dropdown.Menu
          aria-label="Available AI models"
          selectionMode="single"
          selectedKeys={[props.model]}
          onAction={key => props.onModelChange(String(key))}>
          {!props.catalog.some(item => item.id === LEO_MODEL_ID) && (
            <Dropdown.Item id="Auto" textValue="Auto">
              Auto
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
          )}
          {props.catalog.map(item => (
            <Dropdown.Item key={item.id} id={item.id} textValue={item.name}>
              <span className="flex min-w-0 flex-1 flex-col">
                <span>{item.name}</span>
                <span className="text-muted text-xs">
                  {item.id === LEO_MODEL_ID
                    ? 'Vezham · Connected tools and workflows'
                    : item.provider}
                </span>
              </span>
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  ) : (
    <LocalModelPicker {...props} />
  )
