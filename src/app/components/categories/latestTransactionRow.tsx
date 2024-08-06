import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Currency } from "@prisma/client";
import React from "react";
import { Transaction } from "src/app/types/back";
import useFormattedNumber from "src/app/hooks/useFormatedNumber";
import { format, addDays } from "date-fns";
import { LatestTransaction } from "@/lib/actions";

export interface LatestTransactionRowProps {
  transaction: LatestTransaction;
}

const LatestTransactionRow = ({ transaction }: LatestTransactionRowProps) => {
  const formattedDate = format(
    addDays(new Date(transaction.date), 1),
    "dd/MM/yyyy"
  );
  const { integerPart, decimalPart } = useFormattedNumber(transaction.amount);

  return (
    <div className="flex flex-col pt-2">
      <div className="flex items-center">
        <div className="flex items-center space-x-2 scale-75">
          <span className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-l-lg px-2 py-1 text-sm font-bold -mr-3.5">
            {transaction.account.currency}
          </span>
          {transaction.account.logo ? (
            <img
              src={transaction.account.logo}
              alt={transaction.account.entityName}
              className="w-10 h-10 rounded-full z-10"
            />
          ) : (
            <CurrencyDollarIcon className="w-8 h-8" />
          )}
          <span className="bg-gradient-to-r from-purple-800 to-purple-900 text-white rounded-r-lg px-2 py-1 text-sm font-bold -translate-x-3.5">
            {transaction.account.entityName}
          </span>
        </div>
      </div>
      <div className="flex pb-2 pl-5 items-center pr-5 md:mr-0 md:w-[95%] lg:w-[85%] xl:w-[80%] justify-between">
        <div className="flex items-center space-x-4">
          {transaction.logo ? (
            <img
              src={transaction.logo}
              alt={transaction.entityName}
              className="size-8 rounded-full"
            />
          ) : (
            <CurrencyDollarIcon className="w-8 h-8" />
          )}
          <div className="flex-1">
            <div className="flex flex-col items-start space-x-2">
              {transaction.entityName}
            </div>
            <div className="text-sm">{formattedDate}</div>
          </div>
        </div>
        <div className="mt-2 text-sm xl:text-lg font-bold">
          {transaction.type === "Debit" ? "- " : "+ "}
          {integerPart}.
          <span className="text-xs font-light mr-2">{decimalPart}</span>
          {transaction.account.currency}
        </div>
      </div>
    </div>
  );
};

export default LatestTransactionRow;
