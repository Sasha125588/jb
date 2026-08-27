import { atom, computed } from '@reatom/core'

import { cartItemSchema } from '../schemas'

import type { CartItem } from '../types'
import type {
  PizzaIngredientTypeKey,
  PizzaOptionTypeKey,
  PizzaProduct,
  PizzaSizeKey,
} from '@/generated/types'

interface ProductConfiguratorOptions {
  initialItem?: CartItem
  name?: string
}

export const reatomProductConfigurator = (
  product: PizzaProduct,
  options: ProductConfiguratorOptions = {}
) => {
  const initialSize = product.sizes.some((size) => size.type === options.initialItem?.size)
    ? options.initialItem!.size
    : product.sizes[0].type

  const selectedSizeType = atom<PizzaSizeKey>(initialSize, `${options.name}.selectedSizeType`)

  const initialIngredients = (options.initialItem?.ingredients ?? []).filter((ingredientType) =>
    product.ingredients?.some((ingredient) => ingredient.type === ingredientType)
  )

  const selectedIngredientTypes = atom<PizzaIngredientTypeKey[]>(
    initialIngredients,
    `${options.name}.selectedIngredientTypes`
  )

  const initialOption = product.options?.some(
    (option) => option.type === options.initialItem?.option
  )
    ? options.initialItem?.option
    : undefined

  const selectedOptionType = atom<PizzaOptionTypeKey | undefined>(
    initialOption,
    `${options.name}.selectedOptionType`
  )

  const selectedSize = computed(
    () => product.sizes.find((size) => size.type === selectedSizeType()),
    `${options.name}.selectedSize`
  )
  const selectedIngredients = computed(
    () =>
      product.ingredients?.filter((ingredient) =>
        selectedIngredientTypes().includes(ingredient.type)
      ) ?? [],
    `${options.name}.selectedIngredients`
  )
  const selectedOption = computed(
    () => product.options?.find((option) => option.type === selectedOptionType()),
    `${options.name}.selectedOption`
  )
  const price = computed(
    () =>
      (selectedSize()?.price ?? 0) +
      selectedIngredients().reduce((total, ingredient) => total + ingredient.price, 0) +
      (selectedOption()?.price ?? 0),
    `${options.name}.price`
  )
  const cartItem = computed<CartItem | null>(
    () =>
      cartItemSchema.parse({
        productId: product._id,
        category: product.category,
        size: selectedSizeType(),
        ingredients: selectedIngredientTypes(),
        option: selectedOptionType(),
      }),
    `${options.name}.cartItem`
  )

  return {
    cartItem,
    price,
    selectedSize,
    selectedIngredients,
    selectedOption,
    selectedSizeType,
    selectedIngredientTypes,
    selectedOptionType,
  }
}
