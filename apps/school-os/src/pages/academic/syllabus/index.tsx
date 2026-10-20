import { ClassDrawer } from './components/drawer/class-drawer'
import { RoutineToast } from './components/feedback/routine-toast'
import { SyllabusTable } from './components/table/syllabus-table'
import { SyllabusToolbar } from './components/toolbar/syllabus-toolbar'
import { useSyllabusPage } from './hooks/use-syllabus-page'
import { classNames } from './variants'

const AllClassesPage = () => {
  const page = useSyllabusPage()

  return (
    <section className={classNames.page}>
      <SyllabusToolbar {...page.toolbar} />
      <SyllabusTable {...page.table} />
      <ClassDrawer {...page.drawerProps} />
      {page.toast && (
        <RoutineToast toast={page.toast} onClose={page.onToastClose} />
      )}
    </section>
  )
}

export default AllClassesPage
