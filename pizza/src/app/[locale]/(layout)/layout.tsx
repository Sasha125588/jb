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
    // <html
    //   lang={locale}
    //   className={cn('h-full antialiased', nunito.variable, jetbrainsMono.variable)}
    //   suppressHydrationWarning
    // >

    //   <body className="mx-auto flex h-full max-w-7xl flex-col px-4 sm:py-16">

    //   </body>
    // </html>
  )
}

export default RootLayout
