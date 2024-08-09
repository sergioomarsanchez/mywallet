"use client";
import React, { useState } from "react";
import { Account, Transaction } from "src/app/types/back";
import TransactionList from "./accountDetailsComp/transactionList";
import AddTransaction from "./accountDetailsComp/addTransaction";
import PlusIcon from "@heroicons/react/20/solid/PlusIcon";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";

interface AccountDetailsProps {
  account: Account;
  transactions: Transaction[] | null;
}

const AccountDetails = ({ account, transactions }: AccountDetailsProps) => {
  const [openAddTransactionModal, setOpenAddTransactionModal] =
    useState<boolean>(false);
  const openModal = () => setOpenAddTransactionModal(true);

  return (
    <div className="pt-1 lg:pt-4">
      <div className="mt-4 md:relative">
        <h2 className="text-sm md-text-lg font-thin dark:text-gray-400 text-gray-800">
          Transactions
        </h2>
        <div className="rounded-xl bg-black/5 dark:bg-white/5 p-3 w-full h-full justify-center pr-8">
          <table className="w-full">
            <thead className="w-full bg-white/10 dark:bg-black/10 font-thin uppercase py-2">
              <tr className="w-full hidden lg:table-row text-opacity-60 text-sm">
                <th className="text-left font-thin"></th>
                <th className="text-left font-thin">Company</th>
                <th className="hidden lg:table-cell text-left font-thin">
                  Date
                </th>
                <th className="hidden lg:table-cell font-thin">Method</th>
                <th className="hidden lg:table-cell font-thin">Category</th>
                <th className="text-right font-thin">Amount</th>
                <th className="text-right font-thin"></th>
              </tr>
            </thead>
            <tbody className="w-full">
              {transactions?.length ? (
                transactions.map((transaction) => (
                  <TransactionList
                    key={transaction.id}
                    transaction={transaction}
                    currency={account.currency}
                  />
                ))
              ) : (
                <tr className="flex italic px-2 lg:px-10 py-2 lg:py-5 font-thin justify-center items-center col-span-4 lg:col-span-7 gap-2">
                  <span>Add a transaction by clicking the</span>
                  <span className="md:hidden font-bold text-lg">+</span>
                  <span className="hidden md:flex font-bold">
                    +Add transaction button
                  </span>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button
          onClick={openModal}
          className="md:hidden fixed bottom-14 right-5 rounded-full p-4 md:py-1 text-sm/6 font-semibold bg-blue-300/80 md:bg-blue-300/30 active:bg-blue-300/70 dark:bg-blue-500/80 dark:md:bg-blue-500/30 dark:active:bg-blue-500/70 transition-colors duration-200 flex items-center justify-center z-10"
        >
          <ArrowsRightLeftIcon className="size-5" />
          <PlusIcon className="size-4 absolute top-1 right-2 font-extrabold" />
        </button>
        <button
          onClick={openModal}
          className="md:absolute hidden right-0 -top-5 rounded-md p-2 py-1 px-3 text-sm/6 font-semibold bg-blue-300/80 md:bg-blue-300/30 hover:bg-blue-300/70 dark:bg-blue-500/80 dark:md:bg-blue-500/30 dark:hover:bg-blue-500/70 transition-colors duration-200 md:flex items-center justify-center gap-2 z-10"
        >
          <PlusIcon className="size-8 md:size-4" />
          <span className="hidden md:flex mr-3">Add transaction</span>
        </button>
        <AddTransaction
          accountId={account.id}
          userId={account.userId}
          openAddTransactionModal={openAddTransactionModal}
          setOpenAddTransactionModal={setOpenAddTransactionModal}
        />
      </div>
    </div>
  );
};

export default AccountDetails;
