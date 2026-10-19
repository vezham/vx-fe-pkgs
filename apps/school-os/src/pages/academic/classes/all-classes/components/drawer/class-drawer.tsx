import type { ClassDrawerProps } from '@pages/academic/classes/all-classes/types'
import { getDrawerTitle } from '@pages/academic/classes/all-classes/utils/classes'
import { classNames } from '@pages/academic/classes/all-classes/variants'
import { EntityDrawerPage } from '@pages/academic/shared/entity-drawer-page'

import { ClassDetails } from './class-details'
import { ClassForm } from './class-form'

export const ClassDrawer = (props: ClassDrawerProps) => (
  <EntityDrawerPage
    {...props}
    classes={classNames}
    createLabel="Add Class"
    Details={ClassDetails}
    Form={ClassForm}
    getTitle={getDrawerTitle}
  />
)
