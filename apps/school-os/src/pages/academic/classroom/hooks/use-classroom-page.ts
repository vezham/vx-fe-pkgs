import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow,
  ClassroomColumnKey,
  FilterDraft
} from '@pages/academic/classroom/types'
import {
  createNextClassId,
  rowToForm,
  validateClassForm
} from '@pages/academic/classroom/utils/classroom'
import { createEntityRoute } from '@pages/academic/shared/entity-route'
import {
  createEntityRowMutations,
  createEntitySortLabel
} from '@pages/academic/shared/entity-utils'
import { useAcademicEntityPage } from '@pages/academic/shared/use-academic-entity-page'
import type { AcademicEntityPageConfig } from '@pages/academic/shared/use-academic-entity-page'
import {
  classroomColumnOptions,
  emptyForm,
  sortOptions,
  useClassroom
} from '@store/useAcademic/useClassroom'

const toFields = (form: ClassFormState) => ({
  roomno: form.roomno.trim(),
  capacity: form.capacity,
  status: form.status
})

const config: AcademicEntityPageConfig<
  ClassRow,
  ClassFormState,
  ClassFormErrors,
  FilterDraft,
  ClassroomColumnKey
> = {
  columnKeys: classroomColumnOptions.map(column => column.key),
  clearActiveRowOnClose: false,
  clearSelectionOnClose: false,
  pageKey: 'classroom',
  drawerClearSelectionOnClose: false,
  emptyFilters: { roomno: null, capacity: null, status: null },
  emptyForm,
  filterKeys: ['roomno', 'capacity', 'status'],
  getSortLabel: createEntitySortLabel(sortOptions, classroomColumnOptions),
  ...createEntityRowMutations(createNextClassId, toFields),
  navigateAcrossPages: true,
  removeFromSelectionOnDelete: true,
  rowToForm,
  route: createEntityRoute('/academic/classroom'),
  searchKeys: ['id', 'roomno', 'capacity', 'status'],
  selectAllVisible: true,
  validateForm: validateClassForm
}

export const useClassroomPage = () => {
  const query = useClassroom.list({})
  return useAcademicEntityPage(config, query.data)
}
