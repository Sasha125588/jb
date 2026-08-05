import { parseAsStringLiteral } from 'nuqs/server'

import { ALL_CATALOG_VIEWS } from '../_components/catalog/CatalogViews/constants'

export const catalogSearchParams = {
  view: parseAsStringLiteral(ALL_CATALOG_VIEWS)
    .withDefault('all')
    .withOptions({ clearOnDefault: false }),
}
