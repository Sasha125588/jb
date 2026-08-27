import { RefreshCwIcon, ShoppingBasketIcon } from 'lucide-react'
import { catchError } from 'next/error'

import { Button } from '@/components/ui'
import { IntlText } from '@/lib/i18n'

import type { ErrorInfo } from 'next/error'

const CatalogCartErrorFallback = (_props: object, { retry }: ErrorInfo) => (
  <Button
    type="button"
    variant="destructive"
    onClick={retry}
    className="h-12"
  >
    <ShoppingBasketIcon />
    <IntlText path="retry" />
    <RefreshCwIcon />
    <span className="sr-only">
      <IntlText path="error.default" />
    </span>
  </Button>
)

export const CatalogCartErrorBoundary = catchError(CatalogCartErrorFallback)
