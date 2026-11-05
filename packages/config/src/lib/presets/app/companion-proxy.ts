import type { IncomingMessage } from 'node:http'
import type { Plugin } from 'vite'

const PREFIX = '/__tamizhi/companion'
const INFO = '/__tamizhi/companion-info'
const TARGET = 'http://127.0.0.1:7331'
const loopback = (address = '') =>
  address === '::1' ||
  /^127\.\d+\.\d+\.\d+$/.test(address.replace(/^::ffff:/, ''))
const originFor = (request: IncomingMessage, secure: boolean) => {
  try {
    const origin = new URL(
      `${secure ? 'https' : 'http'}://${request.headers.host}`
    )
    const host = origin.hostname
    if (
      origin.username ||
      origin.password ||
      !(
        host === 'localhost' ||
        host === '[::1]' ||
        loopback(host) ||
        host.endsWith('.vezham.local')
      )
    )
      return undefined
    if (request.headers.origin && request.headers.origin !== origin.origin)
      return undefined
    return origin.origin
  } catch {
    return undefined
  }
}

// vx-bot/NOTE: Local development only. Neither this relay nor discovery is installed in preview/production.
export const companionDevProxy = (): Plugin => {
  let secure = false
  return {
    name: 'vx-tamizhi-companion-dev-proxy',
    apply: (_config, env) => env.command === 'serve' && !env.isPreview,
    config() {
      return {
        server: {
          proxy: {
            ['^' + PREFIX + '(?:/|$)']: {
              target: TARGET,
              changeOrigin: true,
              ws: false,
              rewrite: path =>
                path.replace(/^\/__tamizhi\/companion/, '/api/tamizhi'),
              configure: proxy => {
                proxy.on('proxyReq', (outgoing, incoming) => {
                  // vx-bot/NOTE: Same-origin GET fetches omit Origin. Keep Go's paired-token origin check intact.
                  const origin = originFor(incoming, secure)
                  if (origin) outgoing.setHeader('Origin', origin)
                })
              }
            }
          }
        }
      }
    },
    configureServer(server) {
      secure = Boolean(server.config.server.https)
      server.middlewares.use((request, response, next) => {
        const path = request.url?.split('?')[0] ?? ''
        if (path !== INFO && path !== PREFIX && !path.startsWith(PREFIX + '/'))
          return next()
        if (
          !loopback(request.socket.remoteAddress) ||
          !originFor(request, secure)
        ) {
          response.statusCode = 403
          response.end(
            'The companion development relay accepts same-origin loopback requests only.'
          )
          return
        }
        if (path === INFO) {
          if (request.method !== 'GET') {
            response.statusCode = 405
            response.end()
            return
          }
          response.setHeader('Content-Type', 'application/json')
          response.setHeader('Cache-Control', 'no-store')
          response.setHeader('Cross-Origin-Resource-Policy', 'same-origin')
          response.end(
            JSON.stringify({
              protocol: 'tamizhi-dev-proxy/v1',
              path: PREFIX,
              target: TARGET + '/api/tamizhi'
            })
          )
          return
        }
        next()
      })
    }
  }
}
