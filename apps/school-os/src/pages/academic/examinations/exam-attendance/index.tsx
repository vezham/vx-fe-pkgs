import { AttendanceDrawer } from './components/drawer/attendance-drawer'
import { AttendanceToast } from './components/feedback/attendance-toast'
import { ExamAttendanceTable } from './components/table/exam-attendance-table'
import { ExamAttendanceToolbar } from './components/toolbar/exam-attendance-toolbar'
import { useExamAttendancePage } from './hooks/use-exam-attendance-page'
import { classNames } from './variants'

const ExamAttendancePage = () => {
  const page = useExamAttendancePage()

  return (
    <section className={classNames.page}>
      <ExamAttendanceToolbar {...page.toolbar} />
      <ExamAttendanceTable {...page.table} />
      <AttendanceDrawer {...page.drawerProps} />
      {page.toast && (
        <AttendanceToast toast={page.toast} onClose={page.onToastClose} />
      )}
    </section>
  )
}

export default ExamAttendancePage
