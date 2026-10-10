import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow,
  FilterDraft,
  ScheduleColumnKey
} from '@pages/academic/classes/schedule/types'
import {
  createNextClassId,
  rowToForm,
  validateClassForm
} from '@pages/academic/classes/schedule/utils/schedule'
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
  initialRows,
  scheduleColumnOptions,
  sortOptions
} from '@store/useAcademic/useClassSchedule'

const toFields = (form: ClassFormState) => ({
  type: form.type.trim(),
  starttime: form.starttime,
  endtime: form.endtime,
  status: form.status
})

const config: AcademicEntityPageConfig<
  ClassRow,
  ClassFormState,
  ClassFormErrors,
  FilterDraft,
  ScheduleColumnKey
> = {
  columnKeys: scheduleColumnOptions.map(column => column.key),
  clearActiveRowOnClose: true,
  clearSelectionOnClose: true,
  pageKey: 'schedule',
  emptyFilters: { type: null, status: null },
  emptyForm,
  filterKeys: ['type', 'status'],
  getSortLabel: createEntitySortLabel(sortOptions, scheduleColumnOptions),
  ...createEntityRowMutations(createNextClassId, toFields),
  navigateAcrossPages: true,
  removeFromSelectionOnDelete: true,
  rowToForm,
  route: createEntityRoute('/academic/classes/schedule'),
  searchKeys: ['id', 'type', 'status'],
  selectAllVisible: true,
  sortRows,
  syncSelectionFromUrl: true,
  validateForm: validateClassForm
}

export const useSchedulePage = () => useAcademicEntityPage(config, initialRows)
