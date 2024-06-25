import { getServerSession } from "next-auth";
import { authOption } from "../lib/auth";

const WelcomePage = async () => {
  const session = await getServerSession(authOption);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:z-[-1] after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-gray-200 after:via-slate-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-gray-700 before:dark:opacity-10 after:dark:from-blue-900 after:dark:via-[#0127ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <h1>Welcome, {session?.user?.name}!</h1>
      </div>
    </main>
  );
};

export default WelcomePage;
