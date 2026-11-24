import type { AuthPlugin } from './auth-plugin'
import type { Localization } from './localization'
import { localization } from './localization'
import { deepmerge } from './utils'

export type AuthLocaleDirection = 'ltr' | 'rtl'

/** A complete set of translated Vezham Auth messages. */
export interface AuthLocale {
  /** Canonical BCP 47 language tag, such as `de-DE` or `zh-CN`. */
  languageTag: string
  /** Text direction for this locale. @default "ltr" */
  direction?: AuthLocaleDirection
  /** Core authentication and settings messages. */
  localization: Localization
  /** Optional messages keyed by auth plugin ID. */
  plugins?: Record<string, Record<string, unknown>>
}

export const defaultAuthLocale: AuthLocale = {
  languageTag: 'en-US',
  direction: 'ltr',
  localization
}

/** Defines a locale while preserving its narrow language-tag type. */
export const defineAuthLocale = <const TLocale extends AuthLocale>(
  locale: TLocale
): TLocale => {
  return locale
}

const canonicalizeLanguageTag = (languageTag: string) => {
  try {
    return Intl.getCanonicalLocales(languageTag)[0]
  } catch {
    return undefined
  }
}

const parseRequestedLanguages = (
  requested: string | readonly string[] | null | undefined
) => {
  const values: readonly string[] = Array.isArray(requested)
    ? requested
    : typeof requested === 'string'
      ? requested.split(',')
      : []

  return values
    .map((value, index) => {
      const [languageTag, ...parameters] = value.trim().split(';')
      const qualityParameter = parameters.find((parameter: string) =>
        parameter.trim().toLowerCase().startsWith('q=')
      )
      const quality = qualityParameter
        ? Number.parseFloat(qualityParameter.trim().slice(2))
        : 1

      return {
        index,
        languageTag: canonicalizeLanguageTag(languageTag),
        quality: Number.isFinite(quality) ? quality : 0
      }
    })
    .filter(
      (
        entry
      ): entry is { index: number; languageTag: string; quality: number } =>
        Boolean(entry.languageTag) && entry.quality > 0 && entry.quality <= 1
    )
    .sort(
      (left, right) => right.quality - left.quality || left.index - right.index
    )
    .map(entry => entry.languageTag)
}

export type MatchAuthLocaleOptions<TLocale extends AuthLocale> = {
  /** Browser languages or an `Accept-Language` header value. */
  requested: string | readonly string[] | null | undefined
  /** Locales that the application has imported. */
  supported: readonly TLocale[]
  /** Locale returned when no requested language matches. */
  fallback: TLocale
}

/** Matches exact language tags first, then matches their base languages. */
export const matchAuthLocale = <TLocale extends AuthLocale>({
  requested,
  supported,
  fallback
}: MatchAuthLocaleOptions<TLocale>): TLocale => {
  const candidates = supported
    .map(locale => ({
      locale,
      languageTag: canonicalizeLanguageTag(locale.languageTag)
    }))
    .filter((entry): entry is { locale: TLocale; languageTag: string } =>
      Boolean(entry.languageTag)
    )
  const exactCandidates = new Map(
    candidates.map(candidate => [candidate.languageTag, candidate.locale])
  )
  const baseCandidates = new Map<string, TLocale>()

  for (const candidate of candidates) {
    const baseLanguage = candidate.languageTag.split('-')[0]
    if (!baseCandidates.has(baseLanguage)) {
      baseCandidates.set(baseLanguage, candidate.locale)
    }
  }

  for (const requestedLanguage of parseRequestedLanguages(requested)) {
    const exact = exactCandidates.get(requestedLanguage)
    if (exact) return exact

    const requestedBaseLanguage = requestedLanguage.split('-')[0]
    const baseLanguage = baseCandidates.get(requestedBaseLanguage)
    if (baseLanguage) return baseLanguage
  }

  return fallback
}

/** Applies locale messages to registered plugins without mutating them. */
export const localizeAuthPlugins = (
  plugins: AuthPlugin[],
  locale: AuthLocale
): AuthPlugin[] => {
  return plugins.map(plugin => {
    const localeMessages = locale.plugins?.[plugin.id] ?? {}
    const resolver = plugin._localizationResolver

    if (Object.keys(localeMessages).length === 0 && !resolver) {
      return plugin
    }

    const localizedMessages = deepmerge(
      deepmerge(plugin.localization ?? {}, localeMessages),
      plugin._localizationOverrides ?? {}
    )
    const localizedPlugin = {
      ...plugin,
      localization: localizedMessages
    } as AuthPlugin

    // oxlint-disable-next-line typescript/no-unnecessary-type-assertion -- UI packages augment AuthPlugin, and their builds need the augmented type here
    return (resolver?.(localizedPlugin, {
      direction: locale.direction ?? 'ltr',
      languageTag: locale.languageTag,
      localization: localizedMessages
    }) ?? localizedPlugin) as AuthPlugin
  })
}
