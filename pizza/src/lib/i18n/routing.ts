import { defineRouting } from 'next-intl/routing'

import { COOKIES } from '@/shared/constants'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'uk-UA', 'ru'],

  // Used when no locale matches
  defaultLocale: 'en',
  localeCookie: { name: COOKIES.LOCALE },
})
