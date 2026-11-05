import { DEFAULT_COMPANION_URL, companionURL } from './companion'

const INFO = '/__tamizhi/companion-info'
const PREFIX = '/__tamizhi/companion'
interface Options {
  baseURL: string
  origin: string
  isSecureContext: boolean
  signal?: AbortSignal
  fetch?: typeof globalThis.fetch
}
// vx-bot/NOTE: The package stays runtime/build-tool agnostic. Discover an explicit local dev-server capability.
export const companionTransport = async (
  options: Options
): Promise<typeof globalThis.fetch> => {
  const fetcher = options.fetch ?? globalThis.fetch
  const base = companionURL(options.baseURL)
  if (options.isSecureContext) return fetcher
  const app = new URL(options.origin)
  const developmentHost =
    app.hostname.endsWith('.vezham.local') ||
    ['localhost', '127.0.0.1', '[::1]'].includes(app.hostname)
  if (
    app.protocol === 'http:' &&
    developmentHost &&
    base === DEFAULT_COMPANION_URL
  ) {
    try {
      const response = await fetcher(app.origin + INFO, {
        credentials: 'omit',
        signal: options.signal,
        headers: { Accept: 'application/json' }
      })
      if (
        response.ok &&
        response.headers.get('Content-Type')?.includes('application/json')
      ) {
        const info: unknown = await response.json()
        if (
          info &&
          typeof info === 'object' &&
          'protocol' in info &&
          info.protocol === 'tamizhi-dev-proxy/v1' &&
          'path' in info &&
          info.path === PREFIX &&
          'target' in info &&
          info.target === base
        ) {
          return (input, init) => {
            const url = new URL(
              typeof input === 'string'
                ? input
                : input instanceof URL
                  ? input.href
                  : input.url
            )
            if (url.href !== base && !url.href.startsWith(base + '/'))
              throw new Error(
                'Development transport only supports its configured companion.'
              )
            const destination =
              app.origin + PREFIX + url.href.slice(base.length)
            return fetcher(
              input instanceof Request
                ? new Request(destination, input)
                : destination,
              init
            )
          }
        }
      }
    } catch (error) {
      if (options.signal?.aborted) throw error
    }
  }
  throw new Error(
    'This HTTP origin cannot connect directly to the companion. For a .vezham.local Vite app, restart the dev server to enable its local relay. Otherwise use HTTPS or localhost.'
  )
}
