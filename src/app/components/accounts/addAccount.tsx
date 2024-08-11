"use client";
import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Field, Input, Label } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema, AccountData } from "src/app/types/front";
import { useToast } from "src/app/context/ToastContext";
import { createAccount } from "@/lib/actions";
import clsx from "clsx";
import EntityDropdown from "./entityDropdown";
import Loader from "../loader";

type AddAccountProps = {
  openAddAccountModal: boolean;
  setOpenAddAccountModal: (openAddAccountModal: boolean) => void;
  userId: string;
  handleAccountAdded: (currency: string) => void;
};

export default function AddAccount({
  openAddAccountModal,
  setOpenAddAccountModal,
  userId,
  handleAccountAdded,
}: AddAccountProps) {
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AccountData>({
    resolver: zodResolver(accountSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: AccountData) => {
    setIsLoading(true);
    try {
      await createAccount({ ...data, userId });

      addToast("Account created successfully!", "success");
      handleAccountAdded(data.currency);
      setOpenAddAccountModal(false);
      reset();
    } catch (err) {
      addToast("Failed to create account. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={openAddAccountModal}
        onClose={() => setOpenAddAccountModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md text-center rounded-xl bg-opacity-20 bg-black dark:bg-opacity-5 dark:bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium dark:text-gray-200 justify-center flex"
            >
              Add Account
            </DialogTitle>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-1 justify-center items-center mt-5"
            >
              <div className="py-2 md:py-5 border-y-[1px] border-y-blue-500/60 dark:border-y-blue-400/30 grid grid-cols-1 gap-1 w-[95%] md:grid-cols-2 md:gap-2">
                <div className="flex flex-col">
                  <EntityDropdown
                    register={register}
                    setValue={setValue}
                    errors={errors}
                  />
                  <div className="h-4 mb-2">
                    {errors.entityName && (
                      <p className="text-red-500 text-xs">
                        {errors.entityName.message}
                      </p>
                    )}
                    {errors.logo && (
                      <p className="text-red-500 text-xs">
                        {errors.logo?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <Field className={"text-left"}>
                    <Label className="text-sm/6 font-medium dark:text-gray-200">
                      Account Type:
                    </Label>
                    <select
                      {...register("accountType")}
                      className={clsx(
                        "block w-full rounded-lg border-none bg-gray-300/50 placeholder:text-gray-500 dark:bg-white/5 py-1.5 px-3 text-sm/6 dark:text-gray-200",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    >
                      <option value="Checking">Checking</option>
                      <option value="Savings">Savings</option>
                      <option value="CreditCard">Credit Card</option>
                    </select>
                  </Field>
                  <div className="h-4 mb-2">
                    {errors.accountType && (
                      <p className="text-red-500 text-xs">
                        {errors.accountType.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <Field className={"text-left"}>
                    <Label className="text-sm/6 font-medium dark:text-gray-200">
                      Currency:
                    </Label>
                    <select
                      {...register("currency")}
                      className={clsx(
                        "block w-full rounded-lg border-none bg-gray-300/50 placeholder:text-gray-500 dark:bg-white/5 py-2 px-3 text-sm/6 dark:text-gray-200",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    >
                      <option value="USD">USD</option>
                      <option value="ARS">ARS</option>
                      <option value="EUR">EUR</option>
                      <option value="NZD">NZD</option>
                    </select>
                  </Field>
                  <div className="h-4 mb-2">
                    {errors.currency && (
                      <p className="text-red-500 text-xs">
                        {errors.currency.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <Field className={"text-left"}>
                    <Label className="text-sm/6 font-medium dark:text-gray-200">
                      Balance:
                    </Label>
                    <Input
                      step="any"
                      {...register("balance", {
                        required: "Balance is required",
                        valueAsNumber: true,
                        validate: (value) =>
                          !isNaN(value) || "Must be a number",
                      })}
                      placeholder="Balance"
                      required
                      defaultValue={0}
                      className={clsx(
                        "block w-full rounded-lg border-none bg-gray-300/50 placeholder:text-gray-500 dark:bg-white/5 py-1.5 px-3 text-sm/6 dark:text-gray-200",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    />
                  </Field>
                  <div className="h-4 mb-2">
                    {errors.balance && (
                      <p className="text-red-500 text-xs">
                        {errors.balance.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center items-center gap-2 mt-4">
                <button
                  onClick={() => {
                    setOpenAddAccountModal(false);
                    reset();
                  }}
                  type="button"
                  className="w-full rounded-lg bg-red-600 px-3 py-1.5 text-sm/6 font-medium text-gray-200 shadow-sm hover:bg-red-700 sm:col-span-2 sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-3 py-1.5 text-sm/6 font-medium text-gray-200 shadow-sm hover:bg-blue-700 sm:col-span-2 sm:text-sm"
                >
                  {isLoading ? <Loader /> : "Add"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
