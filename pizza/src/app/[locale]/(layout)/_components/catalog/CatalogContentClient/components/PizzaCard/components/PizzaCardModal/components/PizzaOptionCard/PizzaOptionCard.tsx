import { CircleCheckIcon } from 'lucide-react'
import Image from 'next/image'

import { PIZZA_OPTION_VISUALS } from './constants'
import { ToggleGroupItem, Typography } from '@/components/ui'
import { IntlText } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import type { PizzaOption } from '@/generated/types'

interface PizzaOptionCardProps {
  option: PizzaOption
}

export const PizzaOptionCard = ({ option }: PizzaOptionCardProps) => {
  const visual = PIZZA_OPTION_VISUALS[option.type]

  return (
    <ToggleGroupItem
      value={option.type}
      className={cn(
        'group border-pizza-option-ink text-pizza-option-ink hover:text-pizza-option-ink relative flex h-[168px] min-w-0 flex-col items-stretch justify-between overflow-visible rounded-[18px] border-2 px-2 py-2 transition-all duration-200 ease-out hover:-translate-y-0.5 data-pressed:-translate-y-0.5 data-pressed:shadow-[4px_4px_0_0_var(--color-pizza-option-ink)] motion-reduce:transform-none motion-reduce:transition-none',
        visual.background
      )}
    >
      <CircleCheckIcon className="text-pizza-option-ink absolute top-2 right-2 opacity-0 transition-opacity group-data-pressed:opacity-100 motion-reduce:transition-none" />
      <Image
        src={visual.image}
        alt={option.type}
        width={96}
        height={96}
        className="h-20 w-full object-contain"
      />
      <Typography
        as="span"
        variant="caption"
        className="line-clamp-2 text-left leading-4 font-extrabold whitespace-normal"
      >
        <IntlText path={`pizza.${option.type}`} />
      </Typography>
      <Typography
        as="span"
        variant="body-sm"
        className="text-left text-[13px] leading-none font-extrabold"
      >
        {option.price > 0 ? '+' : ''} {option.price} $
      </Typography>
    </ToggleGroupItem>
  )
}
