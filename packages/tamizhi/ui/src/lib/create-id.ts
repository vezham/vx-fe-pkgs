export const createId = () => {
  if (typeof crypto !== 'undefined') {
    if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
    if (typeof crypto.getRandomValues === 'function') {
      return Array.from(crypto.getRandomValues(new Uint32Array(4)), value =>
        value.toString(36)
      ).join('-')
    }
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
}
