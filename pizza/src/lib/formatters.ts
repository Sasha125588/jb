const DEFAULT_LOCALE = 'uk-UA'

function createFormatter(options: Intl.DateTimeFormatOptions, locale = DEFAULT_LOCALE) {
  return new Intl.DateTimeFormat(locale, options)
}

export const documentDateFormatter = createFormatter({
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
})

export const newsDateFormatter = createFormatter({
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})
