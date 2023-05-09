import {
  isAuthenticatedAtom,
  useAuthenticate,
} from '@/modules/spotify/auth/spotifyAuthHooks'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/router'

function Login() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  const authenticate = useAuthenticate()
  const router = useRouter()

  if (isAuthenticated) {
    router
      .push('/app')
      .catch(() => console.error('navigation to "/app" failed'))
  }

  return (
    <div>
      Login Page
      <div>
        <button onClick={() => void authenticate()}>Authenticate</button>
      </div>
    </div>
  )
}

export default Login
