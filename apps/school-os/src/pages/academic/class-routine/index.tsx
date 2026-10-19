import { ClassDrawer } from './components/drawer/class-drawer'
import { RoutineToast } from './components/feedback/routine-toast'
import { ClassRoutineTable } from './components/table/class-routine-table'
import { ClassRoutineToolbar } from './components/toolbar/class-routine-toolbar'
import { useClassRoutinePage } from './hooks/use-class-routine-page'
import { classNames } from './variants'

const AllClassesPage = () => {
  const page = useClassRoutinePage()

  return (
    <section className={classNames.page}>
      <ClassRoutineToolbar {...page.toolbar} />
      <ClassRoutineTable {...page.table} />
      <ClassDrawer {...page.drawerProps} />
      {page.toast && (
        <RoutineToast toast={page.toast} onClose={page.onToastClose} />
      )}
    </section>
  )
}

export default AllClassesPage
