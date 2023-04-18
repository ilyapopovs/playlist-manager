import { ActiveLink } from '@/modules/common/components/ActiveLink'
import { isAuthenticatedAtom, useLogout } from '@/modules/spotify/SpotifyAuth'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { type FC, type PropsWithChildren } from 'react'

export const CommonLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isReady, pathname } = useRouter()
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  const logout = useLogout()

  console.log('router', { isReady, pathname })

  return (
    <div className="min-h-screen">
      <header className="flex gap-2 p-2">
        <ActiveLink activeClassName={'font-bold'} href={'/'}>
          Home
        </ActiveLink>
        <ActiveLink activeClassName={'font-bold'} href={'/app'}>
          App
        </ActiveLink>
        {isAuthenticated ? (
          <button onClick={() => void logout()}>Log out</button>
        ) : (
          <ActiveLink activeClassName={'font-bold'} href={'/app/login'}>
            Login
          </ActiveLink>
        )}
      </header>
      {children}
    </div>
  )
}
