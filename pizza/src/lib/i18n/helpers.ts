import { hasLocale as hasLocaleImport } from 'next-intl'

import { routing } from './routing'

export const hasLocale = (locale: unknown) => hasLocaleImport(routing.locales, locale)
