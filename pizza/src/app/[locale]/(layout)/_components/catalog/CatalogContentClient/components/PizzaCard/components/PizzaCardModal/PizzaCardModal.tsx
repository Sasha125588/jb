import { wrap } from '@reatom/core'
import { reatomFactoryComponent } from '@reatom/react'
import { CircleCheckIcon } from 'lucide-react'
import Image from 'next/image'
import { createModal } from 'react-modal-minimanager'

import { cartAtom, reatomProductConfigurator } from '../../../../../model'
import { PizzaOptionCard } from './components/PizzaOptionCard/PizzaOptionCard'
import { Button, Modal, ToggleGroup, ToggleGroupItem, Typography } from '@/components/ui'
import { IntlText } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import type { CartItem } from '../../../../../types'
import type {
  PizzaIngredientTypeKey,
  PizzaOptionTypeKey,
  PizzaProduct,
  PizzaSizeKey,
} from '@/generated/types'

interface PizzaCardModalAddProps {
  mode?: 'add'
  pizza: PizzaProduct
}

interface PizzaCardModalEditProps {
  line: CartItem
  lineId: string
  mode: 'edit'
  pizza: PizzaProduct
}

export type PizzaCardModalProps = PizzaCardModalAddProps | PizzaCardModalEditProps

export const PizzaCardModal = createModal<PizzaCardModalProps>(
  reatomFactoryComponent(
    (initialProps, { name }) => {
      const configurator = reatomProductConfigurator(initialProps.pizza, {
        initialItem: initialProps.mode === 'edit' ? initialProps.line : undefined,
        name: `${name}.config`,
      })

      return (props) => {
        const { isOpen, close, mode, pizza } = props

        const cartItem = configurator.cartItem()
        const selectedItemSize = configurator.selectedSize()
        const selectedOption = configurator.selectedOptionType()
        const selectedSize = configurator.selectedSizeType()
        const selectedToppings = configurator.selectedIngredientTypes()

        return (
          <Modal
            opened={isOpen}
            onOpenChange={(open) => {
              if (!open) close()
            }}
            className="h-[735px] min-w-[960px]"
          >
            <div className="flex h-full min-h-0">
              <div className="relative flex-3/5">
                <Image
                  src={`/api/api${pizza.img}`}
                  alt={pizza.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex h-full flex-2/5 flex-col gap-4 py-6">
                <div className="flex flex-col space-y-2">
                  <Typography
                    as="h3"
                    variant="title-md"
                  >
                    {pizza.name}
                  </Typography>
                  <Typography
                    as="span"
                    variant="caption"
                    className="text-neutral-700"
                  >
                    {selectedItemSize?.volume} <IntlText path="centimeters" />
                    {selectedOption && (
                      <>
                        {', '}
                        <span className="lowercase">
                          <IntlText path={`pizza.${selectedOption}`} />
                        </span>
                      </>
                    )}
                  </Typography>
                  <div className="flex flex-wrap gap-x-1">
                    {selectedToppings.map((ingredient, index) => (
                      <Typography
                        key={ingredient}
                        as="span"
                        variant="body-sm"
                        className={cn(
                          'after:content-[","] last:after:content-none',
                          index === 0 ? 'first-letter:uppercase' : 'lowercase'
                        )}
                      >
                        <IntlText path={ingredient} />
                      </Typography>
                    ))}
                  </div>
                </div>
                <ToggleGroup
                  className="bg-muted max-w-full scrollbar-none justify-start gap-2 overflow-x-auto overflow-y-hidden rounded-full p-1 [&::-webkit-scrollbar]:hidden"
                  data-testid="catalog-views"
                  multiple={false}
                  value={selectedSize ? [selectedSize] : []}
                  onValueChange={wrap((values) => {
                    const nextSize = values[0] as PizzaSizeKey | undefined

                    if (nextSize) configurator.selectedSizeType.set(nextSize)
                  })}
                >
                  {pizza.sizes.map((size) => (
                    <ToggleGroupItem
                      key={size.type}
                      value={size.type}
                      className={cn(
                        'h-10 px-3 text-lg font-bold tracking-wide transition-colors duration-200',
                        'data-pressed:bg-background data-pressed:drop-shadow-sm'
                      )}
                    >
                      <IntlText path={`pizza.sizes.${size.type}`} />
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                <div className="mt-2 mb-2 flex min-h-0 flex-1 [scrollbar-width:thin] [scrollbar-color:var(--color-neutral-300)_transparent] flex-col overflow-x-hidden overflow-y-scroll pr-2 pb-2 dark:[scrollbar-color:var(--color-neutral-700)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-track]:bg-transparent">
                  {!!pizza.ingredients?.length && (
                    <div className="flex flex-col gap-2">
                      <Typography
                        as="h4"
                        variant="title-md"
                        className="font-medium tracking-tight"
                      >
                        <IntlText path="addToTaste" />
                      </Typography>
                      <ToggleGroup
                        multiple={true}
                        value={selectedToppings}
                        className="grid grid-cols-3 gap-3"
                        onValueChange={wrap((values) =>
                          configurator.selectedIngredientTypes.set(
                            values as PizzaIngredientTypeKey[]
                          )
                        )}
                      >
                        {pizza.ingredients.map((item) => (
                          <ToggleGroupItem
                            key={item.type}
                            value={item.type}
                            className="group bg-muted relative flex h-[168px] flex-col items-center justify-between rounded-xl border-[1.5px] border-transparent data-pressed:border-orange-500"
                          >
                            <CircleCheckIcon className="absolute right-0 m-1 text-orange-500 opacity-0 transition-opacity group-data-pressed:opacity-100" />
                            <div>
                              <Image
                                src={`/api/api${item.img}`}
                                alt={item.type}
                                width={78}
                                height={78}
                                className="mt-1"
                              />
                              <Typography
                                as="h4"
                                variant="caption"
                                className="text-left leading-4 wrap-break-word whitespace-pre-wrap"
                              >
                                <IntlText path={item.type} />
                              </Typography>
                            </div>
                            <Typography
                              as="p"
                              variant="body-sm"
                              className="mb-3 text-[15px] font-semibold"
                            >
                              <span className="pr-px">+</span>
                              {item.price} $
                            </Typography>
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>
                  )}

                  {!!pizza.options?.length && (
                    <div className="mt-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-0.5">
                        <Typography
                          id="pizza-options-title"
                          as="h4"
                          variant="title-md"
                          className="font-extrabold tracking-tight"
                        >
                          <IntlText path="pizza.options.title" />
                        </Typography>
                        <Typography
                          as="p"
                          variant="caption"
                          className="text-muted-foreground"
                        >
                          <IntlText path="pizza.options.description" />
                        </Typography>
                      </div>
                      <ToggleGroup
                        multiple={false}
                        value={selectedOption ? [selectedOption] : []}
                        aria-labelledby="pizza-options-title"
                        className="grid w-full grid-cols-3 gap-3 px-1 pb-1"
                        onValueChange={wrap((values) =>
                          configurator.selectedOptionType.set(values[0] as PizzaOptionTypeKey)
                        )}
                      >
                        {pizza.options.map((option) => (
                          <PizzaOptionCard
                            key={option.type}
                            option={option}
                          />
                        ))}
                      </ToggleGroup>
                    </div>
                  )}
                </div>
                <Button
                  disabled={!cartItem}
                  onClick={wrap(() => {
                    if (!cartItem) return

                    if (mode === 'edit') cartAtom.replace(props.lineId, cartItem)
                    else cartAtom.add(cartItem)

                    close()
                  })}
                  className="bg-accent-quaternary h-13 shrink-0 place-items-end text-white hover:bg-orange-700"
                >
                  <Typography
                    as="p"
                    variant="body-sm"
                  >
                    <IntlText
                      path={mode === 'edit' ? 'updateCartWithPrice' : 'addToCartWithPrice'}
                      values={{ price: String(configurator.price()) }}
                    />{' '}
                    $
                  </Typography>
                </Button>
              </div>
            </div>
          </Modal>
        )
      }
    },
    { deps: ['line', 'mode', 'pizza'], name: 'PizzaCardModal' }
  )
)
