import { useQueryState } from 'nuqs'

import { catalogSearchParams } from '@/app/[locale]/(layout)/_constants'

import type { CatalogView } from '../constants'

export const useCatalogViews = () => {
  const [activeView, setActiveView] = useQueryState('view', catalogSearchParams.view)

  const onViewChange = (view: CatalogView) => {
    setActiveView(view)
  }

  return { state: { activeView }, functions: { onViewChange } }
}
