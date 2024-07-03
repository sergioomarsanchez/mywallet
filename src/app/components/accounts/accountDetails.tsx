"use client";
import React, { useState } from "react";
import { Account, Transaction } from "src/app/types/back";
import TransactionList from "./accountDetailsComp/transactionList";
import AddTransaction from "./accountDetailsComp/addTransaction";
import { boolean } from "zod";
import PlusIcon from "@heroicons/react/20/solid/PlusIcon";

interface AccountDetailsProps {
  account: Account;
  transactions: Transaction[] | null;
}

const AccountDetails = ({ account, transactions }: AccountDetailsProps) => {
  const [openAddTransactionModal, setOpenAddTransactionModal] =
    useState<boolean>(false);
  const openModal = () => setOpenAddTransactionModal(true);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{account.entityName}</h1>
      <p className="text-sm text-gray-500">{account.accountType}</p>
      <p className="text-lg font-semibold">
        {account.balance.toFixed(2)} {account.currency}
      </p>
      <div className="mt-4">
        {transactions ? (
          <TransactionList transactions={transactions} />
        ) : (
          <span>No transactions added to this account yet.</span>
        )}
        <button
          onClick={openModal}
          className="md:absolute fixed bottom-14 right-5 md:bottom-0 md:right-2 rounded-full p-2 md:py-1 md:px-3 text-sm/6 font-semibold focus:outline-none bg-blue-300/80 md:bg-blue-300/30 hover:bg-blue-300/70 dark:bg-blue-500/80 dark:md:bg-blue-500/30 dark:hover:bg-blue-500/70 transition-colors duration-200 flex items-center justify-center gap-2 z-10"
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
