import type { ClassDrawerProps } from '@pages/academic/reasons/types'
import { getDrawerTitle } from '@pages/academic/reasons/utils/reasons'
import { classNames } from '@pages/academic/reasons/variants'
import { EntityDrawerPage } from '@pages/academic/shared/entity-drawer-page'

import { ClassDetails } from './class-details'
import { ClassForm } from './class-form'

export const ClassDrawer = (props: ClassDrawerProps) => (
  <EntityDrawerPage
    {...props}
    classes={classNames}
    createLabel="Add Reactions"
    Details={ClassDetails}
    Form={ClassForm}
    getTitle={getDrawerTitle}
  />
)
