import type {
  AttendanceColumnKey,
  AttendanceFormErrors,
  AttendanceFormState,
  AttendanceRow,
  FilterDraft
} from '@pages/academic/examinations/exam-attendance/types'
import {
  createNextAttendanceId,
  rowToForm,
  validateAttendanceForm
} from '@pages/academic/examinations/exam-attendance/utils/exam-attendance'
import { createEntityRoute } from '@pages/academic/shared/entity-route'
import {
  createEntityRowMutations,
  createEntitySortLabel
} from '@pages/academic/shared/entity-utils'
import { sortRows } from '@pages/academic/shared/sort'
import { useAcademicEntityPage } from '@pages/academic/shared/use-academic-entity-page'
import type { AcademicEntityPageConfig } from '@pages/academic/shared/use-academic-entity-page'
import {
  attendanceColumnOptions,
  emptyForm,
  sortOptions,
  useExamAttendance
} from '@store/useAcademic/useExamAttendance'

const toFields = (form: AttendanceFormState) => ({
  name: form.name.trim(),
  english: form.english,
  spanish: form.spanish,
  maths: form.maths,
  chemistry: form.chemistry,
  physics: form.physics,
  computer: form.computer,
  envscience: form.envscience,
  status: form.status
})

const config: AcademicEntityPageConfig<
  AttendanceRow,
  AttendanceFormState,
  AttendanceFormErrors,
  FilterDraft,
  AttendanceColumnKey
> = {
  columnKeys: attendanceColumnOptions.map(column => column.key),
  clearActiveRowOnClose: false,
  pageKey: 'exam-attendance',
  dateDropdownOpenChange: 'direct',
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
    examtype: null,
    classes: null,
    section: null,
    status: null
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
    'examtype',
    'classes',
    'section',
    'status'
  ],
  getSortLabel: createEntitySortLabel(sortOptions, attendanceColumnOptions),
  ...createEntityRowMutations(createNextAttendanceId, toFields),
  removeFromSelectionOnDelete: true,
  rowToForm,
  route: createEntityRoute('/academic/examinations/exam-attendance'),
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
    'status'
  ],
  sortRows,
  validateForm: validateAttendanceForm
}

export const useExamAttendancePage = () => {
  const query = useExamAttendance.list({})
  return useAcademicEntityPage(config, query.data)
}
