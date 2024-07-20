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
            <div className="max-w-sm mx-auto w-full px-4 py-8 pb-52 flex flex-col justify-center items-center md:justify-start md:items-start gap-2">
              <h1 className="text-center md:text-left text-lg md:text-2xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                Welcome to My Wallet! ✨
              </h1>
              <p className="text-sm font-thin text-center md:text-left mb-5">
                If you already have an account, please sign in. If not, we
                invite you to join us by signing up.
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
