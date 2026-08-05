'use client'

import { AlertCircleIcon, RefreshCwIcon } from 'lucide-react'
import { catchError } from 'next/error'

import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'
import { IntlText } from '@/lib/i18n'

import type { MessagePathWithoutValues } from '@/lib/i18n'
import type { ErrorInfo } from 'next/error'

const errorCodes: Record<string, string> = {
  'fetch failed': 'error.fetch.failed',
  default: 'error.default',
}

const HeaderAuthErrorFallback = (_props: any, { error, retry }: ErrorInfo) => {
  const message = errorCodes[(error as TypeError).message ?? 'default'] as MessagePathWithoutValues

  return (
    <div
      role="alert"
      className="flex items-center gap-1.5"
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              variant="destructive"
              size="icon-lg"
            />
          }
        >
          <AlertCircleIcon data-icon="inline-start" />
          <span className="sr-only">
            <IntlText path="error.authorization" />
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <span className="flex flex-col gap-0.5">
            <span className="font-medium">
              <IntlText path="error.authorization" />
            </span>
            <span className="text-background/70">
              <IntlText path={message} />
            </span>
          </span>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              variant="secondary"
              size="icon-lg"
              onClick={retry}
            />
          }
        >
          <RefreshCwIcon data-icon="inline-start" />
          <span className="sr-only">
            <IntlText path="retry" />
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <IntlText path="retry" />
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

export const HeaderAuthErrorBoundary = catchError(HeaderAuthErrorFallback)
