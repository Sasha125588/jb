import { ShoppingBasketIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { CatalogCartLine } from './CatalogCartLine'
import { Button, Skeleton, Typography } from '@/components/ui'
import { IntlText } from '@/lib/i18n'

import type { useCatalogCart } from '../hooks/useCatalogCart'

interface CatalogCartContentProps {
  functions: Pick<
    ReturnType<typeof useCatalogCart>['functions'],
    'onRetryCatalog' | 'onRemove' | 'onDecrement' | 'onIncrement'
  >
  state: Pick<
    ReturnType<typeof useCatalogCart>['state'],
    'hasLines' | 'isCatalogLoading' | 'lines' | 'currency' | 'isCatalogError'
  >
}

export const CatalogCartContent = ({ functions, state }: CatalogCartContentProps) => {
  const t = useTranslations()

  if (!state.hasLines)
    return (
      <div className="flex h-full min-h-72 flex-col items-center justify-center px-8 text-center">
        <div className="bg-muted mb-5 flex size-20 items-center justify-center rounded-full">
          <ShoppingBasketIcon
            aria-hidden="true"
            className="text-muted-foreground size-9"
          />
        </div>
        <Typography
          as="h3"
          variant="title-sm"
        >
          <IntlText path="cart.empty.title" />
        </Typography>
        <Typography
          as="p"
          variant="body-sm"
          className="text-muted-foreground mt-2 max-w-72"
        >
          <IntlText path="cart.empty.description" />
        </Typography>
      </div>
    )

  if (state.isCatalogLoading)
    return (
      <div aria-label={t('loading')}>
        {state.lines.map((item) => (
          <div
            key={item.lineId}
            className="border-border flex gap-4 border-b py-6"
          >
            <Skeleton className="size-22 shrink-0 rounded-full" />
            <div className="flex flex-1 flex-col gap-3 pt-1">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="mt-4 h-9 w-full" />
            </div>
          </div>
        ))}
      </div>
    )

  if (state.isCatalogError)
    return (
      <div className="flex min-h-72 flex-col items-center justify-center text-center">
        <Typography
          as="p"
          variant="body-sm"
          className="text-muted-foreground"
        >
          <IntlText path="cart.catalogError" />
        </Typography>
        <Button
          type="button"
          variant="secondary"
          onClick={functions.onRetryCatalog}
          className="mt-4"
        >
          <IntlText path="retry" />
        </Button>
      </div>
    )

  return state.lines.map((line) => (
    <CatalogCartLine
      key={line.lineId}
      currency={state.currency}
      item={line}
      onRemove={() => functions.onRemove(line.lineId)}
      onDecrement={() => functions.onDecrement(line.lineId)}
      onIncrement={() => functions.onIncrement(line.lineId)}
    />
  ))
}
