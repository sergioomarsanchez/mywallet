"use client";
import React from "react";
import AuthHeader from "src/app/(auth)/auth-header";
import AuthImage from "src/app/(auth)/auth-image";
import { useParams } from "next/navigation";
import ResetPasswordForm from "@/components/resetPasswordForm";

export default async function Reset() {
  const params = useParams();
  const token = params.token as string;

  return (
    <main className="bg-transparent md:bg-gray-300 md:dark:bg-black">
      <div className="relative md:flex">
        <div className="md:w-1/2 z-10">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <AuthHeader />
            <div className="max-w-sm lg:max-w-lg mx-auto w-full px-4 py-8 pb-52 flex flex-col justify-center items-center md:justify-start md:items-start gap-2">
              <h1 className="text-center md:text-left text-2xl lg:text-3xl xl:text-5xl font-bold mb-6 text-white md:text-black dark:md:text-white">
                Reset Password
              </h1>
              <p className="text-sm lg:text-base font-extralight text-white md:text-black dark:md:text-white text-center md:text-left mb-8">
                Please, change your password by inputing it below:
              </p>
              <ResetPasswordForm token={token} />
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
