import { ClassDrawer } from './components/drawer/class-drawer'
import { HomeworkToast } from './components/feedback/homework-toast'
import { HomeworkTable } from './components/table/homework-table'
import { HomeworkToolbar } from './components/toolbar/homework-toolbar'
import { useHomeworkPage } from './hooks/use-homework-page'
import { classNames } from './variants'

const AllClassesPage = () => {
  const page = useHomeworkPage()

  return (
    <section className={classNames.page}>
      <HomeworkToolbar {...page.toolbar} />
      <HomeworkTable {...page.table} />
      <ClassDrawer {...page.drawerProps} />
      {page.toast && (
        <HomeworkToast toast={page.toast} onClose={page.onToastClose} />
      )}
    </section>
  )
}

export default AllClassesPage
