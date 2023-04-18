import { type AppType } from 'next/app'

import { api } from '@/modules/common/utils/api'

import '@/modules/common/styles/globals.css'
import { CommonLayout } from '@/modules/common/components/CommonLayout'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <CommonLayout>
      <Component {...pageProps} />
    </CommonLayout>
  )
}

export default api.withTRPC(MyApp)
