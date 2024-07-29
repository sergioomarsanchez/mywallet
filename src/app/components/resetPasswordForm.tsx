"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordData } from "../types/front";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Loader from "./loader";
import { resetPassword } from "@/lib/actions";
import { useToast } from "../context/ToastContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

type resetPasswordForm = {
  token: string;
};

export default function ResetPasswordForm({ token }: resetPasswordForm) {
  const router = useRouter();
  const { addToast } = useToast();
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordData) => {
    if (!token) {
      addToast("Invalid or expired token", "error");
      return;
    }
    setIsLoading(true);
    try {
      const newPassword = data.password;
      await resetPassword({ token, newPassword });
      addToast("Password reset successfully", "success");
      router.push("/");
      reset();
    } catch (error) {
      addToast("Failed to reset password. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="w-full relative">
          <label className="block text-sm font-medium text-gray-300 md:text-inherit">
            New Password
          </label>
          <input
            {...register("password")}
            type={showPass ? "text" : "password"}
            required
            autoComplete="new-password"
            className={clsx(
              "block w-full rounded-lg border-none placeholder:text-gray-500 bg-white/60 py-1.5 px-3 text-sm/6 text-black",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              errors.password && "border-[1px] border-red-500"
            )}
          />
          <div className="h-4 mb-2">
            {errors?.password && (
              <p className="text-red-500 text-xs">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <button
            onClick={() => setShowPass(!showPass)}
            className="absolute right-2 top-[26px]"
            type="button"
          >
            {showPass ? (
              <EyeIcon className="size-6 text-black/60" />
            ) : (
              <EyeSlashIcon className="size-6 text-black/60" />
            )}
          </button>
        </div>
        <div className="w-full relative">
          <label className="block text-sm font-medium text-gray-300 md:text-inherit">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            type={showPass ? "text" : "password"}
            required
            autoComplete="new-password"
            className={clsx(
              "block w-full rounded-lg border-none placeholder:text-gray-500 bg-white/60 py-1.5 px-3 text-sm/6 text-black",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              errors.confirmPassword && "border-red-500"
            )}
          />
          <div className="h-4 mb-2">
            {errors?.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors?.confirmPassword?.message}
              </p>
            )}
          </div>
          <button
            onClick={() => setShowPass(!showPass)}
            className="absolute right-2 top-[26px]"
            type="button"
          >
            {showPass ? (
              <EyeIcon className="size-6 text-black/60" />
            ) : (
              <EyeSlashIcon className="size-6 text-black/60" />
            )}
          </button>
        </div>
        <button
          type="submit"
          className="flex justify-center border rounded-lg text-sm border-black py-2 px-4 text-white hover:scale-[103%] active:scale-100 min-w-16 md:min-w-20 transition-all duration-100 bg-[#4b39c1] font-bold w-full"
        >
          {isLoading ? <Loader /> : "Reset Password"}
        </button>
      </form>
    </>
  );
}
