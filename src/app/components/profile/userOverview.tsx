import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import type { OverviewData } from "src/app/types/front";

interface UserOverviewProps {
  overviewData: OverviewData[];
}

const UserOverview: React.FC<UserOverviewProps> = ({ overviewData }) => {
  const formatBalance = (balance: number) => {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const formattedBalance = formatter.format(balance);
    const [integerPart, decimalPart] = formattedBalance.split(".");

    return { integerPart, decimalPart };
  };

  const calculatePercentageChange = (current: number, previous: number) => {
    if (current === 0 && previous === 0) {
      return 0; // Indicating no change
    }
    if (previous === 0) {
      return current > 0 ? 100 : -100;
    }
    return ((current - previous) / previous) * 100;
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage > 0) return "text-green-500";
    if (percentage < 0) return "text-red-500";
    return "text-inherit";
  };

  const getArrowIcon = (percentage: number) => {
    if (percentage > 0) return ArrowTrendingUpIcon;
    if (percentage < 0) return ArrowTrendingDownIcon;
    return MinusIcon; // Indicating no change
  };

  const getComparisonText = (percentage: number) => {
    if (percentage > 0) return "more than last month";
    if (percentage < 0) return "less than last month";
    return "same as last month";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {overviewData.map((data, index) => (
        <div
          key={index}
          className="card p-4 text-gray-700 dark:text-gray-300 w-[90%] md:w-[clamp(260px,80%,300px)] bg-gradient-to-tl from-gray-400 to-gray-300 border-gray-300 dark:from-gray-900 dark:to-gray-950 border-r-2 border-t-2 dark:border-gray-900 m-4 rounded-lg"
        >
          <div className="flex justify-center items-center gap-2 h-fit">
            {data.accountLogo ? (
              <img
                src={data.accountLogo}
                alt={data.accountName}
                className="w-8 h-8 rounded-full shadow-md shadow-slate-600 dark:shadow-slate-500"
              />
            ) : (
              <CurrencyDollarIcon className="w-8 h-8 rounded-full shadow-md shadow-slate-600 dark:shadow-slate-500" />
            )}
            <h2 className="text-lg">{data.accountName}</h2>
          </div>
          <div className="card-body">
            <section className="flex justify-start items-baseline my-2">
              <span className="font-thin text-sm mr-2">{data.currency}</span>
              <span className="uppercase font-bold text-xl">
                {formatBalance(data.balance).integerPart}
              </span>
              .
              <span className="text-gray-700 dark:text-gray-300 uppercase tracking-widest">
                {formatBalance(data.balance).decimalPart}
              </span>
            </section>
            <h3 className="mt-4 text-lg">This Month Movements</h3>
            <div className="flex gap-2 flex-col">
              <section>
                Credits: {formatBalance(data.currentMonthIncome).integerPart}.
                <span className="text-gray-700 dark:text-gray-300 uppercase tracking-widest text-xs font-thin">
                  {formatBalance(data.currentMonthIncome).decimalPart}
                </span>
                <p>
                  <span
                    className={getPercentageColor(
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
                      {
                        className: "w-4 h-4 ml-1 inline",
                      }
                    )}
                  </span>{" "}
                  {getComparisonText(
                    calculatePercentageChange(
                      data.currentMonthIncome,
                      data.lastMonthIncome
                    )
                  )}
                </p>
              </section>
              <section>
                Debits: {formatBalance(data.currentMonthExpense).integerPart}.
                <span className="text-gray-700 dark:text-gray-300 uppercase tracking-widest text-xs font-thin">
                  {formatBalance(data.currentMonthExpense).decimalPart}
                </span>
                <p>
                  <span
                    className={getPercentageColor(
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
                      {
                        className: "w-4 h-4 ml-1 inline",
                      }
                    )}
                  </span>{" "}
                  {getComparisonText(
                    calculatePercentageChange(
                      data.currentMonthExpense,
                      data.lastMonthExpense
                    )
                  )}
                </p>
              </section>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOverview;
