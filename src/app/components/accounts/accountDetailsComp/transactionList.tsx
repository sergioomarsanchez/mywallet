import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Currency } from "@prisma/client";
import React, { useState } from "react";
import { Transaction } from "src/app/types/back";

interface TransactionRowProps {
  transaction: Transaction;
  currency: Currency;
}

const TransactionRow = ({ transaction, currency }: TransactionRowProps) => {
  const [openDeleteWarningModal, setOpenDeleteWarningModal] =
    useState<boolean>(false);
  const [openEditTransactionModal, setOpenEditTransactionModal] =
    useState<boolean>(false);

    
  return (
    <tr key={transaction.id} className="w-full space-y-1">
      <td className="w-16">
        {transaction.logo ? (
          <img
            src={transaction.logo}
            alt={transaction.entityName}
            width={40}
            height={40}
            className="inline-block size-10 rounded-full"
          />
        ) : (
          <CurrencyDollarIcon className="inline-block size-5 rounded-full" />
        )}
      </td>
      <td className="flex flex-col justify-start lg:py-2 text-left">
        <span className="text-lg font-bold">{transaction.entityName}</span>
        <span className="text-xs font-thin lg:hidden">
          {transaction.date.getDate() +
            "/" +
            transaction.date.getMonth() +
            "/" +
            transaction.date.getFullYear()}
        </span>
      </td>
      <td className="text-left hidden lg:table-cell">
        <span className="">
          {transaction.date.getDate() +
            "/" +
            transaction.date.getMonth() +
            "/" +
            transaction.date.getFullYear()}
        </span>
      </td>
      <td className="text-center hidden lg:table-cell">
        <span className="">{transaction.method}</span>
      </td>
      <td className="text-center hidden lg:table-cell">
        <span className="">{transaction.category}</span>
      </td>
      <td className="text-right items-center">
        <span
          className={`text-right ${
            transaction.type === "Credit"
              ? "bg-green-500/20 p-1 rounded-lg"
              : ""
          }`}
        >
          <span className="text-xs font-thin mr-1">{currency} </span>
          {transaction.type === "Debit" ? "- " : "+ "} {transaction.amount}
        </span>
      </td>
    </tr>
  );
};

export default TransactionRow;
