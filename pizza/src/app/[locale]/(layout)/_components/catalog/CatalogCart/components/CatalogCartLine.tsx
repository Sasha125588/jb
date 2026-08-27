import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import Image from 'next/image'

import { PizzaCardModal } from '../../CatalogContentClient/components/PizzaCard/components/PizzaCardModal/PizzaCardModal'
import { Button, IconButton, Typography } from '@/components/ui'
import { IntlText } from '@/lib/i18n'

import type { CatalogCartItem } from '../hooks/useCatalogCart'

interface CatalogCartLineProps {
  currency: string | undefined
  item: CatalogCartItem
  onDecrement: () => void
  onIncrement: () => void
  onRemove: () => void
}

export const CatalogCartLine = ({
  currency,
  item,
  onDecrement,
  onIncrement,
  onRemove,
}: CatalogCartLineProps) => {
  const format = useFormatter()
  const t = useTranslations()
  const { details, line, product, lineId } = item

  const onEdit = () => {
    PizzaCardModal.open({
      line: line,
      lineId: lineId,
      mode: 'edit',
      pizza: product,
    })
  }

  const formatMoney = (value: number) =>
    format.number(value, {
      currency: currency ?? 'USD',
      currencyDisplay: 'narrowSymbol',
      maximumFractionDigits: 0,
      style: 'currency',
    })

  return (
    <article className="border-border grid grid-cols-[4.5rem_minmax(0,1fr)_auto] gap-x-3 gap-y-3 border-b py-5 sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:gap-x-4 sm:py-6">
      <div className="flex size-18 items-center justify-center self-start overflow-hidden rounded-full bg-neutral-100 sm:size-22">
        <Image
          src={`/api/api${product.img}`}
          alt=""
          width={88}
          height={88}
          className="size-18 object-contain sm:size-22"
        />
      </div>

      <div className="min-w-0 self-start">
        <Typography
          as="h3"
          variant="body-lg"
          className="truncate text-[1.1rem] font-semibold"
        >
          {product.name}
        </Typography>

        <div className="text-muted-foreground mt-1 space-y-0.5 text-sm leading-5">
          <p>
            <IntlText path={`pizza.sizes.${line.size}`} />
            {details.size.volume ? (
              <>
                {' '}
                {details.size.volume} <IntlText path="centimeters" />
              </>
            ) : null}
            {details.option ? (
              <>
                {', '}
                <span className="lowercase">
                  <IntlText path={`pizza.${details.option.type}`} />
                </span>
              </>
            ) : null}
          </p>
          {product.description ? <p className="line-clamp-2">{product.description}</p> : null}
          {!!line.ingredients?.length && (
            <p className="line-clamp-2">
              {line.ingredients.map((ingredient, index) => (
                <span key={ingredient}>
                  {index ? ', ' : '+ '}
                  <IntlText path={ingredient} />
                </span>
              ))}
            </p>
          )}
        </div>
      </div>

      <IconButton
        type="button"
        variant="ghost"
        size="sm"
        rounded
        aria-label={t('cart.remove', { name: product.name })}
        onClick={onRemove}
        className="text-accent-quaternary hover:bg-orange-50 dark:hover:bg-orange-950/30"
      >
        <Trash2Icon />
      </IconButton>

      <Typography
        as="p"
        variant="body-md"
        className="col-start-1 row-start-2 self-center font-semibold tabular-nums"
      >
        {formatMoney(details.totalPrice)}
      </Typography>

      <div className="col-span-2 col-start-2 row-start-2 flex items-center justify-end gap-1 self-center sm:gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="text-accent-quaternary px-2 hover:bg-orange-50 hover:text-orange-700 sm:px-3 dark:hover:bg-orange-950/30"
        >
          <IntlText path="cart.edit" />
        </Button>

        <div className="bg-muted flex h-9 items-center rounded-full px-1">
          <IconButton
            type="button"
            variant="ghost"
            size="sm"
            rounded
            aria-label={t('cart.decreaseQuantity', { name: product.name })}
            disabled={line.quantity === 1}
            onClick={onDecrement}
            className="size-8"
          >
            <MinusIcon />
          </IconButton>
          <span className="min-w-8 text-center text-sm font-semibold tabular-nums">
            {line.quantity}
          </span>
          <IconButton
            type="button"
            variant="ghost"
            size="sm"
            rounded
            aria-label={t('cart.increaseQuantity', { name: product.name })}
            onClick={onIncrement}
            className="size-8"
          >
            <PlusIcon />
          </IconButton>
        </div>
      </div>
    </article>
  )
}
