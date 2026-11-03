export const createLinkedAbortController = (signal: AbortSignal) => {
  const controller = new AbortController()
  const abort = () => controller.abort()
  signal.addEventListener('abort', abort, { once: true })
  if (signal.aborted) abort()
  const cleanup = () => signal.removeEventListener('abort', abort)
  return { controller, abort, cleanup }
}
