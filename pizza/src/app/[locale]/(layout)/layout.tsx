import { Footer, Header } from '../../_components/layout'

import type { ReactNode } from 'react'

interface RootLayoutProps extends LayoutProps<'/[locale]'> {
  children: ReactNode
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default RootLayout
