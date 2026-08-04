import { useTimer } from '@siberiacancode/reactuse'
import { Loader2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { IntlText } from '@/lib/i18n'

interface CountdownProps {
  loading?: boolean
  retryAt: number
  onRetry: () => void
}

export const Countdown = ({ retryAt, onRetry, loading = false }: CountdownProps) => {
  const t = useTranslations()
  const timer = useTimer(Math.floor(retryAt / 1000))
  const seconds = timer.seconds + timer.minutes * 60

  if (!seconds)
    return (
      <Button
        className="w-full py-6"
        size="lg"
        type="button"
        variant="secondary"
        onClick={onRetry}
      >
        {loading && <Loader2Icon className="animate-spin" />}
        <IntlText path="button.retryOtp" />
      </Button>
    )

  return (
    <Typography
      as="p"
      variant="caption"
    >
      {t('page.login.otp.retryCountdown', { seconds })}
    </Typography>
  )
}
