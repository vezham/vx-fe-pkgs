import type { ClassDrawerProps } from '@pages/academic/classes/schedule/types'
import { getDrawerTitle } from '@pages/academic/classes/schedule/utils/schedule'
import { classNames } from '@pages/academic/classes/schedule/variants'
import { EntityDrawerPage } from '@pages/academic/shared/entity-drawer-page'

import { ClassDetails } from './class-details'
import { ClassForm } from './class-form'

export const ClassDrawer = (props: ClassDrawerProps) => (
  <EntityDrawerPage
    {...props}
    classes={classNames}
    createLabel="Add Schedule"
    Details={ClassDetails}
    Form={ClassForm}
    getTitle={getDrawerTitle}
  />
)
