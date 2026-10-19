import { createAcademicVariants } from '@pages/academic/shared/variants'

export const { classNames, getTableRowClassName } = createAcademicVariants({
  toolbarActions: 'flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end'
})
