'use client'

import { useMask } from '@siberiacancode/reactuse'
import { useSuspenseQuery } from '@tanstack/react-query'
import Image from 'next/image'

import { useProfilePage } from '../../_hooks/useProfilePage'
import { ProfileEditDrawer } from './ProfileEditDrawer'
import { Button, Typography } from '@/components/ui'
import { getProfileQueryOptions } from '@/generated/hooks'
import { IntlText } from '@/lib/i18n'

export const ProfileClient = () => {
  const profileResponse = useSuspenseQuery(getProfileQueryOptions())

  const { state, functions } = useProfilePage()

  const user = profileResponse.data.user
  const userName = `${user.firstname} ${user.lastname}`

  const phoneMask = useMask('+7 999 999 99 99', {
    showMask: 'never',
    initialValue: user.phone,
  })

  const formattedPhone = phoneMask.getValue('masked')
  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[24rem_minmax(0,1fr)] lg:gap-12">
        <section className="flex flex-col">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left">
            <Image
              className="size-28 shrink-0 sm:size-24"
              src="/assets/images/mascot-profile.png"
              alt="Profile image"
              width={128}
              height={128}
              priority
            />
            <div className="mt-6 min-w-0 sm:mt-0 sm:ml-6">
              <Typography
                as="h2"
                className="text-3xl font-medium sm:text-2xl"
                variant="title-lg"
              >
                {userName ? <>{userName}</> : <IntlText path="profile.customerTitle" />}
              </Typography>
              {user.email && (
                <Typography
                  as="p"
                  className="text-muted-foreground mt-1 truncate"
                  variant="body-sm"
                >
                  {user.email}
                </Typography>
              )}
              <Typography
                as="p"
                className="mt-1"
                variant="body-sm"
              >
                {formattedPhone}
              </Typography>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:mt-8">
            <Button
              className="w-full py-6"
              size="lg"
              type="button"
              variant="secondary"
              onClick={() => functions.onEditOpenChange(true)}
            >
              <IntlText path="profile.edit.action" />
            </Button>
            <Button
              className="w-full py-6"
              disabled={state.isSigningOut}
              size="lg"
              type="button"
              variant="accent"
              onClick={functions.onSignOut}
            >
              <IntlText path="button.logout" />
            </Button>
          </div>
        </section>
      </div>

      <ProfileEditDrawer
        open={state.isEditOpen}
        user={user}
        onOpenChange={functions.onEditOpenChange}
      />
    </>
  )
}
