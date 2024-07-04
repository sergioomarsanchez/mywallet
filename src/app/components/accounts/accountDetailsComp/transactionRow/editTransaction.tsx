"use client";

import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Field, Input, Label } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, TransactionData } from "src/app/types/front";
import { useToast } from "src/app/context/ToastContext";
import { updateTransaction } from "@/lib/actions";
import clsx from "clsx";
import Loader from "@/components/loader";
import EntityDropdown from "../../entityDropdown";
import { Transaction } from "src/app/types/back";
import { Category } from "@prisma/client";

type EditTransactionProps = {
  openEditTransactionModal: boolean;
  setOpenEditTransactionModal: (openEditTransactionModal: boolean) => void;
  transaction: Transaction;
  accountId: string;
};

export default function EditTransaction({
  openEditTransactionModal,
  setOpenEditTransactionModal,
  transaction,
  accountId,
}: EditTransactionProps) {
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TransactionData>({
    resolver: zodResolver(transactionSchema),
  });

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: TransactionData) => {
    setIsLoading(true);
    try {
      await updateTransaction(
        transaction.id,
        accountId,
        data,
        transaction.amount,
        transaction.type
      );

      addToast("Transaction updated successfully!", "success");
      setOpenEditTransactionModal(false);
      reset();
    } catch (err) {
      addToast("Failed to update transaction. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={openEditTransactionModal}
        onClose={() => setOpenEditTransactionModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md text-center rounded-xl bg-black/20 dark:bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium dark:text-gray-200 justify-center flex"
            >
              Edit Transaction
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
                    defaultEntityName={transaction.entityName}
                    defaultLogo={transaction.logo ?? ""}
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
                      Amount:
                    </Label>
                    <Input
                      type="number"
                      step="any"
                      defaultValue={transaction.amount}
                      {...register("amount", {
                        required: "Amount is required",
                        valueAsNumber: true,
                        validate: (value) =>
                          !isNaN(value) || "Must be a number",
                      })}
                      placeholder="Amount"
                      required
                      className={clsx(
                        "block w-full rounded-lg border-none bg-gray-300/50 placeholder:text-gray-500 dark:bg-white/5 py-1.5 px-3 text-sm/6 dark:text-gray-200",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    />
                  </Field>
                  <div className="h-4 mb-2">
                    {errors.amount && (
                      <p className="text-red-500 text-xs">
                        {errors.amount.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <Field className={"text-left"}>
                    <Label className="text-sm/6 font-medium dark:text-gray-200">
                      Type:
                    </Label>
                    <select
                      {...register("type")}
                      defaultValue={transaction.type}
                      className={clsx(
                        "block w-full rounded-lg border-none bg-gray-300/50 placeholder:text-gray-500 dark:bg-white/5 py-2 px-3 text-sm/6 dark:text-gray-200",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    >
                      <option value="Debit">Debit</option>
                      <option value="Credit">Credit</option>
                    </select>
                  </Field>
                  <div className="h-4 mb-2">
                    {errors.type && (
                      <p className="text-red-500 text-xs">
                        {errors.type.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <Field className={"text-left"}>
                    <Label className="text-sm/6 font-medium dark:text-gray-200">
                      Method:
                    </Label>
                    <select
                      {...register("method")}
                      defaultValue={transaction.method}
                      className={clsx(
                        "block w-full rounded-lg border-none bg-gray-300/50 placeholder:text-gray-500 dark:bg-white/5 py-2 px-3 text-sm/6 dark:text-gray-200",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    >
                      <option value="Debit">Debit</option>
                      <option value="Credit">Credit</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </Field>
                  <div className="h-4 mb-2">
                    {errors.method && (
                      <p className="text-red-500 text-xs">
                        {errors.method.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <Field className={"text-left"}>
                    <Label className="text-sm/6 font-medium dark:text-gray-200">
                      Category:
                    </Label>
                    <select
                      {...register("category")}
                      defaultValue={transaction.category}
                      className={clsx(
                        "block w-full rounded-lg border-none bg-gray-300/50 placeholder:text-gray-500 dark:bg-white/5 py-2 px-3 text-sm/6 dark:text-gray-200",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    >
                      {Object.keys(Category).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <div className="h-4 mb-2">
                    {errors.category && (
                      <p className="text-red-500 text-xs">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <Field className={"text-left"}>
                    <Label className="text-sm/6 font-medium dark:text-gray-200">
                      Date:
                    </Label>
                    <Input
                      type="date"
                      defaultValue={formatDate(transaction.date)}
                      {...register("date", {
                        required: "Date is required",
                      })}
                      className={clsx(
                        "block w-full rounded-lg border-none bg-gray-300/50 placeholder:text-gray-500 dark:bg-white/5 py-1 px-3 text-sm/6 dark:text-gray-200",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    />
                  </Field>
                  <div className="h-4 mb-2">
                    {errors.date && (
                      <p className="text-red-500 text-xs">
                        {errors.date.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center items-center gap-2 mt-4">
                <button
                  type="button"
                  className="rounded-md bg-red-500/30 hover:bg-red-500/70 py-1 px-2 text-sm font-sm text-white/70 active:text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white transition-colors duration-200"
                  onClick={() => setOpenEditTransactionModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md flex justify-center items-center bg-blue-500/20 hover:bg-blue-500/70 py-1 px-2 text-sm font-medium dark:text-gray-200 focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white min-w-20 transition-colors duration-200"
                >
                  {isLoading ? <Loader /> : "Edit"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
