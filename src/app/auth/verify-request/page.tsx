import React from "react";
import LogoIcon from "src/app/assets/icons/logo-icon";

const ErrorPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-10 p-5 md:p-10 xl:p-24">
      <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:z-[-1] after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-orange-200 after:via-red-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-green-700 before:dark:opacity-10 after:dark:from-green-900 after:dark:via-[#01ff1a] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <header className="pb-6 text-center lg:text-left">
          <h1 className="text-xl lg:text-2xl font-light flex justify-center items-center lg:justify-start text-center lg:text-left flex-wrap">
            Welcome to
            <span className="flex items-center justify-center whitespace-nowrap">
              <LogoIcon className="size-8 lg:size-10 mx-2" /> My Wallet!
            </span>
          </h1>
        </header>
        <div className="text-center lg:text-left">
          <h2 className="text-lg my-4 text-center lg:text-left font-bold">
            Please Verify Your Email
          </h2>
          <p className="text-sm lg:text-base font-thin text-center lg:text-left lg:max-w-3xl">
            We have sent a verification email to your registered email address.
            Please check your inbox and follow the instructions to verify your
            email address. Once verified, you can start using My Wallet.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
