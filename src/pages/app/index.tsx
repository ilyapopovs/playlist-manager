import { isAuthenticatedAtom } from '@/modules/spotify/spotifyAuthHooks'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const App = () => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router
        .push('/app/login')
        .catch(() => console.error('redirect to "/" failed'))
    }
  }, [isAuthenticated, router])

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
