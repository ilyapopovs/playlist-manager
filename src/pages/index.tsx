import { type NextPage } from 'next'
import Head from 'next/head'

import { api } from '@/utils/api'
import Link from 'next/link'

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: 'from tRPC' })

  return (
    <>
      <Head>
        <title>Playlist Manager</title>
        <meta content="Manage your Spotify playlists!" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className="flex flex-col items-center justify-center bg-slate-900">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Placeholder title
          </h1>
          <Link className="text-white" href={'/app'}>
            Go to App
          </Link>
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : 'Loading tRPC query...'}
          </p>
        </div>
      </main>
    </>
  )
}

export default Home
