import { setCookie, useMask } from '@siberiacancode/reactuse'
import { useForm, useSelector } from '@tanstack/react-form-nextjs'
import { useParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useRef, useState } from 'react'

import { useCreateOtp, useSignIn } from '@/generated/hooks'
import { useRouter } from '@/lib/i18n'
import { COOKIES } from '@/shared/constants'

const errorCodes: Record<string, string> = {
  'Неправильный отп код': 'error.invalidCode',
  default: 'error.default',
}

export const useLoginPage = () => {
  const router = useRouter()
  const { locale } = useParams<{ locale: string }>()
  const [redirect] = useQueryState('redirect', { defaultValue: '' })

  const [step, setStep] = useState<'phone' | 'code'>('phone')
  const [retryDelay, setRetryDelay] = useState<number>(0)

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

      signInMutation.mutate(
        {
          headers: { 'x-application': 'mobile' },
          body: {
            phone: value.phone,
            code: value.code,
          },
        },
        {
          onSuccess(data) {
            if (!data.success) {
              const message = errorCodes[data.reason ?? 'default']
              formApi.setErrorMap({
                onSubmit: {
                  fields: {
                    code: { message },
                  },
                },
              })

              return
            }
            setCookie(COOKIES.TOKEN, data.token, {
              path: '/',
              secure: true,
              sameSite: 'Lax',
            })

            router.replace(redirect || `/${locale}`)
          },
          onError(error) {
            const reason =
              'reason' in error.data && typeof error.data.reason === 'string'
                ? error.data.reason
                : 'default'

            const message = errorCodes[reason]
            formApi.setErrorMap({
              onSubmit: { fields: { code: { message } } },
            })
          },
        }
      )
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
