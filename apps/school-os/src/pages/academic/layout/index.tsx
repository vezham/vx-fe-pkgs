import { forwardRef } from 'react'

import { SectionLayout } from '@pages/_shared/section-layout'

import { Props, useAcademicLayoutProps } from './types'

const AcademicLayoutPage = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <SectionLayout controls={useAcademicLayoutProps({ ...props, ref })} />
))

AcademicLayoutPage.displayName = 'AcademicLayoutPage'

export default AcademicLayoutPage
