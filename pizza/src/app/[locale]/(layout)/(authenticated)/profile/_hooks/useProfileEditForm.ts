import { useMask } from '@siberiacancode/reactuse'
import { useForm, useSelector } from '@tanstack/react-form-nextjs'
import { useState } from 'react'
import * as z from 'zod'

import { getProfileQueryKey, useUpdateProfile } from '@/generated/hooks'
import { getQueryClient } from '@/lib'

import type { User } from '@/generated/types'
import type { MessagePathWithoutValues } from '@/lib/i18n'

const getProfileFormValues = (user: User) => ({
  firstname: user.firstname ?? '',
  email: user.email ?? '',
})

const profileFormSchema = z.object({
  firstname: z.string().trim().min(1, 'error.validation.required'),
  email: z.email({ message: 'error.validation.email' }),
})

interface UseProfileEditFormOptions {
  onSuccess: () => void
}

export const useProfileEditForm = (user: User, options: UseProfileEditFormOptions) => {
  const [submitError, setSubmitError] = useState<MessagePathWithoutValues>()

  const queryClient = getQueryClient()
  const updateProfileMutation = useUpdateProfile()

  const form = useForm({
    defaultValues: getProfileFormValues(user),
    onSubmit: async ({ value }) => {
      setSubmitError(undefined)

      try {
        const response = await updateProfileMutation.mutateAsync({
          body: {
            firstname: value.firstname.trim(),
            email: value.email.trim() || undefined,
          },
        })

        if (!response.success) {
          setSubmitError('error.default')
          return
        }

        queryClient.setQueryData(getProfileQueryKey(), response)
        await queryClient.invalidateQueries({
          queryKey: getProfileQueryKey(),
          exact: true,
        })

        form.reset(getProfileFormValues(response.user))
        options.onSuccess()
      } catch {
        setSubmitError('error.default')
      }
    },
  })

  const isSubmitting = useSelector(form.store, (state) => state.isSubmitting)

  const reset = () => {
    setSubmitError(undefined)
    form.reset(getProfileFormValues(user))
  }

  const phoneMask = useMask('+7 999 999 99 99', {
    showMask: 'never',
    initialValue: user.phone,
  })

  return {
    state: {
      isSaving: isSubmitting || updateProfileMutation.isPending,
      submitError,
    },
    form,
    validators: profileFormSchema.shape,
    masks: { phoneMask },
    functions: { reset },
  }
}
