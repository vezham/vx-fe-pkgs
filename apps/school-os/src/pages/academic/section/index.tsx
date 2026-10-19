import { ClassDrawer } from './components/drawer/class-drawer'
import { SectionToast } from './components/feedback/section-toast'
import { SectionTable } from './components/table/section-table'
import { SectionToolbar } from './components/toolbar/section-toolbar'
import { useSectionPage } from './hooks/use-section-page'
import { classNames } from './variants'

const AllClassesPage = () => {
  const page = useSectionPage()

  return (
    <section className={classNames.page}>
      <SectionToolbar {...page.toolbar} />
      <SectionTable {...page.table} />
      <ClassDrawer {...page.drawerProps} />
      {page.toast && (
        <SectionToast toast={page.toast} onClose={page.onToastClose} />
      )}
    </section>
  )
}

export default AllClassesPage
