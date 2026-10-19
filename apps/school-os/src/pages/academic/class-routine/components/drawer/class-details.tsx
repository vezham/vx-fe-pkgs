import type { ClassDetailsProps } from '@pages/academic/class-routine/types'
import { getClassTags } from '@pages/academic/class-routine/utils/class-routine'
import { classNames } from '@pages/academic/class-routine/variants'
import { createActiveEntityDetails } from '@pages/academic/shared/entity-details'
import type { DetailField } from '@pages/academic/shared/entity-details'

type Row = NonNullable<ClassDetailsProps['row']>

const fields: DetailField<Row>[] = [
  { label: 'Class', value: (row: Row) => row.classes },
  { label: 'Section', value: (row: Row) => row.section },
  { label: 'Teacher', value: (row: Row) => row.teacher },
  { label: 'Day', value: (row: Row) => row.day },
  { label: 'Start Time', value: (row: Row) => row.starttime },
  { label: 'End Time', value: (row: Row) => row.endtime },
  { label: 'Class Room', value: (row: Row) => row.classroom }
]

export const ClassDetails = createActiveEntityDetails<Row>({
  fields,
  classNames,
  getTags: getClassTags
})
