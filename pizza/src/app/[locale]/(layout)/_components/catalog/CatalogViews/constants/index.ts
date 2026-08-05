import { pizzaCategory } from '@/generated/types/PizzaCategory'

export const ALL_CATALOG_VIEWS = ['all' as const, ...Object.values(pizzaCategory)]

export type CatalogView = (typeof ALL_CATALOG_VIEWS)[number]
