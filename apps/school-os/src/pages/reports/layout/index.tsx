import { forwardRef } from 'react'

import { SectionLayout } from '@pages/_shared/section-layout'

import { Props, useReportsLayoutProps } from './types'

const ReportsLayoutPage = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <SectionLayout controls={useReportsLayoutProps({ ...props, ref })} />
))

ReportsLayoutPage.displayName = 'ReportsLayoutPage'

export default ReportsLayoutPage
