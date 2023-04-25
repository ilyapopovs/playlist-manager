import { type AppType } from 'next/app'

import { api } from '@/modules/common/utils/api'

import '@/modules/common/styles/globals.css'
import { CommonLayout } from '@/modules/common/components/CommonLayout'
import { useInitIsAuthenticated } from '@/modules/spotify/spotifyAuthHooks'
import { useEffect } from 'react'

const MyApp: AppType = ({ Component, pageProps }) => {
  const checkOrRefreshExistingAuth = useInitIsAuthenticated()

  useEffect(checkOrRefreshExistingAuth, [checkOrRefreshExistingAuth])

  return (
    <CommonLayout>
      <Component {...pageProps} />
    </CommonLayout>
  )
}

export default api.withTRPC(MyApp)
