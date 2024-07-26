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
import { SignInData, signInSchema } from "../types/front";
import GoogleIcon from "../assets/icons/google-icon";
import GitHubIcon from "../assets/icons/github-icon";
import Loader from "./loader";
import React from "react";
import { useToast } from "../context/ToastContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import ResetPasswordRequestModal from "./requestPasswordRequestModal";

type SignInProps = {
  openSigninModal: boolean;
  setOpenSigninModal: (openSigninModal: boolean) => void;
};

export default function SignIn({
  openSigninModal,
  setOpenSigninModal,
}: SignInProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);

  const onSubmit = async (data: SignInData) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        addToast("Invalid email or password, try again.", "warning");
      } else {
        addToast("Signed in successfully, Welcome back!", "success");
        router.push("/profile");
        setOpenSigninModal(false);
        reset();
      }
    } catch (err) {
      addToast("Failed to sign in. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenSigninModal(true)}
        className="flex justify-center border text-xl rounded-lg py-2 px-4 border-black dark:border-gray-300 bg-transparent hover:scale-[103%] active:scale-100 min-w-16 md:min-w-20 transition-all duration-100 md:text-[#4b39c1] dark:md:text-[#c3abff] text-[#c3abff] font-bold"
      >
        Sign in
      </button>
      <Dialog
        open={openSigninModal}
        onClose={() => setOpenSigninModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/10">
          <DialogPanel className="w-full max-w-md text-center rounded-xl bg-black/40 dark:bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            <DialogTitle
              as="h3"
              className="text-lg font-semibold text-gray-200 justify-center flex"
            >
              Sign in
            </DialogTitle>
            <Description className="mt-2 text-sm/6 text-white">
              Welcome back, please sign in to your account
            </Description>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-1 justify-center items-center mt-5"
            >
              <div className="py-2 md:py-5 border-y-[1px] border-y-white/50 grid grid-cols-1 w-[95%] gap-2">
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
                    {errors?.email && (
                      <p className="text-red-500 text-xs">
                        {errors?.email?.message}
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
                      <p className="text-red-500 text-xs">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex justify-center border rounded-lg text-sm border-black py-2 px-4 text-white hover:scale-[103%] active:scale-100 min-w-16 md:min-w-20 transition-all duration-100 bg-[#4b39c1] font-bold mt-5"
                >
                  {isLoading ? <Loader /> : "Sign In"}
                </button>
                <ResetPasswordRequestModal
                  open={openResetPasswordModal}
                  setOpen={setOpenResetPasswordModal}
                />
              </div>
            </form>
            <div className="flex justify-center items-center gap-2 my-5">
              <div className="w-1/4 h-[1px] bg-white/50" />
              <span className="text-sm/6 text-white">Or sing in with</span>
              <div className="w-1/4 h-[1px] bg-white/50" />
            </div>
            <div className="mt-4 px-3">
              <button
                type="button"
                onClick={() => {
                  signIn("google", { callbackUrl: "/profile" });
                }}
                className="flex justify-center items-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800"
              >
                <GoogleIcon className="size-4" />
                Google
              </button>
            </div>
            <div className="mt-4 px-3">
              <button
                type="button"
                onClick={() => {
                  signIn("github", { callbackUrl: "/profile" });
                }}
                className="flex justify-center items-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900"
              >
                <GitHubIcon className="size-5" />
                GitHub
              </button>
            </div>
            <div className="flex gap-4 justify-end mt-5">
              <button
                onClick={() => {
                  setOpenSigninModal(false);
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
