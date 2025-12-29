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
  setOpenAddAccountModal: (open: boolean) => void;
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
    defaultValues: {
      entityName: "",
      logo: "",
      accountType: "Checking",
      currency: "USD",
      balance: 0,
    },
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
    <Dialog
      open={openAddAccountModal}
      onClose={() => {
        setOpenAddAccountModal(false);
        reset();
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-gradient-to-br from-slate-300 to-slate-400 p-6 shadow-lg dark:from-slate-800 dark:to-slate-950">
          <DialogTitle className="flex justify-center text-base font-medium dark:text-gray-200">
            Add Account
          </DialogTitle>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 flex flex-col items-center gap-4"
          >
            <div className="grid w-[95%] grid-cols-1 gap-2 border-y border-y-blue-500/60 py-4 dark:border-y-blue-400/30 md:grid-cols-2">
              {/* ENTITY */}
              <div className="flex flex-col">
                <EntityDropdown setValue={setValue} errors={errors} />
              </div>

              {/* ACCOUNT TYPE */}
              <div className="flex flex-col">
                <Field>
                  <Label className="text-sm font-medium dark:text-gray-200">
                    Account Type
                  </Label>
                  <select
                    {...register("accountType")}
                    className={clsx(
                      "w-full rounded-lg bg-gray-100 px-3 py-2 text-sm dark:bg-white/5 dark:text-gray-200",
                      "focus:outline-none"
                    )}
                  >
                    <option value="Checking">Checking</option>
                    <option value="Savings">Savings</option>
                    <option value="CreditCard">Credit Card</option>
                  </select>
                </Field>
                {errors.accountType && (
                  <p className="text-xs text-red-500">
                    {errors.accountType.message}
                  </p>
                )}
              </div>

              {/* CURRENCY */}
              <div className="flex flex-col">
                <Field>
                  <Label className="text-sm font-medium dark:text-gray-200">
                    Currency
                  </Label>
                  <select
                    {...register("currency")}
                    className={clsx(
                      "w-full rounded-lg bg-gray-100 px-3 py-2 text-sm dark:bg-white/5 dark:text-gray-200",
                      "focus:outline-none"
                    )}
                  >
                    <option value="USD">USD</option>
                    <option value="ARS">ARS</option>
                    <option value="EUR">EUR</option>
                    <option value="NZD">NZD</option>
                  </select>
                </Field>
                {errors.currency && (
                  <p className="text-xs text-red-500">
                    {errors.currency.message}
                  </p>
                )}
              </div>

              {/* BALANCE */}
              <div className="flex flex-col">
                <Field>
                  <Label className="text-sm font-medium dark:text-gray-200">
                    Balance
                  </Label>
                  <Input
                    type="number"
                    step="any"
                    {...register("balance", {
                      valueAsNumber: true,
                    })}
                    className={clsx(
                      "w-full rounded-lg bg-gray-100 px-3 py-1.5 text-sm dark:bg-white/5 dark:text-gray-200",
                      "focus:outline-none"
                    )}
                  />
                </Field>
                {errors.balance && (
                  <p className="text-xs text-red-500">
                    {errors.balance.message}
                  </p>
                )}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex w-full gap-2">
              <button
                type="button"
                onClick={() => {
                  setOpenAddAccountModal(false);
                  reset();
                }}
                className="w-full rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-gray-200 hover:bg-red-700 dark:bg-red-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-gray-200 hover:bg-blue-700 dark:bg-blue-800"
              >
                {isLoading ? <Loader /> : "Add"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
