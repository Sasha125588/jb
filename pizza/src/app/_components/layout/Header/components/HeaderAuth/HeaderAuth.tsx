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

  queryClient.prefetchQuery(getProfileQueryOptions({ auth: token }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderAuthClient initialToken={token} />
    </HydrationBoundary>
  )
}
