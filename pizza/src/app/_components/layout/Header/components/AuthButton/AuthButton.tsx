import { Loader2Icon, LogInIcon, LogOutIcon } from 'lucide-react'
import Link from 'next/link'

import { Button, buttonVariants } from '@/components/ui'
import { cn } from '@/lib'
import { IntlText } from '@/lib/i18n'

import type { User } from '@/generated/types/User'

interface AuthButtonProps {
  isPending: boolean
  user: User | undefined
  onLogout: () => void
}

export const AuthButton = ({ isPending, user, onLogout }: AuthButtonProps) => {
  const buttonStyles =
    'min-w-25 bg-orange-50 text-orange-600 transition-colors hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-200 dark:hover:bg-orange-800'

  if (isPending)
    return (
      <Button
        disabled
        className={cn(buttonStyles, 'pointer-events-none')}
      >
        <IntlText path="loading" />
        <Loader2Icon className="animate-spin" />
      </Button>
    )

  if (user)
    return (
      <Button
        onClick={onLogout}
        className={buttonStyles}
      >
        <IntlText path="button.logout" />
        <LogOutIcon />
      </Button>
    )

  return (
    <Link
      href="/login"
      className={cn(buttonVariants({ size: 'lg' }), buttonStyles)}
    >
      <IntlText path="button.login" />
      <LogInIcon />
    </Link>
  )
}
