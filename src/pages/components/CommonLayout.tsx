import { ActiveLink } from '@/pages/components/ActiveLink'
import { useRouter } from 'next/router'
import { type FC, type PropsWithChildren } from 'react'

export const CommonLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isReady, pathname } = useRouter()

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
      </header>
      {children}
    </div>
  )
}
