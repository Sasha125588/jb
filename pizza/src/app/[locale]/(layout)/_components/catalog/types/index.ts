import type { cartItemSchema, cartLineSchema } from '../schemas'
import type * as z from 'zod'

export type CartItem = z.output<typeof cartItemSchema>
export type CartLine = z.output<typeof cartLineSchema>
