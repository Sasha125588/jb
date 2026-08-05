import { useQueryState } from 'nuqs'

import { catalogSearchParams } from '@/app/[locale]/(layout)/_constants'

export const useCatalogContentClient = () => {
  const [activeView] = useQueryState('view', catalogSearchParams.view)

  return { state: { activeView }, functions: {} }
}
