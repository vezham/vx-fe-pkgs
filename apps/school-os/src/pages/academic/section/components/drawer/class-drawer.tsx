import type { ClassDrawerProps } from '@pages/academic/section/types'
import { getDrawerTitle } from '@pages/academic/section/utils/section'
import { classNames } from '@pages/academic/section/variants'
import { EntityDrawerPage } from '@pages/academic/shared/entity-drawer-page'

import { ClassDetails } from './class-details'
import { ClassForm } from './class-form'

export const ClassDrawer = (props: ClassDrawerProps) => (
  <EntityDrawerPage
    {...props}
    classes={classNames}
    createLabel="Add Section"
    Details={ClassDetails}
    Form={ClassForm}
    getTitle={getDrawerTitle}
  />
)
