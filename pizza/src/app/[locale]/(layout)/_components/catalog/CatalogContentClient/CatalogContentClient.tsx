'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'

import { ALL_CATALOG_VIEWS } from '../CatalogViews/constants'
import { AllCatalogContent, AllCatalogContentSkeleton } from './components'
import { PizzaCard, PizzaCardSkeleton } from './components/PizzaCard/PizzaCard'
import { useCatalogContentClient } from './hooks/useCatalogContentClient'
import { getPizzaCatalogQueryOptions } from '@/generated/hooks'

const CATALOG_SKELETON_CARD_COUNT = 8

export const CatalogContentClient = () => {
  const { state } = useCatalogContentClient()

  return (
    <Suspense fallback={<CatalogContentClientSkeleton activeView={state.activeView} />}>
      <CatalogContentQuery activeView={state.activeView} />
    </Suspense>
  )
}

interface CatalogContentQueryProps {
  activeView: (typeof ALL_CATALOG_VIEWS)[number]
}

const CatalogContentQuery = ({ activeView }: CatalogContentQueryProps) => {
  const pizzaCatalogResponse = useSuspenseQuery(
    getPizzaCatalogQueryOptions({
      query: { category: activeView === 'all' ? undefined : activeView },
    })
  )

  if (activeView === 'all') return <AllCatalogContent catalog={pizzaCatalogResponse.data.catalog} />

  return (
    <div className="grid flex-1 grid-cols-4 gap-x-8 gap-y-18">
      {pizzaCatalogResponse.data.catalog.map((item) => (
        <PizzaCard
          key={item._id}
          pizza={item}
        />
      ))}
    </div>
  )
}

export const CatalogContentClientSkeleton = ({ activeView }: CatalogContentQueryProps) => {
  if (activeView === 'all') return <AllCatalogContentSkeleton />

  return (
    <div
      aria-hidden="true"
      className="grid flex-1 grid-cols-4 gap-x-8 gap-y-18"
    >
      {Array.from({ length: CATALOG_SKELETON_CARD_COUNT }, (_, cardIndex) => (
        <PizzaCardSkeleton key={cardIndex} />
      ))}
    </div>
  )
}
