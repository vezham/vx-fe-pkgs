import type { ClassDetailsProps } from '@pages/academic/classroom/types'
import { getClassTags } from '@pages/academic/classroom/utils/classroom'
import { classNames } from '@pages/academic/classroom/variants'
import { createActiveEntityDetails } from '@pages/academic/shared/entity-details'
import type { DetailField } from '@pages/academic/shared/entity-details'

type Row = NonNullable<ClassDetailsProps['row']>

const fields: DetailField<Row>[] = [
  { label: 'Type', value: (row: Row) => row.roomno },
  { label: 'Start Time', value: (row: Row) => row.capacity }
]

export const ClassDetails = createActiveEntityDetails<Row>({
  fields,
  classNames,
  getTags: getClassTags
})
