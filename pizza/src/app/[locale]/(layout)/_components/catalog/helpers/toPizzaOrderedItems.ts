import type { CartLine } from '../types'
import type { ObjectId } from '@/generated/types'

export const toPizzaOrderedItems = (lines: CartLine[]) =>
  lines.map((line) => ({
    // The API accepts a string id, but the generated OpenAPI type is currently `object`.
    _id: line.productId as unknown as ObjectId,
    ...line,
  }))
