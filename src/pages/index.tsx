import { type NextPage } from "next";
import { api } from "@/utils/api";
import Link from "next/link";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Placeholder title
        </h1>
        <Link href="/page2" className="font-bold text-white">
          Go to page 2
        </Link>
        <p className="text-2xl text-white">
          {hello.data ? hello.data.greeting : "Loading tRPC query..."}
        </p>
      </div>
    </main>
  );
};

export default Home;
