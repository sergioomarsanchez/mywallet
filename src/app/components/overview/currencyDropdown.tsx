"use client";
import { useState, useEffect } from "react";
import { Currency } from "@prisma/client";
import { getExchangeRates, getTotalBalanceByCurrency } from "@/lib/actions";
import useFormattedNumber from "src/app/hooks/useFormatedNumber";

const CurrencyDropdown = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {}
  );
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("USD");
  const [balanceByCurrency, setBalanceByCurrency] = useState<
    Record<
      string,
      { balance: number; accountsCount: number; transactions: any[] }
    >
  >({});
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true); // Inicia la carga
      const { balanceByCurrency } = await getTotalBalanceByCurrency(userId);
      setBalanceByCurrency(balanceByCurrency);

      const rates = await getExchangeRates();
      setExchangeRates(rates);

      setCurrencies(Object.keys(balanceByCurrency));
      setIsLoading(false); // Finaliza la carga
    }

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (isLoading) return; // Evitar el cálculo si los datos están cargando

    let total = 0;
    for (const currency in balanceByCurrency) {
      const balance = balanceByCurrency[currency].balance;
      const rate = exchangeRates[currency];
      total += balance / rate;
    }
    setTotalBalance(total * exchangeRates[selectedCurrency]);
  }, [selectedCurrency, balanceByCurrency, exchangeRates, isLoading]);

  const { integerPart, decimalPart } = useFormattedNumber(totalBalance);

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurrency(event.target.value as Currency);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center lg:my-5 mb-4">
        <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[200px]"></div>
      </div>
    );
  }

  if (currencies.length === 1) {
    return null; // No mostrar el componente si hay solo una moneda
  }

  return (
    <div className="flex items-center justify-center lg:my-5 mb-4">
      <span className="text-xs font-thin lg:mr-2">In {selectedCurrency}:</span>
      <div className="flex scale-75 md:scale-100 justify-start items-baseline">
        <span className="uppercase font-bold text-xl">{integerPart}</span>.
        <span className="uppercase tracking-widest">{decimalPart}</span>
      </div>
      <select
        className="bg-transparent text-inherit"
        value={selectedCurrency}
        onChange={handleCurrencyChange}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyDropdown;
