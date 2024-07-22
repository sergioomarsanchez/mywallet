import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import React from "react";
import { getUserOverview } from "@/lib/actions";
import UserOverview from "@/components/overview/userOverview";
import type { OverviewData } from "src/app/types/front";
import BalanceOverview from "@/components/overview/balanceOverwiew";
import CurrencyDropdown from "@/components/overview/currencyDropdown";

const ProfilePage = async () => {
  const session = await getServerSession(authOption);

  if (!session || !session.user) {
    return <div>Please log in to view your overview.</div>;
  }

  const overviewData: OverviewData[] = await getUserOverview(session.user.id);

  return (
    <main className="flex flex-col justify-center px-2 md:p-5 lg:ml-10">
      <header
        style={{
          background: "linear-gradient(90deg, #5936B4 0%, #362A84 100%)",
        }}
        className="rounded-lg md:mt-10 text-gray-300 py-2 lg:w-fit lg:px-5"
      >
        <section className="flex justify-between px-2 gap-2 lg:gap-5">
          <h1 className="text-lg font-bold lg:text-2xl lg:place-self-start lg:ml-0 lg:my-5 mb-4">
            Overview
          </h1>
          <CurrencyDropdown userId={session.user.id} />
        </section>

        <BalanceOverview userId={session.user.id} />
      </header>
      <div className="flex h-screen w-full justify-center md:pt-5 px-4">
        <div className="w-full">
          <h4 className="text-xs font-thin my-2  lg:my-5">Accounts</h4>
          {overviewData.length ? (
            <UserOverview overviewData={overviewData} />
          ) : (
            <div className="italic font-thin">No accounts created yet</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
