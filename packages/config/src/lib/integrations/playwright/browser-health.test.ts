import { describe, expect, it } from 'vitest'

import { isThirdPartyCookieDiagnostic } from './browser-health'

const resourceUrl = 'https://images.example.net/photo.png'
const documentUrl = 'https://app.example.com/'
const documentUrls = new Set([documentUrl])
const context = {
  documentUrls,
  successfulResourceUrls: new Set([resourceUrl])
}
const warning = (name: string) =>
  `Cookie “${name}” has been rejected for invalid domain.`
const wrapped = (text: string, url = resourceUrl) =>
  `[JavaScript Error: "${text}" {file: "${url}" line: 0}]`

describe('external resource cookie diagnostics', () => {
  it.each(['__cf_bm', 'provider_session', 'tracking_id'])(
    'recognizes the policy diagnostic for cookie %s',
    name => {
      expect(
        isThirdPartyCookieDiagnostic(
          {
            text: warning(name),
            url: resourceUrl
          },
          context
        )
      ).toBe(true)
      expect(
        isThirdPartyCookieDiagnostic(
          {
            text: wrapped(warning(name)),
            url: ''
          },
          context
        )
      ).toBe(true)
    }
  )

  it('handles other hosts and resource formats', () => {
    const url = 'https://cdn.another.test/assets/logo.svg?version=2'
    expect(
      isThirdPartyCookieDiagnostic(
        {
          text: wrapped(warning('cdn_cookie'), url),
          url
        },
        { documentUrls, successfulResourceUrls: new Set([url]) }
      )
    ).toBe(true)
  })

  it.each([
    'https://app.example.com/image.jpg',
    'http://app.example.com:8080/image.jpg'
  ])('keeps application cookie errors visible at %s', url => {
    expect(
      isThirdPartyCookieDiagnostic(
        {
          text: wrapped(warning('session'), url),
          url
        },
        { documentUrls, successfulResourceUrls: new Set([url]) }
      )
    ).toBe(false)
  })

  it('keeps cookie errors from earlier documents visible after navigation', () => {
    expect(
      isThirdPartyCookieDiagnostic(
        {
          text: wrapped(warning('session')),
          url: resourceUrl
        },
        {
          ...context,
          documentUrls: new Set([
            documentUrl,
            'https://images.example.net/login'
          ])
        }
      )
    ).toBe(false)
  })

  it('requires evidence that the external resource loaded successfully', () => {
    expect(
      isThirdPartyCookieDiagnostic(
        {
          text: wrapped(warning('cdn_cookie')),
          url: resourceUrl
        },
        { documentUrls, successfulResourceUrls: new Set() }
      )
    ).toBe(false)
  })

  it('requires a known document origin', () => {
    expect(
      isThirdPartyCookieDiagnostic(
        {
          text: wrapped(warning('cdn_cookie')),
          url: resourceUrl
        },
        { ...context, documentUrls: new Set(['about:blank']) }
      )
    ).toBe(false)
  })

  it('keeps diagnostics with missing or conflicting resource locations visible', () => {
    expect(
      isThirdPartyCookieDiagnostic(
        {
          text: warning('cdn_cookie'),
          url: ''
        },
        context
      )
    ).toBe(false)
    expect(
      isThirdPartyCookieDiagnostic(
        {
          text: wrapped(warning('cdn_cookie')),
          url: documentUrl
        },
        context
      )
    ).toBe(false)
  })

  it.each([
    'Minified React error #418',
    'Failed to load resource: the server responded with a status of 500',
    'Cookie “session” has been rejected because it is already expired.',
    `${warning('cdn_cookie')} Application error`,
    `Application error: ${warning('cdn_cookie')}`,
    `${wrapped(warning('cdn_cookie'))} Application error`
  ])('keeps other errors visible: %s', text => {
    expect(
      isThirdPartyCookieDiagnostic({ text, url: resourceUrl }, context)
    ).toBe(false)
  })
})
