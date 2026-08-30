import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { cookies } from 'next/headers'

import { ProfileClient } from './Profile.client'
import { getProfileQueryOptions } from '@/generated/hooks'
import { getQueryClient } from '@/lib'
import { COOKIES } from '@/shared/constants'

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const Profile = async () => {
  const token = (await cookies()).get(COOKIES.TOKEN)?.value

  const queryClient = getQueryClient()

  // await delay(3000)

  await queryClient.query(
    getProfileQueryOptions({
      baseURL: 'https://juniorsbootcamp.ru',
      auth: ({ in: location }) => (location === 'cookie' ? token : undefined),
    })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileClient />
    </HydrationBoundary>
  )
}
