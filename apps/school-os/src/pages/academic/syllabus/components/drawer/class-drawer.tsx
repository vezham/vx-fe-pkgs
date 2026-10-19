import { EntityDrawerPage } from '@pages/academic/shared/entity-drawer-page'
import type { ClassDrawerProps } from '@pages/academic/syllabus/types'
import { getDrawerTitle } from '@pages/academic/syllabus/utils/syllabus'
import { classNames } from '@pages/academic/syllabus/variants'

import { ClassDetails } from './class-details'
import { ClassForm } from './class-form'

export const ClassDrawer = (props: ClassDrawerProps) => (
  <EntityDrawerPage
    {...props}
    classes={classNames}
    createLabel="Add Subject Group"
    Details={ClassDetails}
    Form={ClassForm}
    getTitle={getDrawerTitle}
  />
)
