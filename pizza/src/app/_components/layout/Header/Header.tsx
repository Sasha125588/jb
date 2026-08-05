import { HistoryIcon, UserIcon } from 'lucide-react'
import { Suspense } from 'react'

import {
  AuthButtonLoading,
  HeaderAuth,
  HeaderAuthErrorBoundary,
  LanguageSwitcher,
} from './components'
import { IconButton, Typography } from '@/components/ui'
import { Link } from '@/lib/i18n'

export const Header = () => (
  <header className="flex h-16 items-center justify-between px-4">
    <Link
      href="/"
      data-testid="home-link"
    >
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
        <div className="-mt-1">
          <Suspense>
            <LanguageSwitcher />
          </Suspense>
        </div>
        <IconButton
          size="sm"
          variant="secondary"
          rounded
          render={
            <Link
              href="/history"
              prefetch={false}
            />
          }
        >
          <HistoryIcon size={20} />
        </IconButton>
        <IconButton
          size="sm"
          variant="secondary"
          rounded
          render={
            <Link
              href="/profile"
              prefetch={false}
            />
          }
        >
          <UserIcon size={20} />
        </IconButton>
      </div>

      <HeaderAuthErrorBoundary>
        <Suspense fallback={<AuthButtonLoading />}>
          <HeaderAuth />
        </Suspense>
      </HeaderAuthErrorBoundary>
    </div>
  </header>
)
