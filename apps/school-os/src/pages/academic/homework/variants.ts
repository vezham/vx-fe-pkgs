import { createAcademicVariants } from '@pages/academic/shared/variants'

export const { classNames, getTableRowClassName } = createAcademicVariants({
  tableContent: 'min-w-[1240px]',
  createdByCell: 'flex items-center gap-3',
  createdByText: 'min-w-0',
  createdByName: 'truncate font-medium text-[#111827]',
  createdBySecondary: 'text-muted truncate text-sm'
})
