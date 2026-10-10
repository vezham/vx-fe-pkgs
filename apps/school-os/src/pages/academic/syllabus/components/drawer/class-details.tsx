import { EntityDetailsPanel } from '@pages/academic/shared/entity-details-panel'
import type { ClassDetailsProps } from '@pages/academic/syllabus/types'
import { getClassTags } from '@pages/academic/syllabus/utils/syllabus'
import { classNames } from '@pages/academic/syllabus/variants'

export const ClassDetails = ({ row }: ClassDetailsProps) => (
  <EntityDetailsPanel row={row} classes={classNames} getTags={getClassTags} />
)
