import { notFound, redirect } from '@tanstack/react-router'

import type { I18nAPI } from '@vezham/docs-core/i18n'

import {
  getDefaultLocaleRedirectHref,
  isOptionalLocaleParam
} from '../../runtime/docs'

export const parseRouteLocale = <
  Language extends string,
  Params extends { lang?: string }
>(
  i18n: I18nAPI<Language>,
  params: Params
) => {
  return isOptionalLocaleParam(i18n, params.lang) ? params : false
}

export const assertRouteLocale = <
  Language extends string,
  Params extends { lang?: string }
>(
  i18n: I18nAPI<Language>,
  params: Params,
  location: { href: string }
) => {
  if (!isOptionalLocaleParam(i18n, params.lang)) {
    throw notFound()
  }

  const redirectHref = getDefaultLocaleRedirectHref(i18n, location.href)

  if (redirectHref) {
    throw redirect({
      href: redirectHref,
      statusCode: 301
    })
  }
}

export const redirectDefaultLocale = <Language extends string>(
  i18n: I18nAPI<Language>,
  location: { href: string }
) => {
  const redirectHref = getDefaultLocaleRedirectHref(i18n, location.href)

  if (redirectHref) {
    throw redirect({
      href: redirectHref,
      statusCode: 301
    })
  }
}
