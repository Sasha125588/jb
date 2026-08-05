'use client'

import { useCatalogViews } from './hooks/useCatalogViews'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui'
import { IntlText } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import type { PizzaCategoryKey } from '@/generated/types/PizzaCategory'

export const CatalogViews = () => {
  const { state, functions } = useCatalogViews()

  return (
    <ToggleGroup
      className="max-w-full scrollbar-none justify-start gap-2 overflow-x-auto overflow-y-hidden bg-transparent p-0 [&::-webkit-scrollbar]:hidden"
      multiple={false}
      value={[state.activeView]}
      onValueChange={(values) => functions.onViewChange(values[0] as PizzaCategoryKey)}
    >
      {state.views.map((view) => (
        <ToggleGroupItem
          key={view}
          className={cn(
            'bg-secondary h-13 px-4 text-lg font-bold tracking-wide shadow-none transition-colors duration-200',
            'data-pressed:bg-foreground data-pressed:text-background'
          )}
          value={view}
        >
          <IntlText path={`page.catalog.views.${view}`} />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
