"use client";
import { useState, useEffect, SyntheticEvent } from "react";
import MonthPicker from "./monthPicker";
import CurrencySelector from "./currencySelector";
import CategoryChart from "./categoryChart";
import { getCategoryMovements } from "@/lib/actions";

type CategoryKeys =
  | "Salary"
  | "FreelanceContractWork"
  | "RentalIncome"
  | "Gifts"
  | "Investments"
  | "Housing"
  | "Transportation"
  | "Food"
  | "Entertainment"
  | "Utilities"
  | "Insurance"
  | "Healthcare"
  | "DebtRepayment"
  | "Savings"
  | "Taxes"
  | "Other";

type CategoryData = {
  category: CategoryKeys;
  amount: number;
};

interface CategoriesContainerProps {
  userId: string;
  initialIncomeData: CategoryData[];
  initialSpendingData: CategoryData[];
  initialMonth: Date;
  initialCurrency: string;
}

export default function CategoriesContainer({
  userId,
  initialIncomeData,
  initialSpendingData,
  initialMonth,
  initialCurrency,
}: CategoriesContainerProps) {
  const [selectedMonth, setSelectedMonth] = useState<Date>(initialMonth);
  const [selectedCurrency, setSelectedCurrency] =
    useState<string>(initialCurrency);
  const [incomeData, setIncomeData] =
    useState<CategoryData[]>(initialIncomeData);
  const [spendingData, setSpendingData] =
    useState<CategoryData[]>(initialSpendingData);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategoryMovements(
        userId,
        selectedMonth,
        selectedCurrency
      );
      setIncomeData(
        Object.entries(data.income).map(([category, amount]) => ({
          category: category as CategoryKeys,
          amount,
        }))
      );
      setSpendingData(
        Object.entries(data.spending).map(([category, amount]) => ({
          category: category as CategoryKeys,
          amount,
        }))
      );
    };

    fetchData();
  }, [selectedMonth, selectedCurrency]);

  const handleMonthChange = (date: Date | null, event?: SyntheticEvent) => {
    if (date) {
      setSelectedMonth(date);
    }
  };

  return (
    <main className="flex flex-col p-5">
      <h1 className="text-2xl font-bold mb-5">Categories</h1>
      <div className="flex flex-col md:flex-row justify-between mb-5">
        <MonthPicker
          selectedMonth={selectedMonth}
          onChange={handleMonthChange}
        />
        <CurrencySelector
          selectedCurrency={selectedCurrency}
          onChange={setSelectedCurrency}
        />
      </div>
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <section className="w-full xl:w-1/2 p-2">
          <h2 className="text-xl font-bold mb-3">Income</h2>
          <CategoryChart
            data={incomeData}
            title="Income"
            color="rgba(75, 192, 192, 0.4)"
          />
        </section>
        <section className="w-full xl:w-1/2 p-2">
          <h2 className="text-xl font-bold mb-3">Spending</h2>
          <CategoryChart
            data={spendingData}
            title="Spending"
            color="rgba(255, 99, 132, 0.4)"
          />
        </section>
      </div>
    </main>
  );
}
