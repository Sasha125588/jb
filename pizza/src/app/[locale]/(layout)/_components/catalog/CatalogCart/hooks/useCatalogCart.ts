import { useWrap } from '@reatom/react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'

import { getCartLineId } from '../../helpers/getCartLineId'
import { toPizzaOrderedItems } from '../../helpers/toPizzaOrderedItems'
import { cartAtom } from '../../model'
import { getCartLineDetails } from '../helpers/getCartLineDetails'
import { calculatePizzaOrder } from '@/generated/clients'
import { useGetPizzaCatalog } from '@/generated/hooks'

import type { CartLine } from '../../types'
import type { CartLineDetails } from '../helpers/getCartLineDetails'
import type { PizzaProduct } from '@/generated/types'

export interface CatalogCartItem {
  details: CartLineDetails
  line: CartLine
  lineId: string
  product: PizzaProduct
}

interface UseCatalogCartOptions {
  open: boolean
}

export const useCatalogCart = ({ open }: UseCatalogCartOptions) => {
  const totalQuantity = cartAtom.totalQuantity
  const hasLines = cartAtom().length > 0

  const pizzaCatalogQuery = useGetPizzaCatalog(
    { query: { category: undefined } },
    {
      query: { enabled: open && hasLines },
    }
  )

  const catalog = pizzaCatalogQuery.data?.success ? pizzaCatalogQuery.data.catalog : undefined

  const { catalogLines, staleLineIds } = useMemo(() => {
    if (!catalog) return { catalogLines: [], staleLineIds: [] }

    const productsById = new Map(catalog.map((product) => [product._id, product]))
    const catalogLines: CatalogCartItem[] = []
    const staleLineIds: string[] = []

    for (const line of cartAtom()) {
      const lineId = getCartLineId(line)
      const product = productsById.get(line.productId)
      const details = product ? getCartLineDetails(line, product) : undefined

      if (!product || !details) staleLineIds.push(lineId)
      else catalogLines.push({ details, line, lineId, product })
    }

    return { catalogLines, staleLineIds }
  }, [catalog, cartAtom()])

  const pizzaOrderedItems = toPizzaOrderedItems(catalogLines.map(({ line }) => line))
  const shouldCalculate = open && catalogLines.length > 0

  const calculatePizzaOrderQuery = useQuery({
    enabled: shouldCalculate,
    queryFn: async ({ signal }) => {
      const { data } = await calculatePizzaOrder({
        body: { items: pizzaOrderedItems },
        signal,
        throwOnError: true,
      })

      return data
    },
    queryKey: ['pizza-order', 'calculation', pizzaOrderedItems],
    retry: false,
    placeholderData: keepPreviousData,
  })

  const onRemove = useWrap((lineId: string) => cartAtom.remove(lineId), 'CatalogCart.remove')
  const onDecrement = useWrap(
    (lineId: string) => cartAtom.decrement(lineId),
    'CatalogCart.decrement'
  )
  const onIncrement = useWrap(
    (lineId: string) => cartAtom.increment(lineId),
    'CatalogCart.increment'
  )
  const removeStaleLines = useWrap(
    (lineIds: string[]) => lineIds.forEach((lineId) => cartAtom.remove(lineId)),
    'CatalogCart.removeStaleLines'
  )

  useEffect(() => {
    if (staleLineIds.length) removeStaleLines(staleLineIds)
  }, [staleLineIds])

  const isCatalogLoading = hasLines && !catalog && pizzaCatalogQuery.fetchStatus === 'fetching'
  const isCatalogError = hasLines && !catalog && pizzaCatalogQuery.isError

  const isCalculationLoading =
    !!catalog && !!catalogLines.length && calculatePizzaOrderQuery.fetchStatus === 'fetching'

  const calcData = isCalculationLoading ? undefined : calculatePizzaOrderQuery.data
  const calculation = calcData?.success ? calcData : undefined
  const calculationError = calcData?.success === false ? calcData.reason : undefined
  const isCalculationError =
    !isCalculationLoading && (calculatePizzaOrderQuery.isError || calcData?.success === false)

  const onRetryCalculation = () => {
    calculatePizzaOrderQuery.refetch()
  }
  const onRetryCatalog = () => {
    pizzaCatalogQuery.refetch()
  }

  return {
    state: {
      calculation,
      calculationError,
      currency: calculatePizzaOrderQuery.data?.commission.currency,
      hasLines,
      isCalculationError,
      isCalculationLoading,
      isCatalogError,
      isCatalogLoading,
      lines: catalogLines,
      totalQuantity,
    },
    functions: {
      onDecrement,
      onIncrement,
      onRemove,
      onRetryCalculation,
      onRetryCatalog,
    },
  }
}
