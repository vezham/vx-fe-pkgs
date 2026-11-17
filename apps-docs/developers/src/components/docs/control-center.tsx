import { useParams, useRouter, useRouterState } from '@tanstack/react-router'

import { useTheme } from '@vezham/docs-react/provider/base'
import { ConfiguredControlCenter as SharedControlCenter } from '@vezham/react/control-center'
import {
  localizedUrl,
  normalizeDocsRoutePath
} from '@vezham/start/runtime/docs'
import { getLanguageDisplayName } from '@vezham/start/tanstack-docs'

import { i18n } from '@app/docs'
import { controlCenter } from '@generated/navigation'

export const ControlCenter = () => {
  const { lang } = useParams({ strict: false })
  const pathname = useRouterState({ select: state => state.location.pathname })
  const locale =
    i18n.languages.find(language => language === lang) ?? i18n.defaultLanguage
  const path = normalizeDocsRoutePath({
    docsRoute: '',
    languages: i18n.languages,
    routePath: pathname
  })
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const languageLocation = (language: (typeof i18n.languages)[number]) => ({
    to: localizedUrl(i18n, language, path)
  })
  return (
    <SharedControlCenter
      appearance={{
        isDark: resolvedTheme === 'dark',
        setDark: dark => setTheme(dark ? 'dark' : 'light')
      }}
      context={{
        language: {
          value: locale,
          options: i18n.languages.map(language => ({
            value: language,
            label: getLanguageDisplayName(language),
            href: router.buildLocation(languageLocation(language)).href
          })),
          onChange: (value: string) => {
            const language = i18n.languages.find(language => language === value)
            if (language) void router.navigate(languageLocation(language))
          }
        }
      }}
      config={controlCenter}
    />
  )
}
