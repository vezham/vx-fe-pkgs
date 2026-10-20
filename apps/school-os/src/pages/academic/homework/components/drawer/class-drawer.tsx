import type { ClassDrawerProps } from '@pages/academic/homework/types'
import { getDrawerTitle } from '@pages/academic/homework/utils/homework'
import { classNames } from '@pages/academic/homework/variants'
import { EntityDrawerPage } from '@pages/academic/shared/entity-drawer-page'

import { ClassDetails } from './class-details'
import { ClassForm } from './class-form'

export const ClassDrawer = (props: ClassDrawerProps) => (
  <EntityDrawerPage
    {...props}
    classes={classNames}
    createLabel="Add Homework"
    Details={ClassDetails}
    Form={ClassForm}
    getTitle={getDrawerTitle}
  />
)
