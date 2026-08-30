import { Suspense } from 'react'

import { Profile } from './_components/Profile/Profile'
import { ProfileBilling } from './_components/ProfileBilling/ProfileBilling'
import { Skeleton, Typography } from '@/components/ui'
import { IntlText } from '@/lib/i18n'

const ProfilePage = () => {
  return (
    <main className="flex py-8 sm:py-14 lg:py-20">
      <div>
        <Typography
          as="h1"
          className="mb-10 text-4xl sm:mb-12 sm:text-5xl"
          variant="heading-md"
        >
          <IntlText path="profile.title" />
        </Typography>
        <Suspense fallback={<ProfileFallback />}>
          <Profile />
        </Suspense>
      </div>
      <ProfileBilling />
    </main>
  )
}

const ProfileFallback = () => (
  <div className="grid gap-10 lg:grid-cols-[24rem_minmax(0,1fr)] lg:gap-12">
    <div>
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <Skeleton className="size-28 shrink-0 rounded-full sm:size-24" />
        <div className="flex w-full flex-col gap-3">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-5 w-36" />
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-3 sm:mt-8">
        <Skeleton className="h-12 w-full rounded-4xl" />
        <Skeleton className="h-12 w-full rounded-4xl" />
      </div>
    </div>
  </div>
)

export default ProfilePage
