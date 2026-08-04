'use client'

import { getCookie } from '@siberiacancode/reactuse'
import { useLocale } from 'next-intl'
import { useLayoutEffect } from 'react'

import { COOKIES } from '@/shared/constants'

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export const ThemeSync = () => {
  const locale = useLocale()

  useLayoutEffect(() => {
    const theme = getCookie(COOKIES.THEME) || 'system'
    const activeTheme = theme === 'system' ? getSystemTheme() : theme

    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(activeTheme)
    document.documentElement.style.colorScheme = activeTheme
  }, [locale])

  return null
}
