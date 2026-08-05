import { Loader2Icon, LogInIcon, LogOutIcon } from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui'
import { cn } from '@/lib'
import { IntlText, Link } from '@/lib/i18n'

const buttonStyles =
  'min-w-25 bg-orange-50 text-orange-600 transition-colors hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-200 dark:hover:bg-orange-800'

export const AuthButtonLoading = () => (
  <Button
    disabled
    className={cn(buttonStyles, 'pointer-events-none')}
  >
    <IntlText path="loading" />
    <Loader2Icon className="animate-spin" />
  </Button>
)

export const AuthButtonLogin = () => (
  <Link
    href="/login"
    className={cn(buttonVariants({ size: 'lg' }), buttonStyles)}
  >
    <IntlText path="button.login" />
    <LogInIcon />
  </Link>
)

interface AuthButtonLogoutProps {
  onLogout: () => void
}

export const AuthButtonLogout = ({ onLogout }: AuthButtonLogoutProps) => (
  <Button
    onClick={onLogout}
    className={buttonStyles}
  >
    <IntlText path="button.logout" />
    <LogOutIcon />
  </Button>
)
