import { z } from 'zod'

import {
  createTamizhi,
  httpTransportPlugin,
  openaiCompatiblePlugin,
  permissionPolicyPlugin,
  toolPlugin
} from '../src/index'
import { createTamizhiServer, fileStoragePlugin } from '../src/lib/node'

const apiKey = process.env.TAMIZHI_PROVIDER_API_KEY
const token = process.env.TAMIZHI_API_TOKEN
if (!apiKey || !token)
  throw new Error(
    'Set TAMIZHI_PROVIDER_API_KEY and TAMIZHI_API_TOKEN before starting the backend'
  )
const model = process.env.TAMIZHI_MODEL ?? 'deepseek-chat'
const runtime = await createTamizhi({
  defaultModel: model,
  plugins: [
    fileStoragePlugin(process.env.TAMIZHI_DATA_DIRECTORY ?? '.tamizhi/data'),
    permissionPolicyPlugin(),
    openaiCompatiblePlugin({
      id: 'primary',
      apiKey,
      baseURL:
        process.env.TAMIZHI_PROVIDER_BASE_URL ?? 'https://api.deepseek.com',
      models: [{ id: model, name: model, provider: 'primary' }]
    }),
    toolPlugin({
      name: 'current_time',
      description: 'Get the current time in an IANA time zone',
      risk: 'read',
      inputSchema: z.object({ timeZone: z.string().default('UTC') }),
      execute: async input => {
        const { timeZone } = z.object({ timeZone: z.string() }).parse(input)
        return {
          timeZone,
          time: new Intl.DateTimeFormat('en', {
            timeZone,
            dateStyle: 'full',
            timeStyle: 'long'
          }).format(new Date())
        }
      }
    }),
    httpTransportPlugin({
      allowedOrigins: (
        process.env.TAMIZHI_ALLOWED_ORIGINS ??
        'http://tamizhi.vezham.local:3000'
      )
        .split(',')
        .map(value => value.trim()),
      authenticate: request => {
        const cookie = request.headers
          .get('cookie')
          ?.split(';')
          .map(value => value.trim())
          .find(value => value.startsWith('tamizhi-session='))
          ?.slice('tamizhi-session='.length)
        return request.headers.get('authorization') === `Bearer ${token}` ||
          cookie === token
          ? { id: 'local-user' }
          : null
      }
    })
  ]
})
const server = createTamizhiServer(runtime)
server.listen(Number(process.env.TAMIZHI_PORT ?? 8787), '127.0.0.1')
const stop = () => {
  server.close()
  void runtime.dispose()
}
process.once('SIGINT', stop)
process.once('SIGTERM', stop)
