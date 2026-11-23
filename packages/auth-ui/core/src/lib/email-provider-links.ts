import { emailProviders } from './email-providers'

export type EmailProviderLink = {
  /** Human-readable provider name, e.g. `"Gmail"` or `"GMX"`. */
  companyProvider: string
  /** Direct URL to the provider's webmail login, e.g. `"https://mail.google.com/mail/"`. */
  loginUrl: string
}

let domainMap: Map<string, EmailProviderLink> | undefined

const getDomainMap = (): Map<string, EmailProviderLink> => {
  if (domainMap) return domainMap

  domainMap = new Map()

  for (const provider of emailProviders) {
    if (!provider.loginUrl) continue

    for (const domain of provider.domains ?? []) {
      domainMap.set(domain.toLowerCase(), {
        companyProvider: provider.companyProvider,
        loginUrl: provider.loginUrl
      })
    }
  }

  return domainMap
}

/**
 * Resolve the webmail login link for an email address from its domain.
 *
 * Uses the bundled Email Provider Links dataset without filesystem or DNS
 * access. Covers 130+ providers including niche ones like `gmx.de`.
 *
 * @param email - Full email address, e.g. `"jane@gmx.de"`.
 * @returns The matching provider link, or `null` for unknown/custom domains.
 */
export const getEmailProviderLink = (
  email: string
): EmailProviderLink | null => {
  const atIndex = email.lastIndexOf('@')
  if (atIndex === -1) return null

  const domain = email
    .slice(atIndex + 1)
    .trim()
    .toLowerCase()
  if (!domain) return null

  return getDomainMap().get(domain) ?? null
}
