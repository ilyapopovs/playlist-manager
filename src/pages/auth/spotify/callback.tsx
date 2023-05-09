import {
  finishSpotifyAuth,
  refreshAccessToken,
} from '@/modules/spotify/auth/spotifyAuth'
import { isAuthenticatedAtom } from '@/modules/spotify/auth/spotifyAuthHooks'
import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function SpotifyAuthCallback() {
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom)
  const router = useRouter()
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['finishSpotifyAuth'],
    queryFn: finishSpotifyAuth,
  })

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setIsAuthenticated(true)
      setTimeout(() => {
        void refreshAccessToken()
      }, (data - 120) * 1000)

      void router.push('/app')
    }
  }, [data, isError, isLoading, router, setIsAuthenticated])

  if (isError) {
    console.error(error)
    setIsAuthenticated(false)

    return <div>Auth failed, please start over!</div>
  }

  return <div>Logging you in...</div>
}

export default SpotifyAuthCallback
