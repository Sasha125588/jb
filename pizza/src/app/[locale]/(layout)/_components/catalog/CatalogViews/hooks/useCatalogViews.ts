import { useQueryState } from 'nuqs'

import { ALL_CATALOG_VIEWS } from '../constants'
import { catalogSearchParams } from '@/app/[locale]/(layout)/_constants'

import type { PizzaCategoryKey } from '@/generated/types/PizzaCategory'

export const useCatalogViews = () => {
  const [activeView, setActiveView] = useQueryState('view', catalogSearchParams.view)

  const onViewChange = (view: PizzaCategoryKey) => {
    setActiveView(view)
  }

  return { state: { activeView, views: ALL_CATALOG_VIEWS }, functions: { onViewChange } }
}
