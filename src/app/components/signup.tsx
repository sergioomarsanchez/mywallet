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

  const [error, setError] = useState("");

  const onSubmit = async (data: SignUpData) => {
    try {
      const user = await signUpUser(
        data.email,
        data.password,
        data.firstName,
        data.lastName
      );

      if (!user) {
        setError("Failed to sign up. Please try again.");
      } else {
        const res = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (res?.error) {
          setError("Invalid email or password");
        } else {
          router.push("/welcome");
          setOpenSignupModal(false);
          reset();
        }
      }
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenSignupModal(true)}
        className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-2 lg:dark:bg-zinc-800/30 hover:scale-105 transition-all duration-100"
      >
        Sign up
      </button>
      <Dialog
        open={openSignupModal}
        onClose={() => setOpenSignupModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md text-center rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium text-white justify-center flex"
            >
              Sign Up
            </DialogTitle>
            <Description className="mt-2 text-sm/6 text-white/50">
              Welcome, please sign up to My Wallet
            </Description>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-1 justify-center items-center mt-5"
            >
              <div className="py-5 border-y-[1px] border-y-blue-400/30 grid grid-cols-2 gap-2">
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
                        "block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
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
                        "block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
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
                        "block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
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
                    <Label className="text-sm/6 font-medium text-white">
                      Password:
                    </Label>
                    <Input
                      {...register("password")}
                      type="password"
                      placeholder="Password"
                      required
                      className={clsx(
                        "block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    />
                  </Field>
                  <div className="h-4 mb-2">
                    {errors.password && (
                      <p className="text-red-500 text-xs max-w-[180px]">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="rounded-md bg-blue-500/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Sign Up
              </button>
            </form>
            <div className="flex justify-center items-center gap-2 my-5">
              <div className="w-1/4 h-[1px] bg-white/50" />
              <span className="text-sm/6 text-white/50">Or Sing in with</span>
              <div className="w-1/4 h-[1px] bg-white/50" />
            </div>
            <div className="mt-2 flex flex-col gap-2 justify-center items-center">
              <button
                type="button"
                onClick={() => signIn("google")}
                className="rounded-md flex items-center justify-center gap-2 bg-black/20 hover:bg-gray-600/40 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white transition-colors duration-200"
              >
                <GoogleIcon className="size-4" />
                Sign up with Google
              </button>
              <button
                type="button"
                onClick={() => signIn("github")}
                className="rounded-md flex items-center justify-center gap-2 bg-black/20 hover:bg-gray-600/40 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white transition-colors duration-200"
              >
                <GitHubIcon className="size-5" />
                Sign up with GitHub
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
