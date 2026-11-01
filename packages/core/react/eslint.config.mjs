import nx from '@nx/eslint-plugin'

import baseConfig from '../../../eslint.config.mjs'

// vx-bot/NOTE: Vendored Momo engine retains upstream code conventions and attribution.
export default [
  { ignores: ['src/lib/tamizhi/ui/vendor/**'] },
  ...nx.configs['flat/react'],
  ...baseConfig
]
