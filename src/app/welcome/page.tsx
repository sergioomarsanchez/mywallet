import { getServerSession } from "next-auth";
import { authOption } from "../lib/auth";
import React from "react";
import LogoIcon from "../assets/icons/logo-icon";

const WelcomePage = async () => {
  const session = await getServerSession(authOption);

  return (
    <main className="flex flex-col justify-center p-2 lg:pl-8">
      <header className="pb-6 text-center lg:text-left">
        <h1 className="text-base md:text-lg font-light flex justify-center items-center lg:justify-start text-center lg:text-left flex-wrap whitespace-nowrap">
          Hello{" "}
          <span className="dark:text-violet-400 text-violet-900 ml-2 italic font-bold">
            {session?.user?.name},
          </span>
          welcome to <LogoIcon className="size-8 lg:size-10 mx-2" /> My Wallet!
        </h1>
      </header>
      <div className="relative flex flex-col text-center lg:text-left before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:z-[-1] after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-gray-200 after:via-slate-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-gray-700 before:dark:opacity-10 after:dark:from-blue-900 after:dark:via-[#0127ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px] lg:pl-5">
        <h2 className="text-base my-4 text-center lg:text-left">
          We are really happy you decided to to join us!
        </h2>
        <p className="text-xs lg:text-sm font-thin text-center lg:text-left">
          Here are some usefull infomration to take advantage of your profile
          and the benefits of using My wallet to track your income and spendings.
        </p>
      </div>
    </main>
  );
};

export default WelcomePage;
