import createNextIntlPlugin from 'next-intl/plugin'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    useTypeScriptCli: true,
  },
  reactCompiler: true,
  cacheComponents: true,
}

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/lib/i18n/request.ts',
  experimental: {
    createMessagesDeclaration: './locales/en.json',
  },
})
export default withNextIntl(nextConfig)
