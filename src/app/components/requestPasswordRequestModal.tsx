"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Description,
} from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordRequestSchema,
  ResetPasswordRequestData,
} from "../types/front";
import clsx from "clsx";
import Loader from "./loader";
import { requestPasswordReset } from "../lib/actions";
import { useToast } from "../context/ToastContext";

type ResetPasswordRequestModalProps = {
  open: boolean;
  profile?: boolean;
  setOpen: (open: boolean) => void;
};

export default function ResetPasswordRequestModal({
  open,
  profile,
  setOpen,
}: ResetPasswordRequestModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordRequestData>({
    resolver: zodResolver(resetPasswordRequestSchema),
  });
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ResetPasswordRequestData) => {
    setIsLoading(true);
    try {
      await requestPasswordReset(data.email);
      addToast("Password reset request sent. Check your email.", "success");
      setOpen(false);
      reset();
    } catch (error) {
      addToast(
        "Failed to send password reset request. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <span
        onClick={() => setOpen(true)}
        className="cursor-pointer text-blue-500"
      >
        {profile ? "Change Password" : "Forgot your password"}
      </span>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md text-center rounded-xl bg-black/60 dark:bg-white/10 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium text-gray-200 justify-center flex"
            >
              Reset Password
            </DialogTitle>
            <Description className="mt-2 text-sm/6 text-white">
              Please enter your email to receive password reset instructions.
            </Description>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-1 justify-center items-center mt-5 w-full pb-10"
            >
              <Field className={"text-left w-full"}>
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
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="grid mt-5 justify-center border rounded-lg text-sm border-black py-2 px-4 text-white hover:scale-[103%] active:scale-100 min-w-16 md:min-w-20 transition-all duration-100 bg-[#4b39c1] font-bold"
              >
                {isLoading ? <Loader /> : "Request Reset"}
              </button>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
