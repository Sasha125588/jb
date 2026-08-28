import Image from 'next/image'

import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

import type { ReactNode } from 'react'

interface PageFallbackProps {
  variant: 'not-found' | 'error'
  title: ReactNode
  description: ReactNode
  action: ReactNode
}

export const PageFallback = ({ variant, title, description, action }: PageFallbackProps) => {
  const isNotFound = variant === 'not-found'

  return (
    <main
      aria-labelledby="page-fallback-title"
      className="flex min-h-[480px] flex-1 flex-col items-center justify-center px-4 py-14 text-center sm:min-h-[520px] sm:py-20"
    >
      <div
        aria-hidden="true"
        className="flex h-[148px] items-center justify-center gap-3 sm:gap-6"
      >
        {isNotFound && (
          <span className="text-[96px] leading-none font-extrabold sm:text-[160px]">4</span>
        )}
        <Image
          src={
            isNotFound ? '/assets/images/mascot-not-found.png' : '/assets/images/mascot-error.png'
          }
          alt={isNotFound ? 'Page not found' : 'Page error'}
          width={140}
          height={148}
          loading="eager"
          className="h-auto w-28 shrink-0 sm:w-[140px]"
        />
        {isNotFound && (
          <span className="text-[96px] leading-none font-extrabold sm:text-[160px]">4</span>
        )}
      </div>

      <div className="mt-8 flex max-w-4xl flex-col items-center gap-2">
        <h1
          id="page-fallback-title"
          className={cn(
            'leading-tight font-bold text-balance',
            isNotFound ? 'text-2xl sm:text-[32px]' : 'text-3xl sm:text-5xl'
          )}
        >
          {isNotFound && <span className="sr-only">404 — </span>}
          {title}
        </h1>
        <Typography
          as="p"
          variant="body-md"
          className="max-w-2xl text-pretty"
        >
          {description}
        </Typography>
      </div>

      <div className="mt-6 w-full max-w-[344px]">{action}</div>
    </main>
  )
}
