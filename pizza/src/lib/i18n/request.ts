import { getRequestConfig } from 'next-intl/server'
import * as rootParams from 'next/root-params'

import { hasLocale } from './helpers'
import { routing } from './routing'

// 'a.b': 'x' => a: {b: x}
const unflatten = (flatObj: Record<string, string>) => {
  const result: Record<string, any> = {}
  for (const key in flatObj) {
    const keys = key.split('.')
    keys.reduce((acc, currentKey, index) => {
      if (index === keys.length - 1) {
        acc[currentKey] = flatObj[key]
      } else {
        acc[currentKey] = acc[currentKey] ?? {}
      }
      return acc[currentKey]
    }, result)
  }
  return result
}

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale()
    locale = hasLocale(paramValue) ? paramValue : routing.defaultLocale
  }

  return {
    locale,
    messages: unflatten((await import(`../../../locales/${locale}.json`)).default),
    timeZone: 'Europe/Kiev',
  }
})
