import type { ClassDrawerProps } from '@pages/academic/class-routine/types'
import { getDrawerTitle } from '@pages/academic/class-routine/utils/class-routine'
import { classNames } from '@pages/academic/class-routine/variants'
import { EntityDrawerPage } from '@pages/academic/shared/entity-drawer-page'

import { ClassDetails } from './class-details'
import { ClassForm } from './class-form'

export const ClassDrawer = (props: ClassDrawerProps) => (
  <EntityDrawerPage
    {...props}
    classes={classNames}
    createLabel="Add Class Routine"
    Details={ClassDetails}
    Form={ClassForm}
    getTitle={getDrawerTitle}
  />
)
