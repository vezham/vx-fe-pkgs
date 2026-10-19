import { ExamResultsDrawer } from './components/drawer/exam-results-drawer'
import { ExamResultsToast } from './components/feedback/exam-results-toast'
import { ExamResultsTable } from './components/table/exam-results-table'
import { ExamResultsToolbar } from './components/toolbar/exam-results-toolbar'
import { useExamResultsPage } from './hooks/use-exam-results-page'
import { classNames } from './variants'

const ExamResultsPage = () => {
  const page = useExamResultsPage()

  return (
    <section className={classNames.page}>
      <ExamResultsToolbar {...page.toolbar} />
      <ExamResultsTable {...page.table} />
      <ExamResultsDrawer {...page.drawerProps} />
      {page.toast && (
        <ExamResultsToast toast={page.toast} onClose={page.onToastClose} />
      )}
    </section>
  )
}

export default ExamResultsPage
