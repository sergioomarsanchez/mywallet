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
    return "text-inherit";
  };

  const getSpendingPercentageColor = (percentage: number) => {
    if (percentage > 0) return "ml-2 text-red-500";
    if (percentage < 0) return "ml-2 text-green-500";
    return "text-inherit";
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
    <div className="p-4 text-gray-700 dark:text-gray-300 w-[90%] md:w-[clamp(260px,80%,300px)] bg-gradient-to-tl from-gray-400 to-gray-300 border-gray-300 dark:from-gray-900 dark:to-gray-950 border-r-2 border-t-2 dark:border-gray-900 rounded-lg">
      <Link href={`/profile/accounts/${data.accountId}`}>
        <div className="flex justify-start items-center gap-2 h-fit">
          {data.accountLogo ? (
            <img
              src={data.accountLogo}
              alt={data.accountName}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <CurrencyDollarIcon className="w-8 h-8 rounded-full" />
          )}
          <h2 className="font-bold">{data.accountName}</h2>
          <section className="flex justify-start items-baseline my-2 scale-[70%]">
            <span className="font-thin text-sm mr-2">{data.currency}</span>
            <span className="font-bold text-lg">{balanceInt}</span>.
            <span className="text-gray-700 dark:text-gray-300 tracking-widest">
              {balanceDec}
            </span>
          </section>
        </div>
      </Link>
      <div className="card-body">
        {noMovements ? (
          <div className="text-center text-gray-500 my-7">
            No movements this month
          </div>
        ) : (
          <div className="flex flex-col text-xs">
            <h3 className="text-sm font-thin my-2">This month movements</h3>
            <div className="mb-2 flex gap-2">
              Income:
              <section className="flex items-baseline">
                <span>{incomeInt}.</span>
                <span className="text-gray-700 dark:text-gray-300 tracking-widest text-xs font-thin">
                  {incomeDec}
                </span>
                {data.currency}
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
                <span>{expenseInt}.</span>
                <span className="text-gray-700 dark:text-gray-300 tracking-widest text-xs font-thin">
                  {expenseDec}
                </span>
                {data.currency}
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
    </div>
  );
};

export default AccOverviewCard;
