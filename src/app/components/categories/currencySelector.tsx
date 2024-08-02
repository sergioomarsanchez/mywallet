import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import React from "react";

interface CurrencySelectorProps {
  selectedCurrency: string;
  onChange: (currency: string) => void;
}

const currencies = ["USD", "ARS", "EUR", "NZD"];

export default function CurrencySelector({
  selectedCurrency,
  onChange,
}: CurrencySelectorProps) {
  return (
    <div className="mb-5 min-w-fit">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Select Currency
      </label>
      <Menu>
        <MenuButton className="inline-flex w-48 bg-white justify-between items-center rounded-md border border-gray-300 dark:border-gray-500 dark:bg-gray-700 py-2 px-3 text-sm font-medium shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          {selectedCurrency}
          <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
        </MenuButton>
        <MenuItems className="absolute mt-1 w-48 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {currencies.map((currency) => (
            <MenuItem key={currency}>
              {({ active }) => (
                <button
                  onClick={() => onChange(currency)}
                  className={`${
                    active
                      ? "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      : "text-gray-700 dark:text-gray-300"
                  } group flex w-full items-center rounded-md px-3 py-2 text-sm`}
                >
                  {currency}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
