import React from "react";
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import useFormatedNumber from "src/app/hooks/useFormatedNumber";
import type { OverviewData } from "src/app/types/front";

interface AccOverviewCardProps {
  data: OverviewData;
}

const AccOverviewCard: React.FC<AccOverviewCardProps> = ({ data }) => {
  const { integerPart: balanceInt, decimalPart: balanceDec } =
    useFormatedNumber(data.balance);
  const { integerPart: incomeInt, decimalPart: incomeDec } = useFormatedNumber(
    data.currentMonthIncome
  );
  const { integerPart: expenseInt, decimalPart: expenseDec } =
    useFormatedNumber(data.currentMonthExpense);

  const calculatePercentageChange = (current: number, previous: number) => {
    if (current === 0 && previous === 0) {
      return 0; // Indicating no change
    }
    if (previous === 0) {
      return current > 0 ? 100 : -100;
    }
    return ((current - previous) / previous) * 100;
  };

  const getIncomePercentageColor = (percentage: number) => {
    if (percentage > 0) return "ml-2 text-green-500";
    if (percentage < 0) return "ml-2 text-red-500";
    return "ml-2 text-inherit";
  };

  const getSpendingPercentageColor = (percentage: number) => {
    if (percentage > 0) return "ml-2 text-red-500";
    if (percentage < 0) return "ml-2 text-green-500";
    return "ml-2 text-inherit";
  };

  const getArrowIcon = (percentage: number) => {
    if (percentage > 0) return ArrowTrendingUpIcon;
    if (percentage < 0) return ArrowTrendingDownIcon;
    return MinusIcon; // Indicating no change
  };

  const noMovements =
    data.currentMonthIncome === 0 &&
    data.lastMonthIncome === 0 &&
    data.currentMonthExpense === 0 &&
    data.lastMonthExpense === 0;

  return (
    <div className="relative p-4 py-8 pl-2 text-gray-700 dark:text-gray-300/70 w-[90%] md:w-[clamp(260px,80%,300px)] overflow-hidden bg-gradient-to-tl from-gray-300/70 to-gray-50/70 dark:from-gray-800/70 dark:to-gray-600/70 dark:border-gray-500/70 rounded-lg">
      <Link href={`/profile/accounts/${data.accountId}`}>
        <div className="flex flex-col justify-start items-center gap-2 h-fit">
          {data.accountLogo ? (
            <img
              src={data.accountLogo}
              alt={data.accountName}
              className="absolute -top-2 -left-2 size-14 rounded-full shadow-md dark:shadow-lg shadow-gray-900 "
            />
          ) : (
            <CurrencyDollarIcon className="w-8 h-8 rounded-full" />
          )}
          <h2 className="font-bold text-gray-800 dark:text-gray-200 text-lg">
            {data.accountName}
          </h2>
          <section className="flex justify-start items-baseline my-2">
            <span className="font-thin text-sm mr-2">{data.currency}</span>
            <span className="font-bold text-lg text-gray-800 dark:text-gray-200">
              {balanceInt}
            </span>
            .
            <span className="text-gray-700 dark:text-gray-300 tracking-widest text-sm">
              {balanceDec}
            </span>
          </section>
        </div>
      </Link>
      <div className="card-body">
        {noMovements ? (
          <div className="text-center text-xs text-gray-500 my-7">
            No movements this month
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center text-xs">
            <h3 className="text-sm font-thin my-2">This month movements</h3>
            <div className="mb-2 flex gap-2">
              Income:
              <section className="flex items-baseline">
                <span className="text-gray-800 dark:text-gray-200">
                  {incomeInt}.
                </span>
                <span className="text-gray-700 dark:text-gray-300 tracking-widest text-[10px] font-thin">
                  {incomeDec}
                </span>

                <span
                  className={getIncomePercentageColor(
                    calculatePercentageChange(
                      data.currentMonthIncome,
                      data.lastMonthIncome
                    )
                  )}
                >
                  {calculatePercentageChange(
                    data.currentMonthIncome,
                    data.lastMonthIncome
                  ).toFixed(2)}
                  %
                  {React.createElement(
                    getArrowIcon(
                      calculatePercentageChange(
                        data.currentMonthIncome,
                        data.lastMonthIncome
                      )
                    ),
                    { className: "w-4 h-4 ml-1 inline" }
                  )}
                </span>
              </section>
            </div>
            <div className="flex gap-2">
              Spending:
              <section className="flex items-baseline">
                <span className="text-gray-800 dark:text-gray-200">
                  {expenseInt}.
                </span>
                <span className="text-gray-700 dark:text-gray-300 tracking-widest text-[10px] font-thin">
                  {expenseDec}
                </span>

                <span
                  className={getSpendingPercentageColor(
                    calculatePercentageChange(
                      data.currentMonthExpense,
                      data.lastMonthExpense
                    )
                  )}
                >
                  {calculatePercentageChange(
                    data.currentMonthExpense,
                    data.lastMonthExpense
                  ).toFixed(2)}
                  %
                  {React.createElement(
                    getArrowIcon(
                      calculatePercentageChange(
                        data.currentMonthExpense,
                        data.lastMonthExpense
                      )
                    ),
                    { className: "w-4 h-4 ml-1 inline" }
                  )}
                </span>
              </section>
            </div>
          </div>
        )}
      </div>
      <div className="size-24 bg-gray-400/40 dark:bg-gray-500/40 shadow-md shadow-gray-900 absolute rotate-45 -bottom-[4.5rem] -right-8" />
    </div>
  );
};

export default AccOverviewCard;
