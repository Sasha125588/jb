import * as z from 'zod'

import {
  pizzaCategorySchema,
  pizzaIngredientTypeSchema,
  pizzaOptionTypeSchema,
  pizzaSizeSchema,
} from '@/generated/zod'

export const cartItemSchema = z.object({
  productId: z.string().trim().min(1),
  category: pizzaCategorySchema,
  size: pizzaSizeSchema,
  ingredients: pizzaIngredientTypeSchema
    .array()
    .transform((ingredients) => {
      const normalizedIngredients = ingredients.toSorted()

      return normalizedIngredients.length ? normalizedIngredients : undefined
    })
    .optional(),
  option: pizzaOptionTypeSchema.optional(),
})

export const cartLineSchema = cartItemSchema.extend({
  quantity: z.int().positive(),
})

export const cartLinesSchema = z.array(cartLineSchema)
