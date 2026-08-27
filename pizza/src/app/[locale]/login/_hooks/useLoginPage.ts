import { useMask } from '@siberiacancode/reactuse'
import { useForm, useSelector } from '@tanstack/react-form-nextjs'
import { useRef, useState } from 'react'

import { ResponseError } from '@/generated/.kubb/client'
import { getProfileQueryOptions, useCreateOtp, useSignIn } from '@/generated/hooks'
import { getQueryClient } from '@/lib'

const errorCodes: Record<string, string> = {
  'Неправильный отп код': 'error.invalidCode',
  default: 'error.default',
}

export const useLoginPage = () => {
  const [step, setStep] = useState<'phone' | 'code'>('phone')
  const [retryDelay, setRetryDelay] = useState<number>(0)

  const queryClient = getQueryClient()

  const lastSubmittedPhone = useRef('')

  const createOtpMutation = useCreateOtp()
  const signInMutation = useSignIn()

  const form = useForm({
    defaultValues: {
      phone: '',
      code: 0,
    },
    onSubmit: async ({ value, formApi }) => {
      if (step === 'phone') {
        if (lastSubmittedPhone.current !== value.phone) await sendOtp(value.phone)

        lastSubmittedPhone.current = value.phone
        setStep('code')
        return
      }

      try {
        await signInMutation.mutateAsync({
          body: {
            phone: value.phone,
            code: value.code,
          },
        })

        queryClient.ensureQueryData(getProfileQueryOptions())

        const redirect = new URLSearchParams(window.location.search).get('redirect')
        window.location.replace(redirect ?? '/')
      } catch (error) {
        let message = errorCodes.default

        if (error instanceof ResponseError) {
          const reason = error.data.reason

          message = errorCodes[reason] ?? errorCodes.default
        }

        formApi.setErrorMap({
          onSubmit: {
            fields: {
              code: { message },
            },
          },
        })
        return
      }
    },
  })

  const phone = useSelector(form.store, (state) => state.values.phone)

  const sendOtp = async (phone: string) => {
    const loginOtpResponse = await createOtpMutation.mutateAsync({
      body: { phone },
    })

    setRetryDelay(loginOtpResponse.retryDelay)
  }

  const phoneMask = useMask('+7 999 999 99 99', {
    showMask: 'never',
    onChangeRaw: (rawValue) => form.setFieldValue('phone', `7${rawValue}`),
  })

  const codeMask = useMask('999999', {
    showMask: 'never',
    onChangeRaw: (rawValue) => form.setFieldValue('code', +rawValue),
  })

  const onRetry = async () => {
    await sendOtp(phone)
    codeMask.reset()
    form.resetField('code')
  }

  const onBack = () => {
    codeMask.reset()
    form.resetField('code')
    setStep('phone')
  }

  const isRetrying = createOtpMutation.isPending && step === 'code'
  const isSubmitting = useSelector(form.store, (state) => state.isSubmitting)
  const isLoading = signInMutation.isPending || isSubmitting

  return {
    state: { step, retryDelay, isRetrying, isLoading },
    form,
    masks: { phoneMask, codeMask },
    functions: { onRetry, onBack },
  }
}
