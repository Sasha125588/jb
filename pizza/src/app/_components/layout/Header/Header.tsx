import { HistoryIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

import { AuthButtonLoading, HeaderAuth, LanguageSwitcher } from './components'
import { IconButton, Typography } from '@/components/ui'

export const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between px-4">
      <Link href="/">
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
            render={<Link href="/history" />}
          >
            <HistoryIcon size={20} />
          </IconButton>
          <IconButton
            size="sm"
            variant="secondary"
            rounded
            render={<Link href="/profile" />}
          >
            <UserIcon size={20} />
          </IconButton>
        </div>

        <Suspense fallback={<AuthButtonLoading />}>
          <HeaderAuth />
        </Suspense>
      </div>
    </header>
  )
}
