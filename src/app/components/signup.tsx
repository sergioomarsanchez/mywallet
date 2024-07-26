"use client";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Field, Input, Label } from "@headlessui/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpData } from "../types/front";
import GoogleIcon from "../assets/icons/google-icon";
import GitHubIcon from "../assets/icons/github-icon";
import Loader from "./loader";
import React from "react";
import { useToast } from "../context/ToastContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

type SignUpProps = {
  openSignupModal: boolean;
  setOpenSignupModal: (openSignupModal: boolean) => void;
};

export default function Signup({
  openSignupModal,
  setOpenSignupModal,
}: SignUpProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (data: SignUpData) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        isSignUp: true, // Indicador para el flujo de registro
      });

      addToast("Signed up successfully, Welcome to My Wallet!", "success");
      setOpenSignupModal(false);
      reset();
      router.push("/auth/verify-request");
    } catch (err) {
      console.log(err, "err en el catch de signUp");
      addToast("Failed to sign up. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderSignUp = (provider: string) => {
    signIn(provider, {
      callbackUrl: "/auth/verify-request",
      isSignUp: true, // Indicador para el flujo de registro
    });
  };

  return (
    <>
      <button
        onClick={() => setOpenSignupModal(true)}
        className="flex justify-center border text-xl border-gray-300 md:border-black dark:md:border-gray-300 py-2 px-4 text-black md:text-white dark:md:text-black hover:scale-[103%] active:scale-100 min-w-16 md:min-w-20 transition-all duration-100 md:bg-[#4b39c1] dark:md:bg-[#976dff] bg-[#c3abff] font-bold"
      >
        Sign up
      </button>
      <Dialog
        open={openSignupModal}
        onClose={() => setOpenSignupModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md text-center rounded-xl bg-black/40 dark:bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            <DialogTitle
              as="h3"
              className="text-lg font-semibold text-gray-200 justify-center flex"
            >
              Sign Up
            </DialogTitle>
            <Description className="mt-2 text-sm/6 text-white">
              Welcome, please sign up to My Wallet
            </Description>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-1 justify-center items-center mt-5"
            >
              <div className="py-2 md:py-5 border-y-[1px] border-y-white/50 grid grid-cols-1 gap-0.5 md:gap-1 w-[95%] md:grid-cols-2 lg:gap-2">
                <div className="flex flex-col">
                  <Field className={"text-left"}>
                    <Label className="text-sm/6 font-medium text-white">
                      First Name:
                    </Label>
                    <Input
                      {...register("firstName")}
                      placeholder="First Name"
                      required
                      className={clsx(
                        "block w-full rounded-lg border-none placeholder:text-gray-500 bg-white/60 py-1.5 px-3 text-sm/6 text-black",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    />
                  </Field>
                  <div className="h-4 mb-2">
                    {errors.firstName && (
                      <p className="text-red-500 text-xs">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <Field className={"text-left"}>
                    <Label className="text-sm/6 font-medium text-white">
                      Last Name:
                    </Label>
                    <Input
                      {...register("lastName")}
                      placeholder="Last Name"
                      required
                      className={clsx(
                        "block w-full rounded-lg border-none placeholder:text-gray-500 bg-white/60 py-1.5 px-3 text-sm/6 text-black",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    />
                  </Field>
                  <div className="h-4 mb-2">
                    {errors.lastName && (
                      <p className="text-red-500 text-xs">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <Field className={"text-left"}>
                    <Label className="text-sm/6 font-medium text-white">
                      Email:
                    </Label>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="Email"
                      required
                      className={clsx(
                        "block w-full rounded-lg border-none placeholder:text-gray-500 bg-white/60 py-1.5 px-3 text-sm/6 text-black",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    />
                  </Field>
                  <div className="h-4 mb-2">
                    {errors.email && (
                      <p className="text-red-500 text-xs">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <Field className={"text-left relative"}>
                    <Label className="text-sm/6 font-medium text-white">
                      Password:
                    </Label>
                    <Input
                      {...register("password")}
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      required
                      className={clsx(
                        "block w-full rounded-lg border-none placeholder:text-gray-500 bg-white/60 py-1.5 px-3 text-sm/6 text-black",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    />
                    <button
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-8"
                      type="button"
                    >
                      {showPass ? (
                        <EyeIcon className="size-6 text-black/60" />
                      ) : (
                        <EyeSlashIcon className="size-6 text-black/60" />
                      )}
                    </button>
                  </Field>
                  <div className="h-4 mb-2">
                    {errors.password && (
                      <p className="text-red-500 text-xs md:max-w-[180px]">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="grid md:col-span-2 mt-5 justify-center border rounded-lg text-sm border-black py-2 px-4 text-white hover:scale-[103%] active:scale-100 min-w-16 md:min-w-20 transition-all duration-100 bg-[#4b39c1] font-bold"
                >
                  {isLoading ? <Loader /> : "Sign Up"}
                </button>
              </div>
            </form>
            <div className="mt-4 px-3">
              <button
                onClick={() => handleProviderSignUp("google")}
                className="flex justify-center items-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800"
              >
                <GoogleIcon className="mr-2 h-5 w-5" />
                Google
              </button>
            </div>
            <div className="mt-4 px-3">
              <button
                onClick={() => handleProviderSignUp("github")}
                className="flex justify-center items-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900"
              >
                <GitHubIcon className="mr-2 h-5 w-5" />
                GitHub
              </button>
            </div>
            <div className="flex gap-4 justify-end mt-5">
              <button
                onClick={() => {
                  setOpenSignupModal(false);
                  reset();
                }}
                className="flex justify-center border rounded-lg text-sm border-black py-2 px-4 text-white hover:scale-[103%] active:scale-100 min-w-16 md:min-w-20 transition-all duration-100 bg-[#c13939] font-bold"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
