import { isAuthenticatedAtom } from '@/modules/spotify/SpotifyAuth'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'

const App = () => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  const router = useRouter()

  if (!isAuthenticated) {
    router
      .push('/app/login')
      .catch(() => console.error('redirect to "/" failed'))
  }

  return (
    <div>
      <div>
        <Link href={'/'}>Go to Home</Link>
      </div>
      <div>
        <Link href={'/app/login'}>Go to Login page</Link>
      </div>
      App page here
    </div>
  )
}

export default App
