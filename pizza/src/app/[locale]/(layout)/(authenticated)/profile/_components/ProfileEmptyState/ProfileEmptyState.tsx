import { Typography, buttonVariants } from '@/components/ui'
import { IntlText, Link } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import type { ReactNode } from 'react'

interface ProfileEmptyStateProps {
  description: 'profile.orders.empty.description' | 'profile.cards.empty.description'
  icon: ReactNode
  title: 'profile.orders.empty.title' | 'profile.cards.empty.title'
  tone?: 'accent' | 'neutral'
}

export const ProfileEmptyState = ({
  description,
  icon,
  title,
  tone = 'neutral',
}: ProfileEmptyStateProps) => (
  <div
    className={cn(
      'flex min-h-64 flex-col items-center justify-center rounded-3xl p-6 text-center md:min-h-72 md:p-8',
      tone === 'accent' ? 'bg-accent-quaternary/5 text-accent-quaternary' : 'bg-secondary'
    )}
  >
    <div
      className="mb-5 [&_svg]:size-11"
      aria-hidden="true"
    >
      {icon}
    </div>
    <Typography
      as="h2"
      className="text-2xl md:text-3xl"
      variant="title-lg"
    >
      <IntlText path={title} />
    </Typography>
    <Typography
      as="p"
      className="mt-1 max-w-md text-lg md:text-xl"
      variant="body-md"
    >
      <IntlText path={description} />
    </Typography>
    <Link
      className={buttonVariants({
        variant: 'accent',
        size: 'lg',
        className: 'mt-6 w-full py-6 md:mt-7',
      })}
      href="/"
    >
      <IntlText path="button.viewMenu" />
    </Link>
  </div>
)
