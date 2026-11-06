export const DEFAULT_COMPANION_URL = 'http://127.0.0.1:7331/api/tamizhi'
export const companionURL = (value: string) => {
  const url = new URL(value)
  if (
    url.protocol !== 'http:' ||
    !['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname.replace(/\/$/, '') !== '/api/tamizhi'
  )
    throw new Error('Use a loopback companion URL ending in /api/tamizhi.')
  return url.href.replace(/\/$/, '')
}
