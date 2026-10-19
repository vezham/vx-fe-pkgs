import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow,
  FilterDraft,
  SectionColumnKey
} from '@pages/academic/section/types'
import {
  createNextClassId,
  rowToForm,
  validateClassForm
} from '@pages/academic/section/utils/section'
import { createEntityRoute } from '@pages/academic/shared/entity-route'
import {
  createEntityRowMutations,
  createEntitySortLabel
} from '@pages/academic/shared/entity-utils'
import { useAcademicEntityPage } from '@pages/academic/shared/use-academic-entity-page'
import type { AcademicEntityPageConfig } from '@pages/academic/shared/use-academic-entity-page'
import {
  emptyForm,
  sectionColumnOptions,
  sortOptions,
  useSection
} from '@store/useAcademic/useSection'

const toFields = (form: ClassFormState) => ({
  section: form.section.trim(),
  status: form.status
})

const config: AcademicEntityPageConfig<
  ClassRow,
  ClassFormState,
  ClassFormErrors,
  FilterDraft,
  SectionColumnKey
> = {
  columnKeys: sectionColumnOptions.map(column => column.key),
  clearActiveRowOnClose: false,
  pageKey: 'section',
  emptyFilters: { section: null, status: null },
  emptyForm,
  filterKeys: ['section', 'status'],
  getSortLabel: createEntitySortLabel(sortOptions, sectionColumnOptions),
  ...createEntityRowMutations(createNextClassId, toFields),
  removeFromSelectionOnDelete: true,
  rowToForm,
  route: createEntityRoute('/academic/section'),
  searchKeys: ['id', 'section', 'status'],
  selectAllVisible: true,
  validateForm: validateClassForm
}

export const useSectionPage = () => {
  const query = useSection.list({})
  return useAcademicEntityPage(config, query.data)
}
