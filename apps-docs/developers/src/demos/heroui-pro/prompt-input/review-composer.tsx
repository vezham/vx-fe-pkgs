// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ArrowUp,
  ArrowUpRight,
  BranchesRight,
  ChevronDown,
  ChevronRight,
  Display,
  Ellipsis,
  Microphone,
  Plus
} from '@gravity-ui/icons'
import type { CSSProperties } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { HoverCard, PromptInput } from '@vezham/react-pro-v3'
import type { Key } from '@vezham/react-v3'
import {
  Button,
  Input,
  ListBox,
  Popover,
  ProgressCircle,
  Select,
  Separator,
  Switch,
  listboxItemVariants,
  listboxVariants
} from '@vezham/react-v3'

const REVIEW_MODELS = [
  {
    contextWindow: '200k context window',
    description:
      'Balanced model for quick code review follow-ups and everyday implementation work.',
    id: 'composer-2.5',
    meta: 'Fast',
    name: 'Composer 2.5',
    note: 'Fast responses tuned for short iteration loops.',
    title: 'Composer 2.5 (fast)',
    version: 'balanced reasoning effort'
  },
  {
    contextWindow: '1M context window',
    description:
      'Deep reasoning model for large codebases, architecture changes, and careful reviews.',
    id: 'opus-4.8',
    meta: '1M High',
    name: 'Opus 4.8',
    note: 'Best when quality matters more than speed.',
    title: 'Opus 4.8',
    version: 'high reasoning effort'
  },
  {
    contextWindow: '1M context window',
    description:
      'General intelligence model with strong planning and implementation range.',
    id: 'gpt-5.5',
    meta: '1M High',
    name: 'GPT-5.5',
    note: 'Use for broad product work that mixes code, writing, and analysis.',
    title: 'GPT-5.5',
    version: 'high reasoning effort'
  },
  {
    contextWindow: '1M context window',
    description:
      'Steady reasoning model for long conversations and nuanced implementation tradeoffs.',
    id: 'sonnet-4.6',
    meta: '1M Medium',
    name: 'Sonnet 4.6',
    note: 'A balanced pick for sustained pair-programming sessions.',
    title: 'Sonnet 4.6',
    version: 'medium reasoning effort'
  },
  {
    contextWindow: '272k context window',
    description:
      "OpenAI's model specifically for coding. Good for ambitious coding tasks.",
    id: 'codex-5.3',
    meta: 'High Fast',
    name: 'Codex 5.3',
    note: "The same Codex 5.3 model, using OpenAI's fast priority processing at 2x the price.",
    title: 'Codex 5.3 (fast)',
    version: 'high reasoning effort'
  },
  {
    contextWindow: '1M context window',
    description:
      'Reliable advanced model for complex code generation and careful refactors.',
    id: 'opus-4.6',
    meta: '1M High',
    name: 'Opus 4.6',
    note: 'Good for multi-file work where context retention is the priority.',
    title: 'Opus 4.6',
    version: 'high reasoning effort'
  },
  {
    contextWindow: '1M context window',
    description:
      'Fast multimodal reasoning model with strong analysis and synthesis skills.',
    id: 'gemini-3.1-pro',
    meta: '',
    name: 'Gemini 3.1 Pro',
    note: 'Useful when exploring alternatives or comparing implementation approaches.',
    title: 'Gemini 3.1 Pro',
    version: 'pro reasoning effort'
  }
] as const

type ReviewModelId = (typeof REVIEW_MODELS)[number]['id']
type ReviewModel = (typeof REVIEW_MODELS)[number]

const REVIEW_MODEL_IDS = new Set<ReviewModelId>(
  REVIEW_MODELS.map(model => model.id)
)
const PINNABLE_ACTIONS = [
  'agent-browser',
  'ai-sdk',
  'automate',
  'babysit',
  'canvas'
] as const
const ADD_MODEL_ACTIONS = [
  'Browse Marketplace',
  'Connect Provider',
  'Import API Key'
] as const
const REVIEW_MODEL_MODES = [
  { id: 'auto', label: 'Auto', meta: 'Efficiency' },
  { id: 'premium', label: 'Premium', meta: 'Intelligence' }
] as const
const REVIEW_LISTBOX_CLASSNAME = `${listboxVariants()} p-2`
const REVIEW_LISTBOX_ITEM_CLASSNAME = listboxItemVariants().item()
const MODEL_TRIGGER_CLASSNAME =
  'text-foreground hover:bg-default-hover data-[hovered=true]:bg-default-hover h-8 max-w-[180px] min-w-0 items-center gap-1 rounded-full border-0 bg-transparent px-2 text-sm font-normal shadow-none transition-colors'
