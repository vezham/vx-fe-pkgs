import { forwardRef } from 'react'

import { SectionLayout } from '@pages/_shared/section-layout'

import { Props, useOperationsLayoutProps } from './types'

const OperationsLayoutPage = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <SectionLayout controls={useOperationsLayoutProps({ ...props, ref })} />
))

OperationsLayoutPage.displayName = 'OperationsLayoutPage'

export default OperationsLayoutPage
