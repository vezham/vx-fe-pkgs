import { ClassDrawer } from './components/drawer/class-drawer'
import { ClassToast } from './components/feedback/class-toast'
import { ClassesTable } from './components/table/classes-table'
import { ClassesToolbar } from './components/toolbar/classes-toolbar'
import { useClassesPage } from './hooks/use-classes-page'
import { classNames } from './variants'

const AllClassesPage = () => {
  const page = useClassesPage()

  return (
    <section className={classNames.page}>
      <ClassesToolbar {...page.toolbar} />
      <ClassesTable {...page.table} />
      <ClassDrawer {...page.drawerProps} />
      {page.toast && (
        <ClassToast toast={page.toast} onClose={page.onToastClose} />
      )}
    </section>
  )
}

export default AllClassesPage
