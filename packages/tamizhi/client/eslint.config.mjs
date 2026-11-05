import baseConfig from '../../../eslint.config.mjs'

export default [
  ...baseConfig,
  {
    files: ['**/package.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          // vx-bot/NOTE: Runtime imports @tanstack/ai/client; Nx misses this subpath when multiple AI versions exist in the workspace.
          ignoredDependencies: ['@tanstack/ai'],
          ignoredFiles: [
            '{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}',
            '{projectRoot}/vite.config.{js,ts,mjs,mts}',
            '{projectRoot}/tools/**'
          ]
        }
      ]
    }
  }
]
