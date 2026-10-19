import { createAcademicVariants } from '@pages/academic/shared/variants'

export const { classNames, getTableRowClassName } = createAcademicVariants({
  toolbarActions: 'flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end',
  tableContent: 'min-w-[1120px]',
  drawerDialog:
    'flex h-full w-full max-w-[960px] flex-col bg-black/5 backdrop-blur-2xl',
  scheduleTopGrid: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
  scheduleRows: 'space-y-5 border-t border-[#e8edf6] pt-5',
  scheduleRow:
    'grid items-end gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_52px]',
  scheduleDeleteButton: 'text-danger bg-danger/10 hover:bg-danger/15'
})
