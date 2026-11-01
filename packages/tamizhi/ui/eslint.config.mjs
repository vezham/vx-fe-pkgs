import nx from '@nx/eslint-plugin'

import baseConfig from '../../../eslint.config.mjs'

export default [
  { ignores: ['src/lib/vendor/**'] },
  ...nx.configs['flat/react'],
  ...baseConfig
]
