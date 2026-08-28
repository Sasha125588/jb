import { Footer, Header } from '../../_components/layout'

import type { ReactNode } from 'react'

interface RootLayoutProps extends LayoutProps<'/[locale]'> {
  children: ReactNode
}

const RootLayout = async ({ children }: RootLayoutProps) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

export default RootLayout
