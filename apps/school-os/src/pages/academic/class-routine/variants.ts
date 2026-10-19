import { createAcademicVariants } from '@pages/academic/shared/variants'

export const { classNames, getTableRowClassName } = createAcademicVariants({
  toolbarActions: 'flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end',
  tableContent: 'min-w-[1240px]',
  tableRow: 'cursor-pointer transition-colors hover:bg-primary/5',
  tableRowActive:
    '!bg-primary/10 !ring-1 !ring-inset !ring-primary/20 !shadow-[inset_0_0_0_1px_rgba(59,130,246,0.10)]',
  fieldLabel: 'font-semibold text-[#111827]'
})
