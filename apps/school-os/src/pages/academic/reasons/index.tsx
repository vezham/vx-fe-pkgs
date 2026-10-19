import { ClassDrawer } from './components/drawer/class-drawer'
import { ReasonsToast } from './components/feedback/reasons-toast'
import { ReasonsTable } from './components/table/reasons-table'
import { ReasonsToolbar } from './components/toolbar/reasons-toolbar'
import { useReasonsPage } from './hooks/use-reasons-page'
import { classNames } from './variants'

const AllClassesPage = () => {
  const page = useReasonsPage()

  return (
    <section className={classNames.page}>
      <ReasonsToolbar {...page.toolbar} />
      <ReasonsTable {...page.table} />
      <ClassDrawer {...page.drawerProps} />
      {page.toast && (
        <ReasonsToast toast={page.toast} onClose={page.onToastClose} />
      )}
    </section>
  )
}

export default AllClassesPage
