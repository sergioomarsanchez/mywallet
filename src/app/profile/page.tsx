import { getServerSession } from "next-auth";
import { authOption } from "../lib/auth";
import prisma from "../lib/prisma";
import ProfileDetails from "@/components/profileDetails";

export default async function ProfilePage() {
  const session = await getServerSession(authOption);
  const isProviderUser: boolean = session?.user?.provider !== "credentials";

  if (!session) {
    return (
      <main className="flex flex-col justify-center p-2 md:p-5 lg:ml-10">
        <h1 className="text-lg font-bold lg:text-2xl place-self-center lg:place-self-start my-5">
          You need to log in to see this page.
        </h1>
      </main>
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { accounts: true, transactions: true },
  });

  return (
    <main className="flex flex-col justify-center p-2 md:p-5 lg:ml-10">
      <h1 className="text-lg font-bold lg:text-2xl place-self-center lg:place-self-start mt-5">
        Welcome back{" "}
        <span className="italic text-pretty ">{session.user.name}</span>!
      </h1>
      <ProfileDetails
        isProvider={isProviderUser}
        userImg={session.user.image}
        userName={session.user.name}
        userEmail={session.user.email}
        userId={session.user.id}
      />
    </main>
  );
}
