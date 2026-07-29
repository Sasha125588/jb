import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    useTypeScriptCli: true,
  },
  reactCompiler: true,
}

export default nextConfig