const POPOVER_MAX_WIDTH = 320
const REVIEW_BUTTON_STYLE = {
  '--button-bg': 'var(--background)',
  '--button-bg-hover': 'var(--default-hover)',
  '--button-bg-pressed': 'var(--default-hover)',
  '--button-fg': 'var(--foreground)'
} as CSSProperties

function isReviewModelId(key: Key | null): key is ReviewModelId {
  return typeof key === 'string' && REVIEW_MODEL_IDS.has(key as ReviewModelId)
}

function ReviewModelText({ model }: { model: ReviewModel }) {
  return (
    <span className="flex min-w-0 items-center gap-1">
      <span className="truncate font-normal">{model.name}</span>
      {model.meta ? (
        <span className="text-muted shrink-0 font-normal">{model.meta}</span>
      ) : null}
    </span>
  )
}

function ReviewModelDetails({ model }: { model: ReviewModel }) {
  return (
    <div className="w-full p-1 text-sm">
      <div className="text-foreground text-base font-semibold sm:text-lg">
        {model.title}
      </div>
      <p className="text-foreground mt-2 leading-relaxed">
        {model.description}
      </p>
      <p className="text-foreground mt-6">{model.contextWindow}</p>
      <p className="text-warning mt-6 leading-relaxed">{model.note}</p>
      <p className="text-foreground mt-6 italic">Version: {model.version}</p>
    </div>
  )
}

interface ReviewModelOptionProps {
  detailsPlacement: 'left' | 'right'
  model: ReviewModel
}

function ReviewModelOption({
  detailsPlacement,
  model
}: ReviewModelOptionProps) {
  const hasEditAction = model.id === 'codex-5.3'

  return (
    <HoverCard closeDelay={100} openDelay={250}>
      <HoverCard.Trigger className="min-w-0 flex-1 items-center justify-between gap-4">
        <ReviewModelText model={model} />
        {hasEditAction ? (
          <span className="text-muted hidden shrink-0 font-normal group-hover/model:block group-data-[focused=true]/model:block">
            Edit
          </span>
        ) : null}
      </HoverCard.Trigger>
      <HoverCard.Content
        className="scrollbar max-h-[min(440px,calc(100vh-2rem))] w-[min(360px,calc(100vw-2rem))] overflow-y-auto p-4"
        containerPadding={16}
        offset={12}
        placement={detailsPlacement}>
        <ReviewModelDetails model={model} />
      </HoverCard.Content>
    </HoverCard>
  )
}

interface ReviewModelSelectProps {
  className?: string
  detailsPlacement?: 'left' | 'right'
  model: ReviewModel
  popoverPlacement?: 'bottom end' | 'bottom start'
  selectedKey: ReviewModelId
  triggerClassName?: string
  onSelectionChange: (key: ReviewModelId) => void
}

