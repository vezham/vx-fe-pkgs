import { createEntityRoute } from '@pages/academic/shared/entity-route'
import {
  createEntityRowMutations,
  createEntitySortLabel
} from '@pages/academic/shared/entity-utils'
import { useAcademicEntityPage } from '@pages/academic/shared/use-academic-entity-page'
import type { AcademicEntityPageConfig } from '@pages/academic/shared/use-academic-entity-page'
import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow,
  FilterDraft
} from '@pages/academic/subject/types'
import {
  createNextClassId,
  rowToForm,
  validateClassForm
} from '@pages/academic/subject/utils/subject'
import {
  emptyForm,
  sortOptions,
  subjectColumnOptions,
  useSubject
} from '@store/useAcademic/useSubject'

const toFields = (form: ClassFormState) => ({
  name: form.name.trim(),
  code: form.code.trim(),
  type: form.type,
  status: form.status
})

const config: AcademicEntityPageConfig<
  ClassRow,
  ClassFormState,
  ClassFormErrors,
  FilterDraft
> = {
  columnKeys: subjectColumnOptions.map(column => column.key),
  pageKey: 'subject',
  emptyFilters: { name: null, code: null, type: null, status: null },
  emptyForm,
  filterKeys: ['name', 'code', 'type', 'status'],
  getSortLabel: createEntitySortLabel(sortOptions, subjectColumnOptions),
  ...createEntityRowMutations(createNextClassId, toFields),
  rowToForm,
  route: createEntityRoute('/academic/subject'),
  searchKeys: ['id', 'name', 'code', 'type', 'status'],
  validateForm: validateClassForm
}

export const useSubjectPage = () => {
  const query = useSubject.list({})
  return useAcademicEntityPage(config, query.data)
}
