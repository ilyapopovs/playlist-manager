import Head from "next/head";
import { Header } from "@/components/Header";

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Playlist Manager</title>
        <meta name="description" content="Manage your Spotify playlists!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </>
  );
};
