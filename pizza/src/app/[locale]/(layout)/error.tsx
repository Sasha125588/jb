'use client'

import { PageFallback } from '../../_components/PageFallback/PageFallback'
import { Button } from '@/components/ui/button'
import { IntlText } from '@/lib/i18n/i18n-text'

const ErrorPage = () => (
  <PageFallback
    variant="error"
    title={<IntlText path="page.error.title" />}
    description={<IntlText path="page.error.description" />}
    action={
      <Button
        variant="accent"
        className="h-13 w-full text-base"
        nativeButton={false}
        render={<a href="/" />}
      >
        <IntlText path="button.viewMenu" />
      </Button>
    }
  />
)

export default ErrorPage
