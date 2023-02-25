import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Page 2
        </h1>
        <Link href="/" className="font-bold text-white">
          Go to root
        </Link>
      </div>
    </main>
  );
};

export default Home;
