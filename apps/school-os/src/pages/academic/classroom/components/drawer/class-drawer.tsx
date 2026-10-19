import type { ClassDrawerProps } from '@pages/academic/classroom/types'
import { getDrawerTitle } from '@pages/academic/classroom/utils/classroom'
import { classNames } from '@pages/academic/classroom/variants'
import { EntityDrawerPage } from '@pages/academic/shared/entity-drawer-page'

import { ClassDetails } from './class-details'
import { ClassForm } from './class-form'

export const ClassDrawer = (props: ClassDrawerProps) => (
  <EntityDrawerPage
    {...props}
    classes={classNames}
    createLabel="Add Classroom"
    Details={ClassDetails}
    Form={ClassForm}
    getTitle={getDrawerTitle}
  />
)
