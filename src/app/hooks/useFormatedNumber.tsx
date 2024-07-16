import { useMemo } from 'react';

const useFormattedNumber = (balance: number) => {
  const formattedBalance = useMemo(() => {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const formatted = formatter.format(balance);
    const [integerPart, decimalPart] = formatted.split('.');

    return { integerPart, decimalPart };
  }, [balance]);

  return formattedBalance;
};

export default useFormattedNumber;
