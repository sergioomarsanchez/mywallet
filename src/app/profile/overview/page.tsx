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
    <main className="flex min-h-[80vh] flex-col justify-start px-2 md:p-5 lg:ml-10">
      <header
        style={{
          background: "linear-gradient(90deg, #5936B4 0%, #362A84 100%)",
        }}
        className="rounded-lg mt-5 place-self-center lg:place-self-start text-gray-300 py-2 w-[90%] lg:w-fit px-3 lg:px-5"
      >
        <section className="flex justify-between px-2 gap-2 lg:gap-5">
          <h1 className="text-lg font-bold lg:text-2xl lg:place-self-start lg:ml-0 lg:my-5 mb-4">
            Overview
          </h1>
          <CurrencyDropdown userId={session.user.id} />
        </section>
        <div className="h-[2px] w-full place-self-center bg-gradient-to-r from-transparent via-white/60 to-transparent mb-2 md:mb-5"></div>
        <BalanceOverview userId={session.user.id} />
      </header>
      <div className="flex w-full justify-center md:pt-5">
        <div className="w-full pb-12 lg:pb-4">
          <h4 className="text-xs font-thin my-2 pl-6 lg:my-5">Accounts</h4>
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
