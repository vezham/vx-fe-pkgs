import type { ClassDetailsProps } from '@pages/academic/section/types'
import { getClassTags } from '@pages/academic/section/utils/section'
import { classNames } from '@pages/academic/section/variants'
import { EntityDetailsPanel } from '@pages/academic/shared/entity-details-panel'

export const ClassDetails = ({ row }: ClassDetailsProps) => (
  <EntityDetailsPanel row={row} classes={classNames} getTags={getClassTags} />
)
