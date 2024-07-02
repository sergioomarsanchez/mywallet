"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React, { useState } from "react";
import AddAccount from "./addAccount";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Account } from "src/app/types/back";
import AccountCard from "./accountCard";

const CurrencyTabs = ({
  userId,
  accounts,
}: {
  userId: string;
  accounts: Account[] | [];
}) => {
  const [openAddAccountModal, setOpenAddAccountModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0 for All, 1 for ARS, etc.

  const openModal = () => setOpenAddAccountModal(true);
  const closeModal = () => setOpenAddAccountModal(false);

  const handleAccountAdded = (currency: string) => {
    const tabIndex =
      {
        All: 0,
        ARS: 1,
        USD: 2,
        EUR: 3,
        NZD: 4,
      }[currency] || 0;

    setActiveTab(tabIndex);
    closeModal();
  };

  const filterAccountsByCurrency = (currency: string) =>
    accounts?.filter(
      (account) => currency === "All" || account.currency === currency
    );

  const renderAccounts = (filteredAccounts: Account[], currency: string) =>
    filteredAccounts.length ? (
      filteredAccounts.map((account: Account) => (
        <AccountCard key={account.id} account={account} />
      ))
    ) : (
      <div className="flex italic px-10 py-5 font-thin justify-center items-center col-span-3 gap-2">
        <span>
          No {currency !== "All" && currency} accounts added yet, you can add
          one by clicking the
        </span>
        <span className="md:hidden font-bold text-lg">+</span>
        <span className="hidden md:flex font-bold">+Add account button</span>
      </div>
    );

  const tabs = ["All", "ARS", "USD", "EUR", "NZD"];

  return (
    <>
      <TabGroup
        selectedIndex={activeTab}
        onChange={setActiveTab}
        className="w-full"
      >
        <TabList className="md:relative flex gap-0.5 dm:gap-4 w-full">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className="rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-black dark:data-[selected]:bg-white/10 dark:data-[hover]:bg-white/5 dark:data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 dark:data-[focus]:outline-white"
            >
              {tab}
            </Tab>
          ))}
          <button
            onClick={openModal}
            className="md:absolute fixed bottom-14 right-5 md:bottom-0 md:right-2 rounded-full p-2 md:py-1 md:px-3 text-sm/6 font-semibold focus:outline-none bg-blue-300/80 md:bg-blue-300/30 hover:bg-blue-300/70 dark:bg-blue-500/80 dark:md:bg-blue-500/30 dark:hover:bg-blue-500/70 transition-colors duration-200 flex items-center justify-center gap-2 z-10"
          >
            <PlusIcon className="size-8 md:size-4" />
            <span className="hidden md:flex mr-3">Add account</span>
          </button>
          <AddAccount
            openAddAccountModal={openAddAccountModal}
            setOpenAddAccountModal={setOpenAddAccountModal}
            userId={userId}
            handleAccountAdded={handleAccountAdded}
          />
        </TabList>
        <TabPanels className="mt-3 w-full h-full">
          {tabs.map((tab) => (
            <TabPanel
              key={tab}
              className="rounded-xl bg-black/5 dark:bg-white/5 p-3 w-full h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center"
            >
              {renderAccounts(filterAccountsByCurrency(tab), tab)}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </>
  );
};

export default CurrencyTabs;
