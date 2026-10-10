import { ClassDrawer } from './components/drawer/class-drawer'
import { RoutineToast } from './components/feedback/routine-toast'
import { GradesTable } from './components/table/grades-table'
import { GradesToolbar } from './components/toolbar/grades-toolbar'
import { useGradesPage } from './hooks/use-grades-page'
import { classNames } from './variants'

const AllClassesPage = () => {
  const page = useGradesPage()

  return (
    <section className={classNames.page}>
      <GradesToolbar {...page.toolbar} />
      <GradesTable {...page.table} />
      <ClassDrawer {...page.drawerProps} />
      {page.toast && (
        <RoutineToast toast={page.toast} onClose={page.onToastClose} />
      )}
    </section>
  )
}

export default AllClassesPage
