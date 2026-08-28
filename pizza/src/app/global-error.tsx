'use client'

import './globals.css'
import en from '../../locales/en.json'
import ru from '../../locales/ru.json'
import uk from '../../locales/uk-UA.json'
import { PageFallback } from './_components/PageFallback/PageFallback'
import { nunito } from './_fonts'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const messagesByLocale = { en, ru, 'uk-UA': uk }

const GlobalError = () => {
  const locale = (window.location.pathname.split('/')[1] ?? 'en') as 'ru' | 'uk-UA' | 'en'
  const messages = messagesByLocale[locale]

  return (
    <html
      lang={locale}
      className={cn('h-full antialiased', nunito.variable)}
      suppressHydrationWarning
    >
      <head>
        <title>{messages['page.error.title']} | JB Pizza</title>
        <meta
          name="robots"
          content="noindex"
        />
      </head>
      <body className="mx-auto flex min-h-svh max-w-7xl flex-col px-4 py-6 sm:py-16">
        <PageFallback
          variant="error"
          title={messages['page.error.title']}
          description={messages['page.error.description']}
          action={
            <Button
              variant="accent"
              className="h-13 w-full text-base"
              nativeButton={false}
              render={<a href="/" />}
            >
              {messages['button.viewMenu']}
            </Button>
          }
        />
      </body>
    </html>
  )
}

export default GlobalError
