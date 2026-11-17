import nx from '@nx/eslint-plugin'

import baseConfig from '../../eslint.config.mjs'

export default [
  { ignores: ['src/demos/heroui/**', 'src/demos/heroui-pro/**'] },
  ...baseConfig,
  ...nx.configs['flat/react']
]
