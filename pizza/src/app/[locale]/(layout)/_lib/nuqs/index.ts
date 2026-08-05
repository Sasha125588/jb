// catalog-search-params.server.ts
import { createLoader } from 'nuqs/server'

import { catalogSearchParams } from '../../_constants'

export const loadCatalogSearchParams = createLoader(catalogSearchParams)
