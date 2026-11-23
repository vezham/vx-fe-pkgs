import baseConfig from '../../../eslint.config.mjs'

export default [
  ...baseConfig,
  {
    files: ['**/package.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          // vx-bot/NOTE: Nx resolves npm aliases to upstream names; the Vezham catalog peers own these SDKs.
          ignoredDependencies: [
            '@vezham/auth',
            '@vezham/auth-agent-auth',
            '@vezham/auth-api-key',
            '@vezham/auth-infra',
            '@vezham/auth-oauth-provider',
            '@vezham/auth-passkey',
            '@vezham/auth-sso',
            '@vezham/auth-stripe',
            'better-auth',
            '@better-auth/agent-auth',
            '@better-auth/api-key',
            '@better-auth/infra',
            '@better-auth/oauth-provider',
            '@better-auth/passkey',
            '@better-auth/sso',
            '@better-auth/stripe'
          ],
          ignoredFiles: [
            '{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}',
            '{projectRoot}/vite.config.{js,ts,mjs,mts}'
          ]
        }
      ]
    }
  }
]
