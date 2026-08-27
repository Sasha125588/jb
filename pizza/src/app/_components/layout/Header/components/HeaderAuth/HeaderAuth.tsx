import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { cookies } from 'next/headers'

import { AuthButtonLogin } from '../AuthButton/AuthButton'
import { HeaderAuthClient } from './HeaderAuth.client'
import { getProfileQueryOptions } from '@/generated/hooks'
import { getQueryClient } from '@/lib'
import { COOKIES } from '@/shared/constants'

export const HeaderAuth = async () => {
  const token = (await cookies()).get(COOKIES.TOKEN)?.value

  if (!token) return <AuthButtonLogin />

  const queryClient = getQueryClient()

  await queryClient.fetchQuery(
    getProfileQueryOptions({
      baseURL: 'https://juniorsbootcamp.ru',
      auth: ({ in: location }) => (location === 'cookie' ? token : undefined),
    })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderAuthClient />
    </HydrationBoundary>
  )
}
