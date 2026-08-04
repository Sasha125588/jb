'use client'

import { useCookie, useDisclosure } from '@siberiacancode/reactuse'
import { HistoryIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

import { AuthButton, LanguageSwitcher } from './components'
import { LogoutConfirmation } from '@/app/[locale]/_components/LogoutConfirmation/LogoutConfirmation'
import { IconButton, Typography } from '@/components/ui'
import { getProfileQueryKey, useGetProfile } from '@/generated/hooks'
import { getQueryClient } from '@/lib'
import { COOKIES } from '@/shared/constants'

export const Header = () => {
  const router = useRouter()
  const confirm = useDisclosure()

  const queryClient = getQueryClient()

  const token = useCookie<string>(COOKIES.TOKEN)

  const getProfileResponse = useGetProfile({
    client: { auth: token.value },
    query: { enabled: !!token.value },
  })

  const user = getProfileResponse.data?.user

  const isProfileLoading = !!token.value && getProfileResponse.isLoading

  const onLogout = () => {
    token.remove()
    queryClient.removeQueries({ queryKey: getProfileQueryKey() })
    router.replace('/')
  }

  return (
    <header className="flex h-16 items-center justify-between px-4">
      <Link href="/">
        <Typography
          as="span"
          variant="body-sm"
          className="flex items-center font-extrabold"
        >
          <span className="pr-0.5 text-[22px]">🍕</span>PIZZA
        </Typography>
      </Link>

      <div className="flex items-center gap-5 leading-7">
        <div className="flex gap-3">
          <Suspense>
            <LanguageSwitcher />
          </Suspense>
          <IconButton
            size="sm"
            variant="secondary"
            rounded
            render={<Link href="/history" />}
          >
            <HistoryIcon size={20} />
          </IconButton>
          <IconButton
            size="sm"
            variant="secondary"
            rounded
            render={<Link href="/profile" />}
          >
            <UserIcon size={20} />
          </IconButton>
        </div>

        <AuthButton
          isPending={isProfileLoading}
          user={user}
          onLogout={confirm.open}
        />

        {confirm.opened && (
          <LogoutConfirmation
            onConfirm={onLogout}
            onOpenChange={confirm.toggle}
          />
        )}
      </div>
    </header>
  )
}
