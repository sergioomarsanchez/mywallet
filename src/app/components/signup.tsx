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
import { signUpUser } from "../lib/actions";
import Loader from "./loader";
import React from "react";
import { useToast } from "../context/ToastContext";

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

  const onSubmit = async (data: SignUpData) => {
    setIsLoading(true);
    try {
      const user = await signUpUser(
        data.email,
        data.password,
        data.firstName,
        data.lastName
      );

      if (!user) {
        addToast("Failed to sign up. Please try again.", "error");
      } else {
        const res = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (res?.error) {
          addToast("Invalid email or password", "warning");
        } else {
          addToast("Signed up successfully, Welcome to My Wallet!", "success");
          router.push("/welcome");
          setOpenSignupModal(false);
          reset();
        }
      }
    } catch (err) {
      addToast("Failed to sign up. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenSignupModal(true)}
        className="flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:from-inherit static w-auto text-sm lg:text-base rounded-xl border bg-gray-200 p-1 dark:bg-[#B9D1A7]/30 hover:dark:bg-[#B9D1A7]/70 hover:scale-[103%] active:scale-100 min-w-16 md:min-w-20 transition-all duration-100"
      >
        Sign up
      </button>
      <Dialog
        open={openSignupModal}
        onClose={() => setOpenSignupModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md text-center rounded-xl bg-black/20 dark:bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium dark:text-gray-200 justify-center flex"
            >
              Sign Up
            </DialogTitle>
            <Description className="mt-2 text-sm/6 text-gray-600 dark:text-white/50">
              Welcome, please sign up to My Wallet
            </Description>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-1 justify-center items-center mt-5"
            >
              <div className="py-2 md:py-5 border-y-[1px] border-y-blue-500/60 dark:border-y-blue-400/30 grid grid-cols-1 gap-1 w-[95%] md:grid-cols-2 md:gap-2">
                <div className="flex flex-col">
                  <Field className={"text-left"}>
                    <Label className="text-sm/6 font-medium dark:text-gray-200">
                      First Name:
                    </Label>
                    <Input
                      {...register("firstName")}
                      placeholder="First Name"
                      required
                      className={clsx(
                        "block w-full rounded-lg border-none bg-gray-300/50 placeholder:text-gray-500 dark:bg-white/5 py-1.5 px-3 text-sm/6 dark:text-gray-200",
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
                    <Label className="text-sm/6 font-medium dark:text-gray-200">
                      Last Name:
                    </Label>
                    <Input
                      {...register("lastName")}
                      placeholder="Last Name"
                      required
                      className={clsx(
                        "block w-full rounded-lg border-none bg-gray-300/50 placeholder:text-gray-500 dark:bg-white/5 py-1.5 px-3 text-sm/6 dark:text-gray-200",
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
                    <Label className="text-sm/6 font-medium dark:text-gray-200">
                      Email:
                    </Label>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="Email"
                      required
                      className={clsx(
                        "block w-full rounded-lg border-none bg-gray-300/50 placeholder:text-gray-500 dark:bg-white/5 py-1.5 px-3 text-sm/6 dark:text-gray-200",
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
                  <Field className={"text-left"}>
                    <Label className="text-sm/6 font-medium dark:text-gray-200">
                      Password:
                    </Label>
                    <Input
                      {...register("password")}
                      type="password"
                      placeholder="Password"
                      required
                      className={clsx(
                        "block w-full rounded-lg border-none bg-gray-300/50 placeholder:text-gray-500 dark:bg-white/5 py-1.5 px-3 text-sm/6 dark:text-gray-200",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    />
                  </Field>
                  <div className="h-4 mb-2">
                    {errors.password && (
                      <p className="text-red-500 text-xs md:max-w-[180px]">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="rounded-md flex justify-center items-center bg-blue-500/20 py-2 px-4 text-sm font-medium dark:text-gray-200 focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white min-w-24"
              >
                {isLoading ? <Loader /> : "Sign Up"}
              </button>
            </form>
            <div className="flex justify-center items-center gap-2 my-5">
              <div className="w-1/4 h-[1px] bg-gray-700/50 dark:bg-white/50" />
              <span className="text-sm/6 text-gray-600 dark:text-white/50">
                Or sing up with
              </span>
              <div className="w-1/4 h-[1px] bg-gray-700/50 dark:bg-white/50" />
            </div>
            <div className="mt-2 flex gap-2 justify-center items-center mb-5">
              <button
                type="button"
                onClick={() => {
                  signIn("google", { callbackUrl: "/profile" });
                  addToast("Welcome back, nice to see you again.", "success");
                }}
                className="rounded-md flex items-center justify-center gap-2 bg-black/20 hover:bg-gray-600/40 py-2 px-4 text-sm font-medium dark:text-gray-200 focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white transition-colors duration-200"
              >
                <GoogleIcon className="size-4" />
                Google
              </button>
              <button
                type="button"
                onClick={() => {
                  signIn("github", { callbackUrl: "/profile" });
                  addToast("Welcome back, nice to see you again.", "success");
                }}
                className="rounded-md flex items-center justify-center gap-2 bg-black/20 hover:bg-gray-600/40 py-2 px-4 text-sm font-medium dark:text-gray-200 focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white transition-colors duration-200"
              >
                <GitHubIcon className="size-5" />
                GitHub
              </button>
            </div>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => {
                  setOpenSignupModal(false);
                  reset();
                }}
                className="rounded-md bg-red-500/30 hover:bg-red-500/70 py-1 px-2 text-sm font-sm text-white/70 active:text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white transition-colors duration-200"
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
