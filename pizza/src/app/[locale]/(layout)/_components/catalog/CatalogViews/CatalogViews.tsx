'use client'

import { ALL_CATALOG_VIEWS } from './constants'
import { useCatalogViews } from './hooks/useCatalogViews'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui'
import { IntlText } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import type { CatalogView } from './constants'

export const CatalogViews = () => {
  const { state, functions } = useCatalogViews()

  return (
    <CatalogViewToggleGroup
      activeView={state.activeView}
      onViewChange={functions.onViewChange}
    />
  )
}

interface CatalogViewToggleGroupProps {
  activeView: CatalogView
  disabled?: boolean
  onViewChange?: (view: CatalogView) => void
}

const CatalogViewToggleGroup = ({
  activeView,
  disabled = false,
  onViewChange,
}: CatalogViewToggleGroupProps) => (
  <ToggleGroup
    className="max-w-full scrollbar-none justify-start gap-2 overflow-x-auto overflow-y-hidden bg-transparent p-0 [&::-webkit-scrollbar]:hidden"
    data-testid="catalog-views"
    multiple={false}
    value={[activeView]}
    onValueChange={onViewChange ? (values) => onViewChange(values[0] as CatalogView) : undefined}
  >
    {ALL_CATALOG_VIEWS.map((view) => (
      <ToggleGroupItem
        key={view}
        className={cn(
          'bg-secondary h-13 px-4 text-lg font-bold tracking-wide shadow-none transition-colors duration-200',
          'data-pressed:bg-foreground data-pressed:text-background'
        )}
        disabled={disabled}
        value={view}
      >
        <IntlText path={`page.catalog.views.${view}`} />
      </ToggleGroupItem>
    ))}
  </ToggleGroup>
)

export const CatalogViewsFallback = () => {
  return (
    <CatalogViewToggleGroup
      activeView="all"
      disabled
    />
  )
}
