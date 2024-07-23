import { getServerSession } from "next-auth";
import { authOption } from "./lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import AuthHeader from "./(auth)/auth-header";
import AuthImage from "./(auth)/auth-image";
import SignInUp from "./components/signInUp";
export default async function Home() {
  const session = await getServerSession(authOption);
  if (session) redirect("/profile/overview");
  return (
    <main className="bg-transparent md:bg-gray-300 md:dark:bg-black">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2 z-10">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <AuthHeader />
            <div className="max-w-sm lg:max-w-lg mx-auto w-full px-4 py-8 pb-52 flex flex-col justify-center items-center md:justify-start md:items-start gap-2">
              <h1 className="text-center md:text-left text-2xl lg:text-3xl xl:text-5xl font-bold mb-6 text-white md:text-black dark:md:text-white">
                Welcome to{" "}
                <span className="whitespace-nowrap md:text-[#4b39c1] dark:md:text-[#c3abff] text-[#c3abff]">
                  My Wallet! ✨
                </span>
              </h1>
              <p className="text-sm lg:text-base font-extralight text-white md:text-black dark:md:text-white text-center md:text-left mb-8">
                Effortlessly manage your finances with our comprehensive app.
                Track income, monitor spending, and gain insights into your
                financial health.
              </p>

              <SignInUp />
            </div>
          </div>
        </div>
        <div className="">
          <AuthImage />
        </div>
      </div>
    </main>
  );
}
