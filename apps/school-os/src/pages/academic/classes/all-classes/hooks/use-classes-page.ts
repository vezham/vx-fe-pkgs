import type {
  AllClassesColumnKey,
  ClassFormErrors,
  ClassRow,
  FilterDraft
} from '@pages/academic/classes/all-classes/types'
import {
  createNextClassId,
  rowToForm,
  validateClassForm
} from '@pages/academic/classes/all-classes/utils/classes'
import { createEntityRoute } from '@pages/academic/shared/entity-route'
import {
  createEntityRowMutations,
  createEntitySortLabel
} from '@pages/academic/shared/entity-utils'
import { sortRows } from '@pages/academic/shared/sort'
import { useAcademicEntityPage } from '@pages/academic/shared/use-academic-entity-page'
import type { AcademicEntityPageConfig } from '@pages/academic/shared/use-academic-entity-page'
import {
  ClassFormState,
  allClassesColumnOptions,
  emptyForm,
  initialRows,
  sortOptions
} from '@store/useAcademic/useAllClasses'

const toFields = (form: ClassFormState) => ({
  className: form.className.trim(),
  section: form.section.trim(),
  students: Number(form.students),
  subjects: Number(form.subjects),
  status: form.status
})

const config: AcademicEntityPageConfig<
  ClassRow,
  ClassFormState,
  ClassFormErrors,
  FilterDraft,
  AllClassesColumnKey
> = {
  columnKeys: allClassesColumnOptions.map(column => column.key),
  clearActiveRowOnClose: true,
  clearSelectionOnClose: true,
  pageKey: 'allclasses',
  emptyFilters: { className: null, section: null, status: null },
  emptyForm,
  filterKeys: ['className', 'section', 'status'],
  getSortLabel: createEntitySortLabel(sortOptions, allClassesColumnOptions),
  ...createEntityRowMutations(createNextClassId, toFields),
  navigateAcrossPages: true,
  removeFromSelectionOnDelete: true,
  rowToForm,
  route: createEntityRoute('/academic/classes/allclasses'),
  searchKeys: ['id', 'className', 'section', 'status'],
  selectAllVisible: true,
  sortRows,
  syncSelectionFromUrl: true,
  validateForm: validateClassForm
}

export const useClassesPage = () => useAcademicEntityPage(config, initialRows)
