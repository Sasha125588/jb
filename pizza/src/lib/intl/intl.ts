// import { createIntl, createIntlCache } from 'react-intl/server'

// import enMessages from '../../../locales/en.json'
// import ukUAMessages from '../../../locales/uk-UA.json'

// export const LOCALES = ['en', 'uk-UA'] as const
// export const DEFAULT_LOCALE = 'en'

// const localesMap = {
//   [LOCALES[0]]: enMessages,
//   [LOCALES[1]]: ukUAMessages,
// }

// export const getMessages = (locale: Locale) => localesMap[locale]

// const cache = createIntlCache()

// export const getIntl = (locale: Locale) =>
//   createIntl(
//     {
//       locale,
//       messages: getMessages(locale),
//     },
//     cache
//   )

// export const isValidLocale = (locale: string): locale is Locale =>
//   LOCALES.includes(locale as Locale)
