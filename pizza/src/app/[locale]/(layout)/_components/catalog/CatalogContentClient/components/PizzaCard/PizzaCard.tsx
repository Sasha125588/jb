import Image from 'next/image'

import { Button, Skeleton, Typography } from '@/components/ui'
import { IntlText } from '@/lib/i18n'

import type { PizzaProduct } from '@/generated/types/PizzaProduct'
import type { MessagePathWithoutValues } from '@/lib/i18n'

interface PizzaCardProps {
  pizza: PizzaProduct
}

export const PizzaCard = ({ pizza }: PizzaCardProps) => {
  let message: MessagePathWithoutValues | undefined = undefined

  if (pizza.isGlutenFree) message = 'pizza.glutenFree'
  if (pizza.isVegetarian) message = 'pizza.vegetarian'
  if (pizza.isNovelty) message = 'pizza.novelty'
  if (pizza.isHit) message = 'pizza.hit'

  return (
    <article className="group flex h-82 w-50 flex-col justify-between rounded-3xl transition-colors duration-200 ease-in-out hover:bg-orange-500">
      <div>
        <div className="relative flex justify-center rounded-3xl bg-neutral-100 pt-2 transition-colors duration-200 ease-in-out group-hover:bg-transparent">
          {message && (
            <div className="bg-accent-quaternary absolute top-2 left-2 rounded-full px-2">
              <Typography
                variant="caption"
                className="text-background dark:text-foreground py-1 font-semibold lowercase"
              >
                <IntlText path={message} />
              </Typography>
            </div>
          )}

          <Image
            src={`https://juniorsbootcamp.ru/api${pizza.img}`}
            alt={pizza.name}
            width={200}
            height={198}
          />
        </div>
        <Typography
          as="h3"
          variant="title-sm"
          className="group-hover:text-background mt-2 px-2 transition-colors"
        >
          {pizza.name}
        </Typography>
      </div>
      <Button className="hover:bg-background group/button bg-secondary text-foreground mx-2 mb-2 flex items-center justify-between px-5">
        <Typography
          as="span"
          variant="caption"
        >
          <IntlText path="price.from" /> {pizza.sizes[0].price} $
        </Typography>
        <span className="text-xl font-semibold transition-transform group-hover/button:rotate-45">
          +
        </span>
      </Button>
    </article>
  )
}

export const PizzaCardSkeleton = () => {
  return (
    <article
      aria-hidden="true"
      className="flex h-82 w-50 flex-col justify-between rounded-3xl"
    >
      <div>
        <Skeleton className="h-[206px] w-full rounded-3xl" />
        <div className="mt-2 px-2">
          <Skeleton className="h-7 w-3/4 rounded-lg" />
        </div>
      </div>
      <Skeleton className="mx-2 mb-2 h-9 rounded-4xl" />
    </article>
  )
}
