import { ExamDrawer } from './components/drawer/exam-drawer'
import { ExamToast } from './components/feedback/exam-toast'
import { ExamTable } from './components/table/exam-table'
import { ExamToolbar } from './components/toolbar/exam-toolbar'
import { useExamPage } from './hooks/use-exam-page'
import { classNames } from './variants'

const AllClassesPage = () => {
  const page = useExamPage()

  return (
    <section className={classNames.page}>
      <ExamToolbar {...page.toolbar} />
      <ExamTable {...page.table} />
      <ExamDrawer {...page.drawerProps} />
      {page.toast && (
        <ExamToast toast={page.toast} onClose={page.onToastClose} />
      )}
    </section>
  )
}

export default AllClassesPage
