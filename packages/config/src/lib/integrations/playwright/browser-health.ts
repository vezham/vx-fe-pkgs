type ConsoleError = { text: string; url: string }
type ResourceContext = {
  documentUrls: ReadonlySet<string>
  successfulResourceUrls: ReadonlySet<string>
}

const invalidCookieDomain =
  /^Cookie (?:“[^”\r\n]+”|"[^"\r\n]+") has been rejected for invalid domain\.$/

// vx-bot/NOTE: Firefox reports rejected response cookies as console errors even when the resource loads.
export const isThirdPartyCookieDiagnostic = (
  error: ConsoleError,
  { documentUrls, successfulResourceUrls }: ResourceContext
) => {
  const wrapped =
    /^\[JavaScript Error: "([^\r\n]*)" \{file: "([^"]*)" line: \d+\}\]$/.exec(
      error.text
    )
  const message = wrapped?.[1] ?? error.text
  const resourceUrl = wrapped?.[2] || error.url
  if (
    !invalidCookieDomain.test(message) ||
    !URL.canParse(resourceUrl) ||
    (error.url && error.url !== resourceUrl) ||
    !successfulResourceUrls.has(resourceUrl)
  ) {
    return false
  }

  const resource = new URL(resourceUrl)
  const documents = [...documentUrls]
    .filter(url => URL.canParse(url))
    .map(url => new URL(url))
    .filter(url => url.protocol === 'http:' || url.protocol === 'https:')

  return (
    (resource.protocol === 'http:' || resource.protocol === 'https:') &&
    documents.length > 0 &&
    documents.every(document => document.hostname !== resource.hostname)
  )
}
