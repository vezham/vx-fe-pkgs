import {
  CalendarDate,
  ClipboardList,
  ClockCircle,
  Moon,
  NotebookBookmark,
  Sun
} from '@vezham/icons-react'
import { Surface, tv } from '@vezham/react-v3'

import { useTileEditor } from '../control-center/editor'

export const widgetSizes = ['small', 'medium', 'large'] as const
export type WidgetSize = (typeof widgetSizes)[number]

export const notificationCenterWidgetVariants = tv({
  slots: {
    container: '@container mx-auto w-full max-w-[252px]',
    grid: 'grid auto-rows-[calc((100cqw-1rem)/2)] grid-cols-2 gap-4 pb-4',
    tile: 'min-w-0',
    preview: 'aspect-square',
    galleryPreview:
      '@container mx-auto min-h-0 w-full max-w-[260px] flex-1 overflow-y-auto p-1',
    gallerySuggestion: 'shrink-0'
  },
  variants: {
    size: {
      small: {
        gallerySuggestion: 'w-[7.375rem]',
        preview: 'aspect-square'
      },
      medium: {
        tile: 'col-span-2',
        gallerySuggestion: 'w-[15.75rem] max-w-full',
        preview: 'aspect-[2/1]'
      },
      large: {
        tile: 'col-span-2 row-span-2',
        gallerySuggestion: 'w-[15.75rem] max-w-full',
        preview: 'aspect-square'
      }
    }
  }
})

export type WidgetTileDefinition = {
  id: string
  label: string
  description: string
  category: string
  size: WidgetSize
}

const widgetDefinitions = [
  {
    id: 'calendar-month',
    label: 'Calendar',
    description: 'See your upcoming events.',
    category: 'Calendar',
    size: 'small'
  },
  {
    id: 'world-clock',
    label: 'World Clock',
    description: 'Check the time in New Delhi.',
    category: 'Clock',
    size: 'small'
  },
  {
    id: 'weather-forecast',
    label: 'Weather',
    description: 'View the current forecast.',
    category: 'Weather',
    size: 'medium'
  },
  {
    id: 'reminders-list',
    label: 'Reminders',
    description: 'Keep track of today’s tasks.',
    category: 'Reminders',
    size: 'medium'
  },
  {
    id: 'notes-summary',
    label: 'Notes',
    description: 'View your latest notes.',
    category: 'Notes',
    size: 'medium'
  },
  {
    id: 'focus-status',
    label: 'Focus',
    description: 'See your current Focus status.',
    category: 'Focus',
    size: 'small'
  },
  {
    id: 'daily-summary',
    label: 'Daily Summary',
    description: 'Review your day at a glance.',
    category: 'Calendar',
    size: 'large'
  }
] satisfies readonly WidgetTileDefinition[]

const widgetStyles = notificationCenterWidgetVariants()

export const getWidgetSize = (
  tile: WidgetTileDefinition & { span?: string }
): WidgetSize =>
  widgetSizes.includes(tile.span as WidgetSize)
    ? (tile.span as WidgetSize)
    : tile.size

const WidgetPreviewContent = ({ id }: Pick<WidgetTileDefinition, 'id'>) => {
  switch (id) {
    case 'calendar-month':
      return (
        <>
          <CalendarDate aria-hidden="true" className="text-accent size-5" />
          <span className="mt-2 text-xs font-semibold">October</span>
          <span className="text-muted text-xl font-semibold tabular-nums">
            18
          </span>
        </>
      )
    case 'world-clock':
      return (
        <>
          <ClockCircle aria-hidden="true" className="text-accent size-5" />
          <span className="mt-auto text-xl font-semibold tabular-nums">
            10:09
          </span>
          <span className="text-muted text-xs">New Delhi</span>
        </>
      )
    case 'weather-forecast':
      return (
        <>
          <div className="flex min-w-0 items-center justify-between gap-2">
            <span className="min-w-0 truncate text-sm font-semibold">
              New Delhi
            </span>
            <Sun aria-hidden="true" className="text-warning size-5 shrink-0" />
          </div>
          <div className="mt-auto flex items-end justify-between">
            <span className="text-3xl font-semibold tabular-nums">25°</span>
            <span className="text-muted text-xs">Clear</span>
          </div>
        </>
      )
    case 'reminders-list':
      return (
        <>
          <div className="flex min-w-0 items-center gap-2">
            <ClipboardList
              aria-hidden="true"
              className="text-accent size-5 shrink-0"
            />
            <span className="min-w-0 truncate text-sm font-semibold">
              Reminders
            </span>
          </div>
          <span className="text-muted mt-auto text-xs">No reminders today</span>
        </>
      )
    case 'notes-summary':
      return (
        <>
          <div className="flex min-w-0 items-center gap-2">
            <NotebookBookmark
              aria-hidden="true"
              className="text-warning size-5 shrink-0"
            />
            <span className="min-w-0 truncate text-sm font-semibold">
              Notes
            </span>
          </div>
          <span className="text-muted mt-auto text-xs">No recent notes</span>
        </>
      )
    case 'focus-status':
      return (
        <>
          <Moon aria-hidden="true" className="text-accent size-5" />
          <span className="mt-auto text-sm font-semibold">Focus</span>
          <span className="text-muted text-xs">Off</span>
        </>
      )
    default:
      return (
        <>
          <CalendarDate aria-hidden="true" className="text-accent size-5" />
          <span className="mt-auto text-sm font-semibold">Today</span>
          <span className="text-muted text-xs">No events scheduled</span>
        </>
      )
  }
}

export const WidgetPreview = ({
  tile,
  className = ''
}: {
  tile: WidgetTileDefinition & { span?: string }
  className?: string
}) => {
  const size = getWidgetSize(tile)
  return (
    <Surface
      variant="transparent"
      data-widget-size={size}
      aria-label={tile.label}
      className={`bg-surface-secondary flex min-w-0 flex-col rounded-2xl p-3 shadow-sm ${widgetStyles.tile({ size })} ${widgetStyles.preview({ size })} ${className}`}>
      <WidgetPreviewContent id={tile.id} />
    </Surface>
  )
}

export const useWidgetTiles = () =>
  useTileEditor(widgetDefinitions, 'vx:widgets')

export const WidgetTiles = () => {
  const { visibleTiles } = useWidgetTiles()
  return (
    <div className={widgetStyles.container()}>
      <div className={widgetStyles.grid()}>
        {visibleTiles.map(tile => (
          <WidgetPreview key={tile.id} tile={tile} className="h-full" />
        ))}
      </div>
    </div>
  )
}
