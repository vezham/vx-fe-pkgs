import { ClassDrawer } from './components/drawer/class-drawer'
import { RoutineToast } from './components/feedback/routine-toast'
import { SubjectTable } from './components/table/subject-table'
import { SubjectToolbar } from './components/toolbar/subject-toolbar'
import { useSubjectPage } from './hooks/use-subject-page'
import { classNames } from './variants'

const AllClassesPage = () => {
  const page = useSubjectPage()

  return (
    <section className={classNames.page}>
      <SubjectToolbar {...page.toolbar} />
      <SubjectTable {...page.table} />
      <ClassDrawer {...page.drawerProps} />
      {page.toast && (
        <RoutineToast toast={page.toast} onClose={page.onToastClose} />
      )}
    </section>
  )
}

export default AllClassesPage
