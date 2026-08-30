import { useState } from 'react'

import { LogoutConfirmationModal } from '@/app/[locale]/_components/LogoutConfirmationModal/LogoutConfirmationModal'
import { getProfileQueryKey, useSignOut } from '@/generated/hooks'
import { getQueryClient } from '@/lib'

export const useProfilePage = () => {
  const [isEditOpen, setIsEditOpen] = useState(false)

  const queryClient = getQueryClient()
  const signOutMutation = useSignOut()

  const onEditOpenChange = (open: boolean) => {
    setIsEditOpen(open)
  }

  const onSignOutConfirm = async () => {
    try {
      await signOutMutation.mutateAsync({})
    } finally {
      queryClient.removeQueries({ queryKey: getProfileQueryKey() })
      window.location.replace('/')
    }
  }

  const onSignOut = () => LogoutConfirmationModal.open({ onConfirm: onSignOutConfirm })

  return {
    state: {
      isEditOpen,
      isSigningOut: signOutMutation.isPending,
    },
    functions: { onEditOpenChange, onSignOut },
  }
}
