import { type AppType } from 'next/app'

import { api } from '@/utils/api'

import '@/styles/globals.css'
import { CommonLayout } from '@/components/CommonLayout'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <CommonLayout>
      <Component {...pageProps} />
    </CommonLayout>
  )
}

export default api.withTRPC(MyApp)
