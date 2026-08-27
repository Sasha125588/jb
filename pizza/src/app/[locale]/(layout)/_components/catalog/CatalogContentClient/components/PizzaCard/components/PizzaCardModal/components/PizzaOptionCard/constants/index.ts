import type { PizzaOptionTypeKey } from '@/generated/types'

export const PIZZA_OPTION_VISUALS = {
  crust_thin: {
    image: '/images/pizza-options/crust_thin.webp',
    background:
      'bg-pizza-option-yellow hover:bg-pizza-option-yellow aria-pressed:bg-pizza-option-yellow',
  },
  crust_thick: {
    image: '/images/pizza-options/crust_thick.webp',
    background:
      'bg-pizza-option-green hover:bg-pizza-option-green aria-pressed:bg-pizza-option-green',
  },
  crust_cheese: {
    image: '/images/pizza-options/crust_cheese.webp',
    background: 'bg-pizza-option-pink hover:bg-pizza-option-pink aria-pressed:bg-pizza-option-pink',
  },
  cream_with: {
    image: '/images/pizza-options/cream_with.webp',
    background: 'bg-pizza-option-blue hover:bg-pizza-option-blue aria-pressed:bg-pizza-option-blue',
  },
  cream_without: {
    image: '/images/pizza-options/cream_without.webp',
    background:
      'bg-pizza-option-violet hover:bg-pizza-option-violet aria-pressed:bg-pizza-option-violet',
  },
} as const satisfies Record<PizzaOptionTypeKey, { image: string; background: string }>
