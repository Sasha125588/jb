import { HydrationBoundary } from '@tanstack/react-query'

import { loadCatalogSearchParams } from '../../../_lib/nuqs'
import { CatalogContentClient } from '../CatalogContentClient/CatalogContentClient'
import { getCachedPizzaCatalogState } from './api'

import type { CatalogPageProps } from '../../../page'

export const CatalogContent = async ({ searchParams }: CatalogPageProps) => {
  const { view } = await loadCatalogSearchParams(searchParams)
  const dehydratedState = await getCachedPizzaCatalogState(view === 'all' ? undefined : view)

  return (
    <HydrationBoundary state={dehydratedState}>
      <CatalogContentClient />
    </HydrationBoundary>
  )
}
