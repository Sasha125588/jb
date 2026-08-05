import Image from 'next/image'
import { Suspense } from 'react'

import { CatalogContent, CatalogSearch, CatalogViews } from './_components/catalog'
import { Typography } from '@/components/ui'
import { IntlText } from '@/lib/i18n'

import type { PizzaCategoryKey } from '@/generated/types/PizzaCategory'

export interface CatalogPageProps {
  searchParams: Promise<{ view: PizzaCategoryKey }>
}

const CatalogPage = ({ searchParams }: CatalogPageProps) => {
  return (
    <div className="flex flex-col gap-6 sm:pt-10 sm:pb-28">
      <div className="flex items-end gap-2">
        <CatalogSearch />
        {/* <CatalogFiltersMobile /> */}
      </div>

      <Suspense>
        <CatalogViews />
      </Suspense>

      <div className="grid gap-10  lg:gap-4">
        <aside className="hidden flex-col gap-6 lg:flex">{/* <CatalogFiltersDesktop /> */}</aside>

        <main className="flex justify-between gap-8 pr-10">
          <Suspense>
            <CatalogContent searchParams={searchParams} />
          </Suspense>
          <aside>
            <Typography
              as="span"
              variant="title-md"
              className="text-background dark:text-foreground/90 absolute w-65 p-4"
            >
              <IntlText path="banner.title" />
            </Typography>
            <Image
              src="/assets/images/Banner.png"
              alt="Banner"
              width={272}
              height={365}
            />
          </aside>
        </main>
      </div>
    </div>
  )
}

export default CatalogPage
