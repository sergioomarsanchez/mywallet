import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Currency } from "@prisma/client";
import React, { useState, useEffect } from "react";
import { Transaction } from "src/app/types/back";
import TransActionDropdown from "./transactionRow/transActionsDropdown";
import DeleteTransactionWarningModal from "./transactionRow/deleteTransWarningModal";
import EditTransaction from "./transactionRow/editTransaction";
import useFormattedNumber from "src/app/hooks/useFormatedNumber";
import { format, addDays } from "date-fns"; 

interface TransactionRowProps {
  transaction: Transaction;
  currency: Currency;
}

const TransactionRow = ({ transaction, currency }: TransactionRowProps) => {
  const [openDeleteWarningModal, setOpenDeleteWarningModal] =
    useState<boolean>(false);
  const [openEditTransactionModal, setOpenEditTransactionModal] =
    useState<boolean>(false);

  useEffect(() => {
    if (transaction.id === undefined) {
      setOpenDeleteWarningModal(false);
      setOpenEditTransactionModal(false);
    }
  }, [transaction]);

  const handleOpenDeleteModal = () => {
    setOpenDeleteWarningModal(true);
  };

  const handleOpenEditModal = () => {
    setOpenEditTransactionModal(true);
  };

  const formattedDate = format(addDays(new Date(transaction.date), 1), "dd/MM/yyyy"); 

  const { integerPart, decimalPart } = useFormattedNumber(transaction.amount);

  return (
    <>
      <tr key={transaction.id} className="w-full space-y-1">
        <td className="w-10 lg:w-16">
          {transaction.logo ? (
            <img
              src={transaction.logo}
              alt={transaction.entityName}
              width={40}
              height={40}
              className="inline-block size-8 lg:size-10 rounded-full"
            />
          ) : (
            <CurrencyDollarIcon className="inline-block size-5 rounded-full" />
          )}
        </td>
        <td className="flex flex-col justify-start lg:py-2 text-left">
          <span className="text-base lg:text-lg font-bold">
            {transaction.entityName}
          </span>
          <span className="text-[10px] lg:text-xs font-thin lg:hidden">
            {formattedDate}
          </span>
        </td>
        <td className="text-left hidden lg:table-cell">
          <span className="">{formattedDate}</span>
        </td>
        <td className="text-center hidden lg:table-cell">
          <span className="">{transaction.method}</span>
        </td>
        <td className="text-center hidden lg:table-cell">
          <span className="">{transaction.category}</span>
        </td>
        <td className="text-right whitespace-nowrap">
          <span
            className={`text-right text-sm lg:text-base ${
              transaction.type === "Credit"
                ? "bg-green-500/20 p-1 rounded-lg"
                : ""
            }`}
          >
            <span className="text-[10px] lg:text-xs font-thin mr-1">
              {currency}{" "}
            </span>
            {transaction.type === "Debit" ? "- " : "+ "} {integerPart}.
            {decimalPart}
          </span>
        </td>
        <td className="min-w-fit text-right">
          <TransActionDropdown
            setOpenDeleteWarningModal={handleOpenDeleteModal}
            setOpenEditTransactionModal={handleOpenEditModal}
          />
          {openDeleteWarningModal && (
            <DeleteTransactionWarningModal
              openWarningModal={openDeleteWarningModal}
              setOpenWarningModal={setOpenDeleteWarningModal}
              transactionId={transaction.id}
              accountId={transaction.accountId}
              amount={transaction.amount}
              type={transaction.type}
            />
          )}
          {openEditTransactionModal && (
            <EditTransaction
              openEditTransactionModal={openEditTransactionModal}
              setOpenEditTransactionModal={setOpenEditTransactionModal}
              transaction={transaction}
              accountId={transaction.accountId}
            />
          )}
        </td>
      </tr>
    </>
  );
};

export default TransactionRow;
