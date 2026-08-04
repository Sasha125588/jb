import { Suspense } from 'react'

import { LoginPageClient } from './page.client'

const LoginPage = () => {
  return (
    <Suspense>
      <LoginPageClient />
    </Suspense>
  )
}

export default LoginPage
