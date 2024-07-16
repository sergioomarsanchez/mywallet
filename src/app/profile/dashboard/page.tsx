import { getServerSession } from "next-auth";
import { authOption } from "../../lib/auth";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React from "react";
import { redirect } from "next/navigation";
import { getUsers } from "../../lib/actions";
import type { User as UserType } from "../../types/back";
import UsersDashboard from "../../components/dashboard/usersDashboard";

const DashboardPage = async () => {
  const session = await getServerSession(authOption);
  const users: UserType[] = await getUsers();

  const role = session?.user?.role;
  if (role !== "Admin") {
    return (
      <main className="flex justify-center p-2 md:p-5 xl:p-24">
        <h1 className="text-lg lg:text-2xl place-self-start my-5">
          Ups, you are not authorized to see this page, please go back to{" "}
          <button
            onClick={() => redirect("/profile")}
            className="underline text-blue-600"
          >
            profile
          </button>
        </h1>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center p-2 md:p-5 lg:ml-10">
      <h1 className="text-lg lg:text-2xl place-self-center lg:place-self-start my-5">
        Admin Dashboard
      </h1>
      <div className="flex h-screen w-full justify-center pt-2 md:pt-5 px-4">
        <div className="w-full">
          <TabGroup>
            <TabList className="flex gap-4">
              <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-black dark:data-[selected]:bg-white/10 dark:data-[hover]:bg-white/5 dark:data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 dark:data-[focus]:outline-white">
                Users
              </Tab>
              <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-black dark:data-[selected]:bg-white/10 dark:data-[hover]:bg-white/5 dark:data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 dark:data-[focus]:outline-white">
                Tab 2
              </Tab>
              <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-black dark:data-[selected]:bg-white/10 dark:data-[hover]:bg-white/5 dark:data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 dark:data-[focus]:outline-white">
                Tab 3
              </Tab>
            </TabList>
            <TabPanels className="mt-3 w-full">
              <TabPanel className="rounded-xl bg-black/5 dark:bg-white/5 p-3 w-full h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center">
                <UsersDashboard users={users} />
              </TabPanel>
              <TabPanel className="rounded-xl bg-black/5 dark:bg-white/5 p-3 w-full h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center">
                Content 2
              </TabPanel>
              <TabPanel className="rounded-xl bg-black/5 dark:bg-white/5 p-3 w-full h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center">
                Content 3
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
