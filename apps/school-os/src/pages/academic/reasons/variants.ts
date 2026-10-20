import { createAcademicVariants } from '@pages/academic/shared/variants'

export const { classNames, getTableRowClassName } = createAcademicVariants({
  headerRow:
    'flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between',
  toolbarActions: 'flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end'
})
