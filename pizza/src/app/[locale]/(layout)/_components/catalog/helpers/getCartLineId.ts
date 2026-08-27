import type { CartItem } from '../types'

export const getCartLineId = ({ productId, size, option, ingredients }: CartItem) =>
  JSON.stringify([productId, size, option, ingredients])
