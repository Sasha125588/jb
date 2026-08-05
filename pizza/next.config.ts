import createNextIntlPlugin from 'next-intl/plugin'

import type { NextConfig } from 'next'

const isInstantNavigationTest = process.env.INSTANT_NAV_TEST === '1'

const nextConfig: NextConfig = {
  /* config options here */
  distDir: isInstantNavigationTest ? '.next-instant' : '.next',
  experimental: {
    exposeTestingApiInProductionBuild: isInstantNavigationTest,
    useTypeScriptCli: true,
    turbopackRustReactCompiler: true,
  },
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [{ hostname: 'juniorsbootcamp.ru' }],
  },
}

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/lib/i18n/request.ts',
  experimental: {
    createMessagesDeclaration: './locales/en.json',
  },
})
export default withNextIntl(nextConfig)
