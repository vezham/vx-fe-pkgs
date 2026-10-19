import { EntityDrawerPage } from '@pages/academic/shared/entity-drawer-page'
import type { ClassDrawerProps } from '@pages/academic/subject/types'
import { getDrawerTitle } from '@pages/academic/subject/utils/subject'
import { classNames } from '@pages/academic/subject/variants'

import { ClassDetails } from './class-details'
import { ClassForm } from './class-form'

export const ClassDrawer = (props: ClassDrawerProps) => (
  <EntityDrawerPage
    {...props}
    classes={classNames}
    createLabel="Add Subject"
    Details={ClassDetails}
    Form={ClassForm}
    getTitle={getDrawerTitle}
  />
)
