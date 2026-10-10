export { dateOptions } from '@src/utils/date-options'
export type { DatePresetKey as AcademicDatePresetKey } from '@src/utils/date-options'

export const sortOrderOptions = [
  {
    key: 'ascending',
    label: 'Ascending',
    direction: 'ascending',
    icon: 'vx:sort-ascending'
  },
  {
    key: 'descending',
    label: 'Descending',
    direction: 'descending',
    icon: 'vx:sort-descending'
  }
] as const

export const rowCountOptions = ['5', '10', '25', '50']
