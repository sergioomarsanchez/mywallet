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
import { format, addDays } from "date-fns";

type EditTransactionProps = {
  openEditTransactionModal: boolean;
  setOpenEditTransactionModal: (openEditTransactionModal: boolean) => void;
  transaction: Transaction;
  accountId: string;
};

const debitCategories = [
  "Housing",
  "Transportation",
  "Food",
  "Entertainment",
  "Utilities",
  "Insurance",
  "Healthcare",
  "DebtRepayment",
  "Savings",
  "Investments",
  "Taxes",
  "Gifts",
  "Other",
];

const creditCategories = [
  "Salary",
  "FreelanceContractWork",
  "RentalIncome",
  "Gifts",
  "Investments",
  "Other",
];

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
    watch,
  } = useForm<TransactionData>({
    resolver: zodResolver(transactionSchema),
  });

  const formatDate = (date: Date) => {
    const correctedDate = addDays(date, 1)
    return format(correctedDate, "yyyy-MM-dd");
  };

  const [isLoading, setIsLoading] = useState(false);
  const transactionType = watch("type", transaction.type);

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
        <DialogPanel className="w-full scale-[90%] md:scale-100 max-w-md text-center rounded-xl bg-gradient-to-br shadow-lg from-slate-300 to-slate-400 dark:from-slate-800 dark:to-slate-950 p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
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
                        "block w-full rounded-lg border-none bg-gray-100 placeholder:text-gray-500 dark:bg-white/5 py-1.5 px-3 text-sm/6 dark:text-gray-200",
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
                        "block w-full rounded-lg border-none bg-gray-100 placeholder:text-gray-500 dark:bg-white/5 py-2 px-3 text-sm/6 dark:text-gray-200",
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
                        "block w-full rounded-lg border-none bg-gray-100 placeholder:text-gray-500 dark:bg-white/5 py-2 px-3 text-sm/6 dark:text-gray-200",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    >
                      {transactionType === "Debit" ? (
                        <>
                          <option value="Debit">Debit</option>
                          <option value="Cash">Cash</option>
                        </>
                      ) : (
                        <>
                          <option value="Credit">Credit</option>
                          <option value="Cash">Cash</option>
                        </>
                      )}
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
                        "block w-full rounded-lg border-none bg-gray-100 placeholder:text-gray-500 dark:bg-white/5 py-2 px-3 text-sm/6 dark:text-gray-200",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    >
                      {transactionType === "Debit"
                        ? debitCategories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))
                        : creditCategories.map((cat) => (
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
                      defaultValue={formatDate(new Date(transaction.date))}
                      {...register("date")}
                      placeholder="Date"
                      required
                      className={clsx(
                        "block w-full rounded-lg border-none bg-gray-100 placeholder:text-gray-500 dark:bg-white/5 py-1.5 px-3 text-sm/6 dark:text-gray-200",
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
                  className="w-full rounded-lg bg-red-600 dark:bg-red-800 px-3 py-1.5 text-sm/6 font-medium text-gray-200 shadow-sm hover:bg-red-700 sm:col-span-2 sm:text-sm"
                  onClick={() => {
                    setOpenEditTransactionModal(false);
                    reset();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center w-full rounded-lg bg-blue-600 dark:bg-blue-800 px-3 py-1.5 text-sm/6 font-medium text-gray-200 shadow-sm hover:bg-blue-700 sm:col-span-2 sm:text-sm"
                >
                  {isLoading ? <Loader /> : "Save"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
