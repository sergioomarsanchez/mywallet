"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Field, Input, Label } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema, AccountData } from "src/app/types/front";
import { useToast } from "src/app/context/ToastContext";
import { updateAccount } from "@/lib/actions";
import clsx from "clsx";
import EntityDropdown from "../entityDropdown";
import Loader from "@/components/loader";
import { Account } from "src/app/types/back";

type EditAccountProps = {
  openEditAccountModal: boolean;
  setOpenEditAccountModal: (openEditAccountModal: boolean) => void;
  account: Account;
};

export default function EditAccount({
  openEditAccountModal,
  setOpenEditAccountModal,
  account,
}: EditAccountProps) {
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
      await updateAccount({ ...data, id: account.id });

      addToast("Account updated successfully!", "success");
      setOpenEditAccountModal(false);
      reset();
    } catch (err) {
      addToast("Failed to update account. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={openEditAccountModal}
        onClose={() => setOpenEditAccountModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md text-center rounded-xl bg-black/20 dark:bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium dark:text-gray-200 justify-center flex"
            >
              Edit Account
            </DialogTitle>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-1 justify-center items-center mt-5"
            >
              <div className="py-2 md:py-5 border-y-[1px] border-y-blue-500/60 dark:border-y-blue-400/30 grid grid-cols-1 gap-1 w-[95%] md:grid-cols-2 md:gap-2">
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
                      defaultValue={account.accountType}
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
                  <EntityDropdown
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    defaultEntityName={account.entityName}
                    defaultLogo={account.logo ?? ""}
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
                      defaultValue={account.balance}
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
                      defaultValue={account.currency}
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
              </div>
              <button
                type="submit"
                className="rounded-md flex justify-center items-center bg-blue-500/20 hover:bg-blue-500/70  py-2 px-4 text-sm font-medium dark:text-gray-200 focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white min-w-32 transition-colors duration-200"
              >
                {isLoading ? <Loader /> : "Update Account"}
              </button>
            </form>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => {
                  setOpenEditAccountModal(false);
                  reset();
                }}
                type="button"
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
