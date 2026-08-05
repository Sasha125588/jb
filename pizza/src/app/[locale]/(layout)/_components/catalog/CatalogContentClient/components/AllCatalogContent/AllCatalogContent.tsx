import { PizzaCard, PizzaCardSkeleton } from '../PizzaCard/PizzaCard'
import { Skeleton, Typography } from '@/components/ui'
import { pizzaCategory } from '@/generated/types/PizzaCategory'
import { IntlText } from '@/lib/i18n'

import type { PizzaProduct } from '@/generated/types/PizzaProduct'

const CATALOG_LABELS = [...Object.values(pizzaCategory)]

interface AllCatalogContentProps {
  catalog: PizzaProduct[]
}
export const AllCatalogContent = ({ catalog }: AllCatalogContentProps) => {
  const groupedCatalog = Object.groupBy(catalog, (item) => item.category)

  return (
    <div className="flex flex-1 flex-col gap-12">
      {CATALOG_LABELS.map((view) => (
        <section key={view}>
          <Typography
            as="h3"
            variant="title-lg"
            className="mb-6"
          >
            <IntlText path={`page.catalog.views.${view}`} />
          </Typography>
          <div className="grid grid-cols-4 gap-8">
            {groupedCatalog[view]?.map((pizza) => (
              <div key={pizza._id}>
                <PizzaCard pizza={pizza} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

const SKELETON_SECTION_COUNT = 3
const SKELETON_CARD_COUNT = 4

export const AllCatalogContentSkeleton = () => {
  return (
    <div
      aria-hidden="true"
      className="flex flex-1 flex-col gap-6"
    >
      {Array.from({ length: SKELETON_SECTION_COUNT }, (_, sectionIndex) => (
        <section key={sectionIndex}>
          <Skeleton className="mb-6 h-10 w-40 rounded-xl" />
          <div className="grid grid-cols-4 gap-8">
            {Array.from({ length: SKELETON_CARD_COUNT }, (_, cardIndex) => (
              <PizzaCardSkeleton key={cardIndex} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
