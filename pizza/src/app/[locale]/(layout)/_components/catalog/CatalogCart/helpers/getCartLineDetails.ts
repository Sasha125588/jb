import type { CartLine } from '../../types'
import type { PizzaProduct } from '@/generated/types'

type PizzaSize = PizzaProduct['sizes'][number]
type PizzaOption = NonNullable<PizzaProduct['options']>[number]

export interface CartLineDetails {
  option?: PizzaOption
  size: PizzaSize
  totalPrice: number
}

export const getCartLineDetails = (
  line: CartLine,
  product: PizzaProduct
): CartLineDetails | undefined => {
  if (line.category !== product.category) return

  const size = product.sizes.find((item) => item.type === line.size)
  if (!size) return

  const option = line.option
    ? product.options?.find((item) => item.type === line.option)
    : undefined

  if (line.option && !option) return

  let ingredientsPrice = 0

  for (const ingredientType of line.ingredients ?? []) {
    const ingredient = product.ingredients?.find((item) => item.type === ingredientType)

    if (!ingredient) return
    ingredientsPrice += ingredient.price
  }

  return {
    option,
    size,
    totalPrice: (size.price + (option?.price ?? 0) + ingredientsPrice) * line.quantity,
  }
}
