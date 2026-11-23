export const SSO_EMAIL_STORAGE_KEY = 'vezham.auth.sso-email'

/** Read the email carried from SSO discovery into a fallback sign-in view. */
export const getSsoFallbackEmail = () => {
  try {
    if (typeof sessionStorage === 'undefined') return ''

    return sessionStorage.getItem(SSO_EMAIL_STORAGE_KEY) ?? ''
  } catch {
    // vx-bot/NOTE: Reading the global itself throws in privacy-restricted browser contexts.
    return ''
  }
}

/** Persist the email used for SSO discovery for passwordless fallback views. */
export const setSsoFallbackEmail = (email: string) => {
  try {
    if (typeof sessionStorage === 'undefined') return

    sessionStorage.setItem(SSO_EMAIL_STORAGE_KEY, email)
  } catch {
    // vx-bot/NOTE: Storage can be unavailable in privacy-restricted browser contexts.
  }
}
