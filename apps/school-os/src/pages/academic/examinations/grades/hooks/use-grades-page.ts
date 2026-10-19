import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow,
  FilterDraft,
  GradeColumnKey
} from '@pages/academic/examinations/grades/types'
import {
  createNextClassId,
  getPercentageRange,
  rowToForm,
  validateClassForm
} from '@pages/academic/examinations/grades/utils/grades'
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
  gradeColumnOptions,
  sortOptions,
  useGrades
} from '@store/useAcademic/useGrades'

const toFields = (form: ClassFormState) => ({
  grade: form.grade.trim(),
  percentage: getPercentageRange(form),
  points: form.points.trim(),
  status: form.status
})

const config: AcademicEntityPageConfig<
  ClassRow,
  ClassFormState,
  ClassFormErrors,
  FilterDraft,
  GradeColumnKey
> = {
  columnKeys: gradeColumnOptions.map(column => column.key),
  clearActiveRowOnClose: false,
  pageKey: 'grades',
  drawerClearSelectionOnClose: false,
  emptyFilters: { grade: null, percentage: null, points: null, status: null },
  emptyForm,
  filterKeys: ['grade', 'percentage', 'points', 'status'],
  getSortLabel: createEntitySortLabel(sortOptions, gradeColumnOptions),
  ...createEntityRowMutations(createNextClassId, toFields),
  removeFromSelectionOnDelete: true,
  rowToForm,
  route: createEntityRoute('/academic/examinations/grades'),
  searchKeys: ['id', 'grade', 'percentage', 'points', 'status'],
  sortRows,
  validateForm: validateClassForm
}

export const useGradesPage = () => {
  const query = useGrades.list({})
  return useAcademicEntityPage(config, query.data)
}
