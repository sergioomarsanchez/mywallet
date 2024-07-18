import { getServerSession } from "next-auth";
import { authOption } from "./lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import AuthHeader from "./(auth)/auth-header";
import AuthImage from "./(auth)/auth-image";

export default async function Home() {
  const session = await getServerSession(authOption);

  if (session) redirect("/profile/overview");

  return (
    <main className="bg-gray-300 dark:bg-black">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <AuthHeader />

            <div className="max-w-sm mx-auto w-full px-4 py-8 pb-52">
              <h1 className="text-center md:text-left text-lg md:text-2xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                Welcome to My Wallet! ✨
              </h1>
              <p className="text-sm font-thin text-center md:text-left">
                Please, if you have an account, Sign in, if you do not have one,
                we want you to join us by clicking in Sign up.
              </p>
            </div>
          </div>
        </div>

        <AuthImage />
      </div>
    </main>
  );
}
