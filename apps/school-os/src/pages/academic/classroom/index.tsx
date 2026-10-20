import { ClassDrawer } from './components/drawer/class-drawer'
import { ClassroomToast } from './components/feedback/classroom-toast'
import { ClassroomTable } from './components/table/classroom-table'
import { ClassroomToolbar } from './components/toolbar/classroom-toolbar'
import { useClassroomPage } from './hooks/use-classroom-page'
import { classNames } from './variants'

const AllClassesPage = () => {
  const page = useClassroomPage()

  return (
    <section className={classNames.page}>
      <ClassroomToolbar {...page.toolbar} />
      <ClassroomTable {...page.table} />
      <ClassDrawer {...page.drawerProps} />
      {page.toast && (
        <ClassroomToast toast={page.toast} onClose={page.onToastClose} />
      )}
    </section>
  )
}

export default AllClassesPage
