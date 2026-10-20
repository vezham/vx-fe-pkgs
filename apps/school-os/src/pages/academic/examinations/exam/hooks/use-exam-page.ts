import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow,
  ExamColumnKey,
  FilterDraft
} from '@pages/academic/examinations/exam/types'
import {
  createNextClassId,
  rowToForm,
  validateClassForm
} from '@pages/academic/examinations/exam/utils/exam'
import { createEntityRoute } from '@pages/academic/shared/entity-route'
import {
  createEntityRowMutations,
  createEntitySortLabel
} from '@pages/academic/shared/entity-utils'
import { sortRows } from '@pages/academic/shared/sort'
import { useAcademicEntityPage } from '@pages/academic/shared/use-academic-entity-page'
import type { AcademicEntityPageConfig } from '@pages/academic/shared/use-academic-entity-page'
import {
  emptyForm,
  examColumnOptions,
  sortOptions,
  useExam
} from '@store/useAcademic/useExam'

const toFields = (form: ClassFormState) => ({
  name: form.name.trim(),
  date: (form.date ?? '').trim(),
  starttime: form.starttime,
  endtime: form.endtime,
  status: form.status
})

const config: AcademicEntityPageConfig<
  ClassRow,
  ClassFormState,
  ClassFormErrors,
  FilterDraft,
  ExamColumnKey
> = {
  columnKeys: examColumnOptions.map(column => column.key),
  clearActiveRowOnClose: false,
  pageKey: 'exam',
  drawerClearSelectionOnClose: false,
  emptyFilters: {
    name: null,
    date: null,
    starttime: null,
    endtime: null,
    status: null
  },
  emptyForm,
  filterKeys: ['name', 'date', 'starttime', 'endtime', 'status'],
  getSortLabel: createEntitySortLabel(sortOptions, examColumnOptions),
  ...createEntityRowMutations(createNextClassId, toFields),
  removeFromSelectionOnDelete: true,
  rowToForm,
  route: createEntityRoute('/academic/examinations/exam'),
  searchKeys: ['id', 'name', 'date', 'starttime', 'endtime', 'status'],
  sortRows,
  validateForm: validateClassForm
}

export const useExamPage = () => {
  const query = useExam.list({})
  return useAcademicEntityPage(config, query.data)
}
