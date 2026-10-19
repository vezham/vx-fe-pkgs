import type { ClassDetailsProps } from '@pages/academic/classes/schedule/types'
import { getClassTags } from '@pages/academic/classes/schedule/utils/schedule'
import { classNames } from '@pages/academic/classes/schedule/variants'
import { createActiveEntityDetails } from '@pages/academic/shared/entity-details'
import type { DetailField } from '@pages/academic/shared/entity-details'

type Row = NonNullable<ClassDetailsProps['row']>

const fields: DetailField<Row>[] = [
  { label: 'Type', value: (row: Row) => row.type },
  { label: 'Start Time', value: (row: Row) => row.starttime },
  { label: 'End Time', value: (row: Row) => row.endtime }
]

export const ClassDetails = createActiveEntityDetails<Row>({
  fields,
  classNames,
  getTags: getClassTags
})
