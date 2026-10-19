import type { ClassDetailsProps } from '@pages/academic/reasons/types'
import { getClassTags } from '@pages/academic/reasons/utils/reasons'
import { classNames } from '@pages/academic/reasons/variants'
import { createActiveEntityDetails } from '@pages/academic/shared/entity-details'
import type { DetailField } from '@pages/academic/shared/entity-details'

type Row = NonNullable<ClassDetailsProps['row']>

const fields: DetailField<Row>[] = [
  { label: 'Section Role', value: (row: Row) => row.role }
]

export const ClassDetails = createActiveEntityDetails<Row>({
  fields,
  classNames,
  getTags: getClassTags
})
