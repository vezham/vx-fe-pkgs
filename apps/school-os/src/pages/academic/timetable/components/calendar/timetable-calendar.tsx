import { Agenda } from '@vezham/react-pro-v3'
import { Surface } from '@vezham/react-v3'

import type {
  TimetableAgendaEvent,
  TimetableCalendarProps
} from '@pages/academic/timetable/types'
import { classNames } from '@pages/academic/timetable/variants'

import {
  AgendaAllDayEventContent,
  AgendaEventContent,
  AgendaMonthEventContent
} from './agenda-event-content'

export const TimetableCalendar = ({
  agenda,
  agendaEvents
}: TimetableCalendarProps) => {
  return (
    <Surface className={classNames.calendarShell}>
      {agendaEvents.length === 0 ? (
        <div className={classNames.emptyState}>
          No timetable events available
        </div>
      ) : (
        <div
          className={classNames.agendaWrapper}
          data-timetable-agenda
          style={{ height: 600, width: '100%' }}>
          <Agenda {...agenda} className={classNames.agenda}>
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
                        row={item.row}>
                        <AgendaAllDayEventContent
                          event={item.event as TimetableAgendaEvent}
                        />
                      </Agenda.AllDayEvent>
                    ))}
                  </Agenda.AllDaySection>
                  <Agenda.TimeGrid>
                    <Agenda.CurrentTimeIndicator />
                    {agenda.visibleDays.map(day => (
                      <Agenda.DayColumn key={day.toString()} date={day}>
                        {agenda.getEventsForDay(day).map(event => (
                          <Agenda.Event key={event.id} event={event}>
                            <AgendaEventContent
                              event={event as TimetableAgendaEvent}
                            />
                          </Agenda.Event>
                        ))}
                      </Agenda.DayColumn>
                    ))}
                  </Agenda.TimeGrid>
                </>
              ) : (
                <Agenda.MonthGrid>
                  {agenda.visibleWeeks.map(week => {
                    const rowLayout = agenda.getMonthRowLayout(week)

                    return (
                      <Agenda.MonthRow
                        key={week.map(day => day.toString()).join(':')}
                        spanningRowCount={rowLayout.rowCount}>
                        {rowLayout.items.map(item => (
                          <Agenda.MonthSpanningEvent
                            key={item.event.id}
                            colSpan={item.colSpan}
                            colStart={item.colStart}
                            event={item.event}
                            row={item.row}>
                            <AgendaAllDayEventContent
                              event={item.event as TimetableAgendaEvent}
                            />
                          </Agenda.MonthSpanningEvent>
                        ))}
                        {week.map((day, columnIndex) => (
                          <Agenda.MonthCell
                            key={day.toString()}
                            date={day}
                            maxEvents={2}
                            spanningRowCount={
                              rowLayout.rowCountPerCol[columnIndex] ?? 0
                            }>
                            {agenda.getPerCellEvents(day, week).map(event => (
                              <Agenda.MonthEvent key={event.id} event={event}>
                                <AgendaMonthEventContent
                                  event={event as TimetableAgendaEvent}
                                />
                              </Agenda.MonthEvent>
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
      )}
    </Surface>
  )
}
