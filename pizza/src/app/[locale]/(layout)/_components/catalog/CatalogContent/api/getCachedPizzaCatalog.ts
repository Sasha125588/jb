import { dehydrate } from '@tanstack/react-query'
import { cacheLife, cacheTag } from 'next/cache'

import { getPizzaCatalogQueryOptions } from '@/generated/hooks'
import { getQueryClient } from '@/lib'

import type { PizzaCategoryKey } from '@/generated/types/PizzaCategory'

export const getCachedPizzaCatalog = async (category?: PizzaCategoryKey) => {
  'use cache'
  cacheLife('hours')
  cacheTag('pizza-catalog')

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(
    getPizzaCatalogQueryOptions(
      {
        query: { category },
      },
      { baseURL: 'https://juniorsbootcamp.ru' }
    )
  )

  return dehydrate(queryClient)
}
