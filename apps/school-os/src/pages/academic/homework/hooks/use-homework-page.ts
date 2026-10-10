import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow,
  FilterDraft
} from '@pages/academic/homework/types'
import {
  createNextClassId,
  getSortableValue,
  rowToForm,
  validateClassForm
} from '@pages/academic/homework/utils/homework'
import { toISODate } from '@pages/academic/shared/date'
import { createEntityRoute } from '@pages/academic/shared/entity-route'
import { createEntitySortLabel } from '@pages/academic/shared/entity-utils'
import { useAcademicEntityPage } from '@pages/academic/shared/use-academic-entity-page'
import type { AcademicEntityPageConfig } from '@pages/academic/shared/use-academic-entity-page'
import {
  emptyForm,
  homeworkColumnOptions,
  sortOptions,
  useHomework
} from '@store/useAcademic/useHomework'

const toFields = (form: ClassFormState) => ({
  classes: form.classes.trim(),
  section: form.section.trim(),
  subject: form.subject.trim(),
  homeworkdate: form.homeworkdate,
  submissiondate: form.submissiondate,
  attachments: form.attachments.trim(),
  status: form.status
})

const config: AcademicEntityPageConfig<
  ClassRow,
  ClassFormState,
  ClassFormErrors,
  FilterDraft
> = {
  columnKeys: homeworkColumnOptions.map(column => column.key),
  pageKey: 'homework',
  emptyFilters: {
    classes: null,
    section: null,
    subject: null,
    homeworkdate: null,
    submissiondate: null,
    status: null,
    attachments: null,
    date: null
  },
  emptyForm,
  extraSearchValues: row => [row.createdBy.name, row.createdBy.secondaryText],
  filterKeys: [
    'classes',
    'section',
    'subject',
    'homeworkdate',
    'submissiondate',
    'status'
  ],
  getSortLabel: createEntitySortLabel(sortOptions, homeworkColumnOptions),
  getSortableValue,
  makeNewRow: (form, data) => ({
    id: createNextClassId(data),
    ...toFields(form),
    createdBy: { name: 'You', secondaryText: 'Teacher' },
    createdAt: toISODate(new Date()),
    viewedAt: toISODate(new Date())
  }),
  makeUpdatedRow: (form, row) => ({ ...row, ...toFields(form) }),
  rowToForm,
  route: createEntityRoute('/academic/homework'),
  searchKeys: [
    'id',
    'classes',
    'section',
    'subject',
    'homeworkdate',
    'submissiondate',
    'status'
  ],
  validateForm: validateClassForm
}

export const useHomeworkPage = () => {
  const query = useHomework.list({})
  return useAcademicEntityPage(config, query.data)
}
