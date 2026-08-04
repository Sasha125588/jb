import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'

import { routing } from './lib/i18n/routing'
import { COOKIES } from './shared/constants'

import type { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware(routing)

const protectedRoutes = ['profile', 'history']
const authRoutes = ['login']

export default function proxy(request: NextRequest) {
  const pathnameSegments = request.nextUrl.pathname.split('/')
  const localeFromPath = pathnameSegments[1]
  const targetLocale = localeFromPath ?? routing.defaultLocale
  const pathWithoutLocale = pathnameSegments[2]

  const isProtectedRoute = protectedRoutes.includes(pathWithoutLocale)

  const sessionToken = request.cookies.get(COOKIES.TOKEN)?.value

  if (isProtectedRoute && !sessionToken) {
    const loginUrl = new URL(`/${targetLocale}/login`, request.url)

    loginUrl.searchParams.set('redirect', `${request.nextUrl.pathname}${request.nextUrl.search}`)

    return NextResponse.redirect(loginUrl)
  }

  const isAuthRoute = authRoutes.includes(pathWithoutLocale)

  if (isAuthRoute && sessionToken) {
    const redirectPath = request.nextUrl.searchParams.get('redirect') ?? `/${targetLocale}`

    return NextResponse.redirect(new URL(redirectPath, request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
