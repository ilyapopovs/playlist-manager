import { isAuthenticatedAtom } from '@/modules/spotify/spotifyAuthHooks'
import { useAtomValue } from 'jotai'

// return `/app` if authenticated, `/app/login` otherwise
export function useAppUrl() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  return isAuthenticated ? '/app' : '/app/login'
}
