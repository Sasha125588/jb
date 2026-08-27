import { atom, computed, withActions, withLocalStorage } from '@reatom/core'

import { getCartLineId } from '../helpers/getCartLineId'
import { cartItemSchema, cartLinesSchema } from '../schemas'
import { LOCAL_STORAGE } from '@/shared/constants/localStorage'

import type { CartItem, CartLine } from '../types'

export const cartAtom = atom<CartLine[]>([], 'catalog.cart').extend(
  withActions((cart) => ({
    add: (item: CartItem) => {
      const normalizedItem = cartItemSchema.parse(item)
      const lineId = getCartLineId(normalizedItem)

      return cart.set((lines) => {
        const existingLine = lines.find((line) => getCartLineId(line) === lineId)

        if (!existingLine) return [...lines, { ...normalizedItem, quantity: 1 }]

        return lines.map((line) =>
          line === existingLine ? { ...line, quantity: line.quantity + 1 } : line
        )
      })
    },
    remove: (lineId: string) =>
      cart.set((lines) => lines.filter((line) => getCartLineId(line) !== lineId)),
    replace: (lineId: string, item: CartItem) => {
      const normalizedItem = cartItemSchema.parse(item)
      const nextLineId = getCartLineId(normalizedItem)

      return cart.set((lines) => {
        const currentIndex = lines.findIndex((line) => getCartLineId(line) === lineId)
        if (currentIndex === -1) return lines

        const currentLine = lines[currentIndex]
        const collisionIndex = lines.findIndex(
          (line, index) => index !== currentIndex && getCartLineId(line) === nextLineId
        )

        if (collisionIndex !== -1) {
          return lines.flatMap((line, index) => {
            if (index === currentIndex) return []
            if (index === collisionIndex)
              return [{ ...line, quantity: line.quantity + currentLine.quantity }]

            return [line]
          })
        }

        return lines.map((line, index) =>
          index === currentIndex ? { ...normalizedItem, quantity: currentLine.quantity } : line
        )
      })
    },
    increment: (lineId: string) =>
      cart.set((lines) =>
        lines.map((line) =>
          getCartLineId(line) === lineId ? { ...line, quantity: line.quantity + 1 } : line
        )
      ),
    decrement: (lineId: string) =>
      cart.set((lines) =>
        lines.map((line) =>
          getCartLineId(line) === lineId
            ? { ...line, quantity: Math.max(1, line.quantity - 1) }
            : line
        )
      ),
    clear: () => cart.set([]),
  })),
  (cart) => ({
    totalQuantity: computed(
      () => cart().reduce((total, line) => total + line.quantity, 0),
      `${cart.name}.totalQuantity`
    ),
  }),
  withLocalStorage({
    key: LOCAL_STORAGE.CART,
    version: 1,
    schema: cartLinesSchema,
  })
)
