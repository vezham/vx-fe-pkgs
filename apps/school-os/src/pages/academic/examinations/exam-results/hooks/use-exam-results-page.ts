import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow,
  ExamResultsColumnKey,
  FilterDraft
} from '@pages/academic/examinations/exam-results/types'
import {
  createNextClassId,
  rowToForm,
  validateClassForm
} from '@pages/academic/examinations/exam-results/utils/exam-results'
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
  examResultsColumnOptions,
  sortOptions,
  useExamResults
} from '@store/useAcademic/useExamResults'

const toFields = (form: ClassFormState) => ({
  name: form.name.trim(),
  english: form.english.trim(),
  spanish: form.spanish.trim(),
  maths: form.maths.trim(),
  chemistry: form.chemistry.trim(),
  physics: form.physics.trim(),
  computer: form.computer.trim(),
  envscience: form.envscience.trim(),
  total: form.total.trim(),
  percent: form.percent.trim(),
  grade: form.grade.trim(),
  result: form.result
})

const config: AcademicEntityPageConfig<
  ClassRow,
  ClassFormState,
  ClassFormErrors,
  FilterDraft,
  ExamResultsColumnKey
> = {
  columnKeys: examResultsColumnOptions.map(column => column.key),
  clearActiveRowOnClose: false,
  pageKey: 'exam-results',
  drawerClearSelectionOnClose: false,
  emptyFilters: {
    name: null,
    english: null,
    maths: null,
    spanish: null,
    physics: null,
    chemistry: null,
    computer: null,
    envscience: null,
    total: null,
    percent: null,
    grade: null,
    result: null,
    classes: null,
    section: null,
    examtype: null
  },
  emptyForm,
  filterKeys: [
    'name',
    'english',
    'spanish',
    'maths',
    'envscience',
    'physics',
    'chemistry',
    'computer',
    'total',
    'percent',
    'grade',
    'result',
    'classes',
    'section',
    'examtype'
  ],
  getSortLabel: createEntitySortLabel(sortOptions, examResultsColumnOptions),
  ...createEntityRowMutations(createNextClassId, toFields),
  removeFromSelectionOnDelete: true,
  rowToForm,
  route: createEntityRoute('/academic/examinations/exam-results'),
  searchKeys: [
    'id',
    'name',
    'english',
    'spanish',
    'maths',
    'physics',
    'chemistry',
    'computer',
    'envscience',
    'total',
    'percent',
    'grade',
    'result'
  ],
  sortRows,
  validateForm: validateClassForm
}

export const useExamResultsPage = () => {
  const query = useExamResults.list({})
  return useAcademicEntityPage(config, query.data)
}
