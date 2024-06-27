import { getServerSession } from "next-auth";
import { authOption } from "../../lib/auth";
import React from "react";

const ProfilePage = async () => {
  const session = await getServerSession(authOption);

  return (
    <main className="flex justify-center p-2 md:p-5 xl:p-24">
      <div className="flex">
        <h1>Hello, {session?.user?.name} Here is your dashboard!</h1>
      </div>
    </main>
  );
};

export default ProfilePage;
