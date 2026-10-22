import { Outlet } from '@tanstack/react-router'

import type { Props } from '../shared/types'
import { RootDocument } from './root-document'

export const defineConfig = ({ children, ...props }: Props) => (
  <RootDocument {...props}>{children ?? <Outlet />}</RootDocument>
)

export const createRootComponent = (props: Props) => () => defineConfig(props)
