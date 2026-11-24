// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CalendarDateTime } from '@internationalized/date'
import { useCallback, useEffect, useMemo, useState } from 'react'

import type { AgendaEventType } from '@vezham/react-pro-v3'
import { Agenda, useAgenda } from '@vezham/react-pro-v3'

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia(query)
    const listener = (e: MediaQueryListEvent | MediaQueryList) =>
      setMatches(e.matches)

    listener(mql)
    mql.addEventListener('change', listener)

    return () => mql.removeEventListener('change', listener)
  }, [query])

  return matches
}

function dt(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute = 0
) {
  // `day` can run past either end of the month, so it's added rather than set.
  return new CalendarDateTime(year, month, 1, hour, minute).add({
    days: day - 1
  })
}

function generateEvents(): AgendaEventType[] {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth() + 1
  const d = now.getDate()

  return [
    {
      color: '#10b981',
      end: dt(y, m, d + 2, 23, 59),
      id: 'allday-1',
      isAllDay: true,
      start: dt(y, m, d, 0),
      title: 'Company Holiday'
    },
    {
      color: '#3b82f6',
      end: dt(y, m, d, 23, 59),
      id: 'allday-2',
      isAllDay: true,
      start: dt(y, m, d, 0),
      title: 'Team Offsite'
    },
    {
      end: dt(y, m, d, 9, 30),
      id: '1',
      start: dt(y, m, d, 9, 0),
      title: 'Team Standup'
    },
    {
      color: '#d946ef',
      end: dt(y, m, d, 13, 0),
      id: '2',
      start: dt(y, m, d, 12, 0),
      title: 'Lunch'
    },
    {
      color: '#3b82f6',
      end: dt(y, m, d, 15, 30),
      id: '3',
      start: dt(y, m, d, 14, 0),
      title: 'Design Review'
    },
    {
      color: '#10b981',
      end: dt(y, m, d, 16, 30),
      id: '4',
      start: dt(y, m, d, 16, 0),
      title: '1:1 with Manager'
    },
    {
      color: '#f59e0b',
      end: dt(y, m, d, 10, 0),
      id: '5',
      start: dt(y, m, d, 9, 0),
      title: 'Product Sync'
    },
    {
      color: '#8b5cf6',
      end: dt(y, m, d, 10, 15),
      id: '6',
      start: dt(y, m, d, 9, 15),
      title: 'Eng Huddle'
    },
    {
      color: '#ef4444',
      end: dt(y, m, d, 15, 30),
      id: '7',
      start: dt(y, m, d, 14, 30),
      title: 'Client Call'
    },
    {
      color: '#06b6d4',
      end: dt(y, m, d, 14, 20),
      id: '8',
      start: dt(y, m, d, 14, 0),
      title: 'Quick Check-in'
    },
    {
      color: '#84cc16',
      end: dt(y, m, d, 15, 0),
      id: '9',
      start: dt(y, m, d, 14, 40),
      title: 'Wrap-up Notes'
    },
    {
      color: '#f59e0b',
      end: dt(y, m, d - 1, 11, 30),
      id: '10',
      start: dt(y, m, d - 1, 10, 0),
      title: 'Sprint Planning'
    },
    {
      color: '#8b5cf6',
      end: dt(y, m, d + 3, 16, 0),
      id: '11',
      start: dt(y, m, d + 3, 15, 0),
      title: 'Retro'
    },
    {
      color: '#ef4444',
      end: dt(y, m, d + 9, 16, 30),
      id: '12',
      start: dt(y, m, d + 9, 16, 0),
      title: '1:1 with Manager'
    },
    {
      color: '#10b981',
      end: dt(y, m, d + 13, 23, 59),
      id: '13',
      isAllDay: true,
      start: dt(y, m, d + 13, 0),
      title: 'Holiday'
    },
    {
      color: '#10b981',
      end: dt(y, m, d + 2, 12, 0),
      id: '14',
      start: dt(y, m, d + 2, 11, 0),
      title: 'Code Review'
    },
    {
      color: '#3b82f6',
      end: dt(y, m, d + 8, 10, 30),
      id: '15',
      start: dt(y, m, d + 8, 9, 0),
      title: 'Board Meeting'
    },
    {
      color: '#3b82f6',
      end: dt(y, m, d, 11, 15),
      id: '16',
      start: dt(y, m, d, 10, 15),
      status: 'unconfirmed' as const,
      title: 'Planning'
    },
    {
      color: '#6b7280',
      end: dt(y, m, d + 1, 10, 0),
      id: '17',
      isReadOnly: true,
      start: dt(y, m, d + 1, 9, 0),
      title: 'Company All-Hands'
    },
    {
      color: '#f59e0b',
      end: dt(y, m, d + 1, 14, 0),
      id: '18',
      start: dt(y, m, d + 1, 13, 0),
      status: 'unconfirmed' as const,
      title: 'Vendor Demo'
    }
  ]
}

