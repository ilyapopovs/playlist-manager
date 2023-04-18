import { useAppUrl } from '@/modules/common/hooks/useAppLink'
import { type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  const appUrl = useAppUrl()
  return (
    <>
      <Head>
        <title>Playlist Manager</title>
        <meta content="Manage your Spotify playlists!" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className="flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Placeholder title
          </h1>
          <Link href={appUrl}>Go to App</Link>
        </div>
      </main>
    </>
  )
}

export default Home
