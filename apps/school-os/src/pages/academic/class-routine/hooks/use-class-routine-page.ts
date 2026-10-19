import type {
  ClassFormErrors,
  ClassFormState,
  ClassRoutineColumnKey,
  ClassRow,
  FilterDraft
} from '@pages/academic/class-routine/types'
import {
  createNextClassId,
  rowToForm,
  validateClassForm
} from '@pages/academic/class-routine/utils/class-routine'
import { createEntityRoute } from '@pages/academic/shared/entity-route'
import {
  createEntityRowMutations,
  createEntitySortLabel
} from '@pages/academic/shared/entity-utils'
import { useAcademicEntityPage } from '@pages/academic/shared/use-academic-entity-page'
import type { AcademicEntityPageConfig } from '@pages/academic/shared/use-academic-entity-page'
import {
  classRoutineColumnOptions,
  emptyForm,
  sortOptions,
  useClassRoutine
} from '@store/useAcademic/useClassRoutine'

const toFields = (form: ClassFormState) => ({
  classes: form.classes.trim(),
  section: form.section.trim(),
  subject: form.subject.trim(),
  teacher: form.teacher.trim(),
  day: form.day.trim(),
  classroom: form.classroom.trim(),
  starttime: form.starttime,
  endtime: form.endtime,
  status: form.status
})

const config: AcademicEntityPageConfig<
  ClassRow,
  ClassFormState,
  ClassFormErrors,
  FilterDraft,
  ClassRoutineColumnKey
> = {
  columnKeys: classRoutineColumnOptions.map(column => column.key),
  pageKey: 'classroutine',
  emptyFilters: {
    classes: null,
    section: null,
    teacher: null,
    subject: null,
    starttime: null,
    endtime: null,
    day: null,
    classroom: null,
    status: null
  },
  emptyForm,
  filterKeys: [
    'classes',
    'section',
    'subject',
    'teacher',
    'day',
    'starttime',
    'endtime',
    'classroom',
    'status'
  ],
  getSortLabel: createEntitySortLabel(sortOptions, classRoutineColumnOptions),
  ...createEntityRowMutations(createNextClassId, toFields),
  navigateAcrossPages: true,
  removeFromSelectionOnDelete: true,
  rowToForm,
  route: createEntityRoute('/academic/class-routine'),
  searchKeys: [
    'id',
    'classes',
    'section',
    'teacher',
    'subject',
    'starttime',
    'endtime',
    'day',
    'classroom',
    'status'
  ],
  selectAllVisible: true,
  syncSelectionFromUrl: true,
  validateForm: validateClassForm
}

export const useClassRoutinePage = () => {
  const query = useClassRoutine.list({})
  return useAcademicEntityPage(config, query.data)
}
