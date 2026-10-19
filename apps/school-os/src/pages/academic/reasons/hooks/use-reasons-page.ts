import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow,
  FilterDraft
} from '@pages/academic/reasons/types'
import {
  createNextClassId,
  rowToForm,
  validateClassForm
} from '@pages/academic/reasons/utils/reasons'
import { createEntityRoute } from '@pages/academic/shared/entity-route'
import {
  createEntityRowMutations,
  createEntitySortLabel
} from '@pages/academic/shared/entity-utils'
import { useAcademicEntityPage } from '@pages/academic/shared/use-academic-entity-page'
import type { AcademicEntityPageConfig } from '@pages/academic/shared/use-academic-entity-page'
import {
  emptyForm,
  reasonsColumnOptions,
  sortOptions,
  useReasons
} from '@store/useAcademic/useReasons'

const toFields = (form: ClassFormState) => ({
  role: form.role.trim(),
  reasons: form.reasons.trim(),
  status: form.status
})

const config: AcademicEntityPageConfig<
  ClassRow,
  ClassFormState,
  ClassFormErrors,
  FilterDraft
> = {
  columnKeys: reasonsColumnOptions.map(column => column.key),
  pageKey: 'reasons',
  emptyFilters: { role: null, reasons: null, status: null },
  emptyForm,
  filterKeys: ['role', 'reasons', 'status'],
  getSortLabel: createEntitySortLabel(sortOptions, reasonsColumnOptions),
  ...createEntityRowMutations(createNextClassId, toFields),
  rowToForm,
  route: createEntityRoute('/academic/reasons'),
  searchKeys: ['id', 'role', 'reasons', 'status'],
  validateForm: validateClassForm
}

export const useReasonsPage = () => {
  const query = useReasons.list({})
  return useAcademicEntityPage(config, query.data)
}
