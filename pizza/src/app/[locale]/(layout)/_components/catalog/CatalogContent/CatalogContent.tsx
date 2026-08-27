import { HydrationBoundary } from '@tanstack/react-query'

import { loadCatalogSearchParams } from '../../../_lib/nuqs'
import { CatalogContentClient } from '../CatalogContentClient/CatalogContentClient'
import { getCachedPizzaCatalog } from './api'

import type { CatalogPageProps } from '../../../page'

export const CatalogContent = async ({ searchParams }: CatalogPageProps) => {
  const { view } = await loadCatalogSearchParams(searchParams)
  const dehydratedState = await getCachedPizzaCatalog(view === 'all' ? undefined : view)

  return (
    <HydrationBoundary state={dehydratedState}>
      <CatalogContentClient />
    </HydrationBoundary>
  )
}
