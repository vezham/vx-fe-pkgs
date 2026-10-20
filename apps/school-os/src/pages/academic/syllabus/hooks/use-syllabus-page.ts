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
} from '@pages/academic/syllabus/types'
import {
  createNextClassId,
  rowToForm,
  validateClassForm
} from '@pages/academic/syllabus/utils/syllabus'
import {
  emptyForm,
  sortOptions,
  syllabusColumnOptions,
  useSyllabus
} from '@store/useAcademic/useSyllabus'

const toFields = (form: ClassFormState) => ({
  classes: form.classes.trim(),
  subject: form.subject.trim(),
  section: form.section.trim(),
  status: form.status
})

const config: AcademicEntityPageConfig<
  ClassRow,
  ClassFormState,
  ClassFormErrors,
  FilterDraft
> = {
  columnKeys: syllabusColumnOptions.map(column => column.key),
  pageKey: 'syllabus',
  emptyFilters: { classes: null, subject: null, section: null, status: null },
  emptyForm,
  filterKeys: ['classes', 'subject', 'section', 'status'],
  getSortLabel: createEntitySortLabel(sortOptions, syllabusColumnOptions),
  ...createEntityRowMutations(createNextClassId, toFields),
  rowToForm,
  route: createEntityRoute('/academic/syllabus'),
  searchKeys: ['id', 'classes', 'subject', 'section', 'status'],
  validateForm: validateClassForm
}

export const useSyllabusPage = () => {
  const query = useSyllabus.list({})
  return useAcademicEntityPage(config, query.data)
}
