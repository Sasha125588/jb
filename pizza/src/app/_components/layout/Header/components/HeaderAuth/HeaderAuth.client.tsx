'use client'

import { useCookie, useDisclosure } from '@siberiacancode/reactuse'
import { useSuspenseQuery } from '@tanstack/react-query'

import { AuthButtonLogout } from '../AuthButton/AuthButton'
import { LogoutConfirmation } from '@/app/[locale]/_components/LogoutConfirmation/LogoutConfirmation'
import { getProfileQueryKey, getProfileQueryOptions, useSignOut } from '@/generated/hooks'
import { getQueryClient } from '@/lib'
import { COOKIES } from '@/shared/constants'

interface HeaderAuthClientProps {
  initialToken: string
}

export const HeaderAuthClient = ({ initialToken }: HeaderAuthClientProps) => {
  const profileResponse = useSuspenseQuery(getProfileQueryOptions({ auth: initialToken }))

  const confirm = useDisclosure()
  const queryClient = getQueryClient()

  const token = useCookie<string>(COOKIES.TOKEN, {
    initialValue: initialToken,
  })

  const signOutMutation = useSignOut({
    client: { auth: initialToken },
  })

  const onLogout = async () => {
    try {
      await signOutMutation.mutateAsync({ headers: { 'x-application': 'mobile' } })
    } finally {
      token.remove({ path: '/' })
      queryClient.removeQueries({ queryKey: getProfileQueryKey() })
      window.location.replace('/')
    }
  }

  const user = profileResponse.data.user

  return (
    <div className="flex items-baseline gap-2">
      {user.email}
      <AuthButtonLogout onLogout={confirm.open} />

      {confirm.opened && (
        <LogoutConfirmation
          onConfirm={onLogout}
          onOpenChange={confirm.toggle}
        />
      )}
    </div>
  )
}
