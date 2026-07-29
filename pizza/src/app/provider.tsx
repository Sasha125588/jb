'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { ThemeProvider } from './_contexts/theme'
import { getQueryClient } from '@/lib'

import type { ReactNode } from 'react'

interface ProviderProps {
  children: ReactNode
}

export const Provider = ({ children }: ProviderProps) => {
  const queryClient = getQueryClient()

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>{children}</ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </NuqsAdapter>
  )
}
