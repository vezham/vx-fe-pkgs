import { ClassDrawer } from './components/drawer/class-drawer'
import { ScheduleToast } from './components/feedback/schedule-toast'
import { ScheduleTable } from './components/table/schedule-table'
import { ScheduleToolbar } from './components/toolbar/schedule-toolbar'
import { useSchedulePage } from './hooks/use-schedule-page'
import { classNames } from './variants'

const AllClassesPage = () => {
  const page = useSchedulePage()

  return (
    <section className={classNames.page}>
      <ScheduleToolbar {...page.toolbar} />
      <ScheduleTable {...page.table} />
      <ClassDrawer {...page.drawerProps} />
      {page.toast && (
        <ScheduleToast toast={page.toast} onClose={page.onToastClose} />
      )}
    </section>
  )
}

export default AllClassesPage
