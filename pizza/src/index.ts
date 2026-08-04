import messages from '../locales/en.json'
import { routing } from './lib/i18n/routing'

import type { UnflattenMessages } from './lib/i18n'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: UnflattenMessages<typeof messages>
  }
}
