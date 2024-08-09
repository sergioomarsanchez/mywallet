import { getServerSession } from "next-auth";
import { authOption } from "../lib/auth";
import React from "react";
import LogoIcon from "../assets/icons/logo-icon";
import { BanknotesIcon } from "@heroicons/react/24/outline";

const WelcomePage = async () => {
  const session = await getServerSession(authOption);

  return (
    <main className="flex flex-col justify-center p-2 lg:pl-8 pb-20">
      <header className="pb-6 text-center lg:text-left">
        <h1 className="text-base md:text-lg lg:text-xl font-light flex justify-center items-center lg:justify-start text-center lg:text-left flex-wrap whitespace-nowrap">
          Hello{" "}
          <span className="dark:text-violet-400 text-violet-900 ml-2 italic font-bold">
            {session?.user?.name},
          </span>
          welcome to <LogoIcon className="size-8 lg:size-10 mx-2" /> My Wallet!
        </h1>
      </header>
      <div className="relative flex flex-col text-center lg:text-left before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:z-[-1] after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-gray-200 after:via-slate-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-gray-700 before:dark:opacity-10 after:dark:from-blue-900 after:dark:via-[#0127ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px] lg:pl-5 lg:w-[75%]">
        <h2 className="text-lg my-4 text-center lg:text-left font-bold">
          We are really happy you decided to join us!
        </h2>
        <p className="text-xs lg:text-sm font-thin text-center lg:text-left ">
          Here are some useful information to take advantage of your profile and
          the benefits of using My Wallet to track your income and spendings.
        </p>
        <h3 className="text-base my-4 lg:my-8 text-center lg:text-left tracking-widest">
          First steps in My Wallet
        </h3>
        <p className="text-xs lg:text-sm font-thin text-center lg:text-left">
          The main goal of My Wallet is for you to have a general overview of
          your accounts and transactions, no matter where the entity you have
          your currency in.
        </p>
        <p className="text-xs lg:text-sm font-thin text-center lg:text-left flex flex-wrap justify-center lg:justify-start mt-2">
          So we suggest that, in the{" "}
          <span className="flex items-center mx-2 font-bold text-xs lg:text-sm">
            <BanknotesIcon className="size-4 mr-2" />
            Accounts
          </span>
          page, you add your accounts and start adding your transactions.
        </p>
        <h3 className="text-base my-4 lg:my-8 text-center lg:text-left tracking-widest">
          Profile Page
        </h3>
        <p className="text-xs lg:text-sm font-thin text-center lg:text-left">
          In this section, you can set up or edit your account data.
        </p>
        <h3 className="text-base my-4 lg:my-8 text-center lg:text-left tracking-widest">
          Overview Page
        </h3>
        <p className="text-xs lg:text-sm font-thin text-center lg:text-left">
          You will be able to check the total amount of money you own in each
          account and in general, in any currency (USD, ARS, NZD, or EUR).
        </p>
        <p className="text-xs lg:text-sm font-thin text-center lg:text-left mt-4">
          In each account card, you can check each account`s monthly movement
          compared to the last month, discriminated by income and spendings.
        </p>
        <h3 className="text-base my-4 lg:my-8 text-center lg:text-left tracking-widest">
          Accounts Page and Account Detail Page
        </h3>
        <p className="text-xs lg:text-sm font-thin text-center lg:text-left">
          This will be the page where you can add and delete your accounts. You
          can also see your currency tag to check your account filtered by
          currencies. Once you decide to add transactions, you can click on the
          corresponding account card and open the Account Detail page.
        </p>
        <p className="text-xs lg:text-sm font-thin text-center lg:text-left mt-4">
          In the Account Detail page, you can edit the selected account, and you
          can add, edit, or delete transactions. You can also navigate to the
          other accounts you own, check the chart of your last year movements
          discriminated by income and spendings per month.
        </p>
      </div>
    </main>
  );
};

export default WelcomePage;
