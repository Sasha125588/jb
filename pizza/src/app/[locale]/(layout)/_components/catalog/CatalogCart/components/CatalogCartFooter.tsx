import { useFormatter, useTranslations } from 'next-intl'

import { useCatalogCart } from '../hooks/useCatalogCart'
import { Button, DrawerFooter, Skeleton, Typography } from '@/components/ui'
import { IntlText } from '@/lib/i18n'

interface CatalogCartFooterProps {
  onRetryCalculation: () => void
  onCheckout: () => void
  state: Pick<
    ReturnType<typeof useCatalogCart>['state'],
    | 'isCatalogLoading'
    | 'isCalculationLoading'
    | 'calculation'
    | 'totalQuantity'
    | 'isCalculationError'
    | 'isCatalogError'
    | 'calculationError'
  >
}

export const CatalogCartFooter = ({
  onRetryCalculation,
  onCheckout,
  state,
}: CatalogCartFooterProps) => {
  const format = useFormatter()
  const t = useTranslations()
  const isLoading = state.isCatalogLoading || state.isCalculationLoading

  const formatMoney = (value: number) =>
    format.number(value, {
      currency: state.calculation?.commission.currency,
      currencyDisplay: 'narrowSymbol',
      maximumFractionDigits: 0,
      style: 'currency',
    })

  return (
    <DrawerFooter className="border-border bg-muted/70 gap-3 border-t px-5 py-5 backdrop-blur-sm sm:px-7 sm:py-6">
      <div className="flex items-center justify-between">
        <Typography variant="body-md">
          {t('cart.items', { count: state.totalQuantity() })}
        </Typography>
        {isLoading ? (
          <Skeleton className="bg-muted-foreground/15 h-6 w-20" />
        ) : (
          <Typography
            variant="body-md"
            className="font-semibold tabular-nums"
          >
            {state.calculation ? formatMoney(state.calculation.itemsPrice) : '—'}
          </Typography>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Typography variant="body-md">
          <IntlText path="cart.delivery" />
        </Typography>
        {isLoading ? (
          <Skeleton className="bg-muted-foreground/15 h-6 w-24" />
        ) : (
          <Typography
            variant="body-md"
            className="font-semibold tabular-nums"
          >
            {state.calculation
              ? state.calculation.commission.amount === 0
                ? t('cart.free')
                : formatMoney(state.calculation.commission.amount)
              : '—'}
          </Typography>
        )}
      </div>

      {state.isCatalogError ? (
        <Typography
          as="p"
          variant="caption"
          className="text-destructive"
        >
          <IntlText path="cart.catalogError" />
        </Typography>
      ) : state.isCalculationError ? (
        <div className="flex items-center justify-between gap-3">
          <Typography
            as="p"
            variant="caption"
            className="text-destructive"
          >
            {state.calculationError ?? t('cart.calculationError')}
          </Typography>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRetryCalculation}
          >
            <IntlText path="retry" />
          </Button>
        </div>
      ) : null}

      <Button
        type="button"
        onClick={onCheckout}
        className="bg-accent-quaternary mt-1 h-13 text-white hover:bg-orange-700"
      >
        <Typography
          as="span"
          variant="body-sm"
          className="font-semibold"
        >
          <IntlText path="cart.checkout" />
        </Typography>
      </Button>
    </DrawerFooter>
  )
}