let nextId = 100

const EVENT_COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#d946ef',
  '#8b5cf6',
  '#ef4444',
  '#06b6d4'
]

export function Default() {
  const initialEvents = useMemo(() => generateEvents(), [])
  const [events, setEvents] = useState<AgendaEventType[]>(initialEvents)
  const isMobile = useMediaQuery('(max-width: 639px)')

  const handleCreate = useCallback(
    (newEvent: { start: CalendarDateTime; end: CalendarDateTime }) => {
      const id = String(nextId++)
      const color = EVENT_COLORS[nextId % EVENT_COLORS.length]

      setEvents(prev => [
        ...prev,
        {
          color,
          end: newEvent.end,
          id,
          start: newEvent.start,
          title: 'New Event'
        }
      ])
    },
    []
  )

  const handleMove = useCallback(
    (id: string, start: CalendarDateTime, end: CalendarDateTime) => {
      setEvents(prev => prev.map(e => (e.id === id ? { ...e, end, start } : e)))
    },
    []
  )

  const handleResize = useCallback(
    (id: string, start: CalendarDateTime, end: CalendarDateTime) => {
      setEvents(prev => prev.map(e => (e.id === id ? { ...e, end, start } : e)))
    },
    []
  )

  const handleDelete = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id))
  }, [])

  const agenda = useAgenda({
    defaultView: 'week',
    events,
    onEventCreate: isMobile ? undefined : handleCreate,
    onEventDelete: handleDelete,
    onEventMove: isMobile ? undefined : handleMove,
    onEventResize: isMobile ? undefined : handleResize,
    slotDuration: 15,
    weekDays: isMobile ? 3 : 7
  })

  return (
    <div
      // className="border-border overflow-hidden rounded-2xl border"
      style={{ height: 600, width: '100%' }}>
      <Agenda {...agenda}>
        <Agenda.Header>
          <Agenda.Heading />
          <Agenda.ViewSelector />
          <Agenda.Navigation>
            <Agenda.NavButton slot="previous" />
            <Agenda.TodayButton />
            <Agenda.NavButton slot="next" />
          </Agenda.Navigation>
        </Agenda.Header>
        <Agenda.Body>
          {agenda.view !== 'month' ? (
            <>
              <Agenda.WeekHeader />
              <Agenda.AllDaySection>
                <Agenda.AllDayLabel>all-day</Agenda.AllDayLabel>
                {agenda.allDayLayout.map(item => (
                  <Agenda.AllDayEvent
                    key={item.event.id}
                    colSpan={item.colSpan}
                    colStart={item.colStart}
                    event={item.event}
                    row={item.row}
                  />
                ))}
              </Agenda.AllDaySection>
              <Agenda.TimeGrid>
                <Agenda.CurrentTimeIndicator />
                <>
                  {agenda.visibleDays.map(day => (
                    <Agenda.DayColumn key={day.toString()} date={day}>
                      {agenda.getEventsForDay(day).map(event => (
                        <Agenda.Event key={event.id} event={event} />
                      ))}
                    </Agenda.DayColumn>
                  ))}
                </>
              </Agenda.TimeGrid>
            </>
          ) : (
            <Agenda.MonthGrid>
              {agenda.visibleWeeks.map((week, i) => {
                const rowLayout = agenda.getMonthRowLayout(week)

                return (
                  <Agenda.MonthRow
                    key={i}
                    spanningRowCount={rowLayout.rowCount}>
                    {rowLayout.items.map(item => (
                      <Agenda.MonthSpanningEvent
                        key={item.event.id}
                        colSpan={item.colSpan}
                        colStart={item.colStart}
                        event={item.event}
                        row={item.row}
                      />
                    ))}
                    {week.map((day, colIdx) => (
                      <Agenda.MonthCell
                        key={day.toString()}
                        date={day}
                        maxEvents={isMobile ? 1 : 2}
                        spanningRowCount={
                          rowLayout.rowCountPerCol[colIdx] ?? 0
                        }>
                        {agenda.getPerCellEvents(day, week).map(event => (
                          <Agenda.MonthEvent key={event.id} event={event} />
                        ))}
                      </Agenda.MonthCell>
                    ))}
                  </Agenda.MonthRow>
                )
              })}
            </Agenda.MonthGrid>
          )}
        </Agenda.Body>
      </Agenda>
    </div>
  )
}
