import type { ClassDrawerProps } from '@pages/academic/examinations/grades/types'
import { getDrawerTitle } from '@pages/academic/examinations/grades/utils/grades'
import { classNames } from '@pages/academic/examinations/grades/variants'
import { EntityDrawerPage } from '@pages/academic/shared/entity-drawer-page'

import { ClassDetails } from './class-details'
import { ClassForm } from './class-form'

export const ClassDrawer = (props: ClassDrawerProps) => (
  <EntityDrawerPage
    {...props}
    classes={classNames}
    createLabel="Add Grades"
    Details={ClassDetails}
    Form={ClassForm}
    getTitle={getDrawerTitle}
  />
)
