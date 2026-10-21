import type { Framework } from '../../framework'
import { type ViteConfigOverrides } from '../vite'
import { defineTestConfig } from './shared'

export const defineFrameworkTestConfig = (
  framework: Framework,
  overrides: ViteConfigOverrides = {}
) =>
  defineTestConfig(
    framework === 'next'
      ? 'next'
      : framework === 'tanstack-docs'
        ? 'docs'
        : 'react',
    overrides
  )
