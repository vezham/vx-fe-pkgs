import { TimetableCalendar } from './components/calendar/timetable-calendar'
import { TimetableDrawer } from './components/drawer/timetable-drawer'
import { TimetableToolbar } from './components/toolbar/timetable-toolbar'
import { useTimetablePage } from './hooks/use-timetable-page'
import { classNames } from './variants'

const TimeTablePage = () => {
  const page = useTimetablePage()

  return (
    <section className={classNames.page}>
      <TimetableToolbar {...page.toolbar} />
      <TimetableCalendar {...page.calendar} />
      <TimetableDrawer {...page.drawerProps} />
    </section>
  )
}

export default TimeTablePage
