import Link from "next/link";

const ErrorPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:z-[-1] after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-orange-200 after:via-red-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-red-700 before:dark:opacity-10 after:dark:from-orange-900 after:dark:via-[#ff0e01] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <div className="flex items-center justify-center gap-2 flex-col">
          <h1 className="text-slate-200 font-serif text-2xl">
            Ups, Something went wrong while trying to log in, we are sorry,
            please try again
          </h1>
          <Link href="/" passHref>
            <button className="flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-2 lg:dark:bg-zinc-800/30 hover:scale-105 transition-all duration-100">
              Go back to home page
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
