import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { io } from 'next/cache'
import { cookies } from 'next/headers'

import { ProfileOrdersPanel } from './ProfileOrdersPanel'
import { getPizzaOrdersQueryOptions } from '@/generated/hooks'
import { getQueryClient } from '@/lib'
import { COOKIES } from '@/shared/constants'

export const ProfileOrders = async () => {
  await io()

  const token = (await cookies()).get(COOKIES.TOKEN)?.value

  const queryClient = getQueryClient()

  queryClient
    .query(
      getPizzaOrdersQueryOptions({
        baseURL: 'https://juniorsbootcamp.ru',
        auth: ({ in: location }) => (location === 'cookie' ? token : undefined),
      })
    )
    .catch(() => undefined)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileOrdersPanel />
    </HydrationBoundary>
  )
}