function ReviewModelSelect({
  className,
  detailsPlacement = 'right',
  model,
  onSelectionChange,
  popoverPlacement = 'bottom start',
  selectedKey,
  triggerClassName
}: ReviewModelSelectProps) {
  const [isMaxMode, setIsMaxMode] = useState(true)
  const [modelPopoverWidth, setModelPopoverWidth] = useState<number>()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const updateModelPopoverWidth = useCallback(() => {
    if (typeof window === 'undefined') return

    const trigger = triggerRef.current

    if (!trigger) return

    const { left, right } = trigger.getBoundingClientRect()
    const availableWidth =
      popoverPlacement === 'bottom end'
        ? right - 16
        : window.innerWidth - left - 16

    setModelPopoverWidth(
      Math.max(220, Math.min(POPOVER_MAX_WIDTH, availableWidth))
    )
  }, [popoverPlacement])

  useEffect(() => {
    window.addEventListener('resize', updateModelPopoverWidth)

    return () => window.removeEventListener('resize', updateModelPopoverWidth)
  }, [updateModelPopoverWidth])

  return (
    <Select
      aria-label="Model"
      className={className}
      value={selectedKey}
      onChange={key => {
        if (isReviewModelId(key)) onSelectionChange(key)
      }}>
      <Select.Trigger
        ref={triggerRef}
        className={triggerClassName}
        onFocus={updateModelPopoverWidth}
        onPointerDown={updateModelPopoverWidth}>
        <Select.Value className="min-w-0 flex-1 overflow-hidden">
          <ReviewModelText model={model} />
        </Select.Value>
        <Select.Indicator className="text-muted static my-0 size-4 shrink-0">
          <ChevronDown />
        </Select.Indicator>
      </Select.Trigger>
      <Select.Popover
        className="scrollbar max-h-[min(560px,calc(100vh-2rem))] max-w-[calc(100vw-2rem)] overflow-x-hidden overflow-y-auto rounded-2xl p-0"
        containerPadding={16}
        placement={popoverPlacement}
        style={{ width: modelPopoverWidth }}>
        <div className="flex flex-col gap-1 p-2">
          <Input
            fullWidth
            aria-label="Search models"
            className="h-9 w-full border-0 bg-transparent px-2 text-sm shadow-none"
            placeholder="Search models"
            variant="secondary"
          />
          <div className="flex h-10 items-center justify-between gap-4 px-2 text-sm">
            <span>MAX Mode</span>
            <Switch
              aria-label="MAX Mode"
              isSelected={isMaxMode}
              onChange={setIsMaxMode}>
              {({ isSelected }) => (
                <Switch.Content>
                  <Switch.Control
                    className={isSelected ? '!bg-success' : undefined}>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch.Content>
              )}
            </Switch>
          </div>
        </div>
        <Separator />
        <ul aria-label="Model modes" className={REVIEW_LISTBOX_CLASSNAME}>
          {REVIEW_MODEL_MODES.map(mode => (
            <li key={mode.id} className={REVIEW_LISTBOX_ITEM_CLASSNAME}>
              <span className="text-sm" data-slot="label">
                <span className="font-medium">{mode.label}</span>
                <span className="text-muted ml-1 font-normal">{mode.meta}</span>
              </span>
            </li>
          ))}
        </ul>
        <Separator />
        <ListBox className="p-2">
          {REVIEW_MODELS.map(option => (
            <ListBox.Item
              key={option.id}
              className="group/model"
              id={option.id}
              textValue={`${option.name} ${option.meta}`}>
              <ReviewModelOption
                detailsPlacement={detailsPlacement}
                model={option}
              />
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
        <Separator />
        <HoverCard closeDelay={100} openDelay={120}>
          <HoverCard.Trigger className="text-muted hover:bg-default-hover data-[hovered=true]:bg-default-hover flex h-11 w-full cursor-default items-center justify-between gap-3 rounded-b-2xl px-4 text-left text-sm transition-colors outline-none">
            <span>Add Models</span>
            <ChevronRight className="size-4 shrink-0 rtl:-scale-x-100" />
          </HoverCard.Trigger>
          <HoverCard.Content
            className="w-[220px] overflow-hidden rounded-2xl p-0"
            containerPadding={16}
            offset={8}
            placement="right bottom">
            <ul aria-label="Add models" className={REVIEW_LISTBOX_CLASSNAME}>
              {ADD_MODEL_ACTIONS.map(action => (
                <li key={action} className={REVIEW_LISTBOX_ITEM_CLASSNAME}>
                  <span className="text-sm" data-slot="label">
                    {action}
                  </span>
                </li>
              ))}
            </ul>
          </HoverCard.Content>
        </HoverCard>
      </Select.Popover>
    </Select>
  )
}

function ActionsToPinPopover() {
  const [search, setSearch] = useState('')
  const normalizedSearch = search.trim().toLowerCase()
  const filteredActions = PINNABLE_ACTIONS.filter(action =>
    action.toLowerCase().includes(normalizedSearch)
  )

  return (
    <Popover>
      <Popover.Trigger>
        <Button
          isIconOnly
          aria-label="More actions"
          size="sm"
          style={REVIEW_BUTTON_STYLE}
          variant="outline">
          <Ellipsis className="size-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content
        className="w-[min(320px,calc(100vw-2rem))] overflow-hidden rounded-2xl p-0"
        containerPadding={16}
        offset={8}
        placement="bottom end">
        <Popover.Dialog className="p-0">
          <div className="p-2">
            <Input
              autoFocus
              fullWidth
              aria-label="Search actions to pin"
              className="h-9 w-full border-0 bg-transparent px-2 text-sm shadow-none"
              placeholder="Search Actions to Pin"
              value={search}
              variant="secondary"
              onChange={event => setSearch(event.target.value)}
            />
          </div>
          <Separator />
          {filteredActions.length > 0 ? (
            <ListBox
              aria-label="Actions to pin"
              className="scrollbar max-h-[min(440px,calc(100vh-9rem))] overflow-y-auto p-2">
              {filteredActions.map(action => (
                <ListBox.Item key={action} id={action} textValue={action}>
                  {action}
                </ListBox.Item>
              ))}
            </ListBox>
          ) : (
            <div className="text-muted flex h-24 items-center px-5 text-sm">
              No actions found
            </div>
          )}
          <Separator />
          <Button
            fullWidth
            className="text-foreground h-12 justify-between gap-3 rounded-t-none rounded-b-2xl px-4 text-left text-sm font-medium"
            variant="ghost">
            <span>Browse Marketplace</span>
            <ArrowUpRight className="text-muted size-4 shrink-0" />
          </Button>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}

export function ReviewComposer() {
  const [value, setValue] = useState('')
  const [modelId, setModelId] = useState<ReviewModelId>('composer-2.5')
  const hasValue = value.trim().length > 0
  const selectedModel =
    REVIEW_MODELS.find(model => model.id === modelId) ?? REVIEW_MODELS[0]

  const handleSubmit = () => {
    setValue('')
  }

  return (
    <div className="flex w-full max-w-[800px] min-w-0 flex-col gap-3 p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-1.5">
        <Button size="sm" style={REVIEW_BUTTON_STYLE} variant="outline">
          <span>Review</span>
          <span className="text-success-soft-foreground font-semibold">
            +469
          </span>
          <span className="text-danger-soft-foreground font-semibold">-34</span>
        </Button>
        <Button
          className="hidden sm:inline-flex"
          size="sm"
          style={REVIEW_BUTTON_STYLE}
          variant="outline">
          <span className="truncate">Create Branch &amp; Commit</span>
        </Button>
        <ActionsToPinPopover />
      </div>

      <PromptInput
        className="group max-w-full min-w-0 overflow-hidden"
        layout="compact"
        value={value}
        onSubmit={handleSubmit}
        onValueChange={setValue}>
        <PromptInput.Shell>
          <PromptInput.Content>
            <PromptInput.TextArea
              className="min-w-0"
              placeholder="Send follow-up"
            />
          </PromptInput.Content>
          <PromptInput.Toolbar className="group-data-[expanded=true]:justify-start group-data-[expanded=true]:gap-1.5 sm:group-data-[expanded=true]:justify-between">
            <PromptInput.ToolbarStart>
              <PromptInput.Action
                aria-label="Add context"
                className="bg-default text-muted hover:bg-default-hover"
                tooltip="Add context">
                <Plus className="size-4" />
              </PromptInput.Action>
              <ReviewModelSelect
                className="hidden w-auto min-w-0 min-[420px]:group-data-[expanded=true]:!block"
                detailsPlacement="right"
                model={selectedModel}
                selectedKey={modelId}
                triggerClassName={MODEL_TRIGGER_CLASSNAME}
                onSelectionChange={setModelId}
              />
            </PromptInput.ToolbarStart>
            <PromptInput.ToolbarEnd className="flex min-w-0 gap-1.5 group-data-[expanded=true]:!flex">
              <ReviewModelSelect
                className="hidden w-auto min-w-0 group-data-[expanded=true]:!hidden sm:block"
                detailsPlacement="left"
                model={selectedModel}
                popoverPlacement="bottom end"
                selectedKey={modelId}
                triggerClassName={MODEL_TRIGGER_CLASSNAME}
                onSelectionChange={setModelId}
              />
              {hasValue ? (
                <>
                  <PromptInput.Action
                    aria-label="Voice input"
                    className="text-muted hover:bg-default-hover bg-transparent"
                    tooltip="Voice input">
                    <Microphone className="size-4" />
                  </PromptInput.Action>
                  <PromptInput.Send className="bg-foreground text-background hover:bg-foreground/90">
                    <ArrowUp className="size-4" />
                  </PromptInput.Send>
                </>
              ) : (
                <PromptInput.Action
                  aria-label="Voice input"
                  className="bg-foreground text-background hover:bg-foreground/90"
                  tooltip="Voice input">
                  <Microphone className="size-4" />
                </PromptInput.Action>
              )}
            </PromptInput.ToolbarEnd>
          </PromptInput.Toolbar>
        </PromptInput.Shell>
      </PromptInput>

      <div className="text-muted flex items-center justify-between gap-3 px-2 text-xs sm:px-4 sm:text-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="flex items-center gap-1.5">
            <BranchesRight className="size-4" />
            develop
          </span>
          <span className="flex items-center gap-1.5">
            <Display className="size-4" />
            Local
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ProgressCircle
            aria-label="Task progress"
            color="default"
            size="sm"
            value={32}>
            <ProgressCircle.Track>
              <ProgressCircle.TrackCircle />
              <ProgressCircle.FillCircle />
            </ProgressCircle.Track>
          </ProgressCircle>
          <span className="tabular-nums">32%</span>
        </div>
      </div>
    </div>
  )
}
