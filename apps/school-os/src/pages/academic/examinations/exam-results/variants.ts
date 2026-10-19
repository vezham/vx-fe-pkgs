import { createAcademicVariants } from '@pages/academic/shared/variants'

export const { classNames, getTableRowClassName } = createAcademicVariants({
  toolbarActions: 'flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end',
  tableContent: 'min-w-[1560px]',
  studentNameCell: 'flex items-center gap-3',
  studentNameAvatar: 'shrink-0',
  studentNameText: 'min-w-0',
  studentNamePrimary: 'truncate font-semibold text-[#111827]',
  studentNameSecondary: 'text-muted truncate text-sm'
})
