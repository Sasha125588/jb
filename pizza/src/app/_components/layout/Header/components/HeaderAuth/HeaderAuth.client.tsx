'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { AuthButtonLogout } from '../AuthButton/AuthButton'
import { LogoutConfirmationModal } from '@/app/[locale]/_components/LogoutConfirmationModal/LogoutConfirmationModal'
import { getProfileQueryKey, getProfileQueryOptions, useSignOut } from '@/generated/hooks'
import { getQueryClient } from '@/lib'

export const HeaderAuthClient = () => {
  const profileResponse = useSuspenseQuery(getProfileQueryOptions())

  const queryClient = getQueryClient()

  const signOutMutation = useSignOut()

  const onConfirm = async () => {
    try {
      await signOutMutation.mutateAsync({})
    } finally {
      queryClient.removeQueries({ queryKey: getProfileQueryKey() })
      window.location.replace('/')
    }
  }

  const onClick = () => LogoutConfirmationModal.open({ onConfirm })

  const user = profileResponse.data.user

  return (
    <div className="flex items-baseline gap-2">
      {user.email}
      <AuthButtonLogout onClick={onClick} />
    </div>
  )
}
