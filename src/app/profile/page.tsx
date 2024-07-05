import { getServerSession } from "next-auth";
import { authOption } from "../lib/auth";
import React from "react";
import { getUserOverview } from "@/lib/actions";
import UserOverview from "@/components/profile/userOverview";
import type { OverviewData } from "../types/front";
import BalanceOverview from "@/components/profile/balanceOverwiew";

const ProfilePage = async () => {
  const session = await getServerSession(authOption);

  if (!session || !session.user) {
    return <div>Please log in to view your profile.</div>;
  }

  const overviewData: OverviewData[] = await getUserOverview(session.user.id);

  return (
    <main className="flex flex-col justify-center p-2 md:p-5 lg:ml-10">
      <h1 className="text-lg font-bold lg:text-2xl place-self-center lg:place-self-start my-5">
        Hello, <span className="italic text-pretty ">{session.user.name}</span>, welcome back to your profile!
      </h1>
      <h2 className="text-base lg:text-2xl place-self-center lg:place-self-start my-5">
        Here is an overview to your balance and accounts
      </h2>
      <div className="flex h-screen w-full justify-center pt-2 md:pt-5 px-4">
        <div className="w-full">
          <BalanceOverview userId={session.user.id} />
          <UserOverview overviewData={overviewData} />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
