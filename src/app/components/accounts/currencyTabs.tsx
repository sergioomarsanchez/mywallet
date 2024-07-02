"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React, { useState } from "react";
import AddAccount from "./addAccount";

const CurrencyTabs = ({ userId }: { userId: string }) => {
  const [openAddAccountModal, setOpenAddAccountModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0 for ARS, 1 for USD, etc.

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
  return (
    <>
      <TabGroup
        selectedIndex={activeTab}
        onChange={setActiveTab}
        className="w-full"
      >
        <TabList className="relative flex gap-0.5 dm:gap-4 w-full">
          <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
            All
          </Tab>
          <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
            ARS
          </Tab>
          <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
            USD
          </Tab>
          <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
            EUR
          </Tab>
          <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
            NZD
          </Tab>
          <Tab className="absolute right-2 rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
            Add account
          </Tab>
          <button
            onClick={openModal}
            className="absolute right-2 rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none bg-blue-500"
          >
            Add account
          </button>
          <AddAccount
            openAddAccountModal={openAddAccountModal}
            setOpenAddAccountModal={setOpenAddAccountModal}
            userId={userId}
            handleAccountAdded={handleAccountAdded}
          />
        </TabList>
        <TabPanels className="mt-3 w-full h-full">
          <TabPanel className="rounded-xl bg-white/5 p-3 w-full h-full">
            All accounts
          </TabPanel>
          <TabPanel className="rounded-xl bg-white/5 p-3 w-full h-full">
            Accounts in pesos
          </TabPanel>
          <TabPanel className="rounded-xl bg-white/5 p-3 w-full h-full">
            Accounts in us dolars
          </TabPanel>
          <TabPanel className="rounded-xl bg-white/5 p-3 w-full h-full">
            Accounts un euro
          </TabPanel>
          <TabPanel className="rounded-xl bg-white/5 p-3 w-full h-full">
            Accounts in nz dolars
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
};

export default CurrencyTabs;
