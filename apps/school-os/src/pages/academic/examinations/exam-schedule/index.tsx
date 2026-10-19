import { ScheduleDrawer } from './components/drawer/schedule-drawer'
import { ScheduleToast } from './components/feedback/schedule-toast'
import { ExamScheduleTable } from './components/table/exam-schedule-table'
import { ExamScheduleToolbar } from './components/toolbar/exam-schedule-toolbar'
import { useExamSchedulePage } from './hooks/use-exam-schedule-page'
import { classNames } from './variants'

const ExamSchedulePage = () => {
  const page = useExamSchedulePage()

  return (
    <section className={classNames.page}>
      <ExamScheduleToolbar {...page.toolbar} />
      <ExamScheduleTable {...page.table} />
      <ScheduleDrawer {...page.drawerProps} />
      {page.toast && (
        <ScheduleToast toast={page.toast} onClose={page.onToastClose} />
      )}
    </section>
  )
}

export default ExamSchedulePage
