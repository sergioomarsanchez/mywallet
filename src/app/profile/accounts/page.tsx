import { getServerSession } from "next-auth";
import { authOption } from "../../lib/auth";
import React from "react";

const ProfilePage = async () => {
  const session = await getServerSession(authOption);

  return (
    <main className="flex flex-col justify-center p-2 md:p-5 lg:ml-10">
      <div className="flex">
        <h1>Hello, {session?.user?.name} here you can see your accounts!</h1>
      </div>
    </main>
  );
};

export default ProfilePage;
