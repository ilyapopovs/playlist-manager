import {
  initSpotifyAuth,
  refreshAccessToken,
  removeTokens,
} from '@/modules/spotify/spotifyAuth'
import {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_TTL_KEY,
  AuthStorage,
  REFRESH_TOKEN_KEY,
} from '@/modules/spotify/spotifyAuthStorage'
import { atom, useSetAtom } from 'jotai'
import { useCallback } from 'react'

export const isAuthenticatedAtom = atom<boolean>(false)

export function useInitIsAuthenticated() {
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom)
  const callback = useCallback(() => {
    const accessToken = AuthStorage.get(ACCESS_TOKEN_KEY)
    const accessTokenTtl = AuthStorage.get(ACCESS_TOKEN_TTL_KEY)
    const refreshToken = AuthStorage.get(REFRESH_TOKEN_KEY)

    if (!accessToken || !accessTokenTtl || !refreshToken) {
      setIsAuthenticated(false)
      return
    }

    if (Date.now() > parseInt(accessTokenTtl)) {
      refreshAccessToken()
        .then(() => {
          setIsAuthenticated(true)
        })
        .catch((error) => {
          setIsAuthenticated(false)
          console.error(error)
        })

      return
    }

    setIsAuthenticated(true)
  }, [setIsAuthenticated])

  return callback
}

export function useAuthenticate() {
  const authenticate = useCallback(async () => {
    await initSpotifyAuth()
  }, [])

  return authenticate
}

export function useLogout() {
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom)
  const logout = useCallback(() => {
    removeTokens()
    setIsAuthenticated(false)
  }, [setIsAuthenticated])

  return logout
}
