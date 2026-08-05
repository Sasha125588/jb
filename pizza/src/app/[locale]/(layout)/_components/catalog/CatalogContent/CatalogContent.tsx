import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { loadCatalogSearchParams } from '../../../_lib/nuqs'
import { CatalogContentClient } from '../CatalogContentClient/CatalogContentClient'
import { getPizzaCatalogQueryOptions } from '@/generated/hooks'
import { getQueryClient } from '@/lib'

import type { CatalogPageProps } from '../../../page'

export const CatalogContent = async ({ searchParams }: CatalogPageProps) => {
  const { view } = await loadCatalogSearchParams(searchParams)

  const queryClient = getQueryClient()

  queryClient.prefetchQuery(
    getPizzaCatalogQueryOptions({
      query: { category: view === 'all' ? undefined : view },
    })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogContentClient />
    </HydrationBoundary>
  )
}
