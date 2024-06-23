"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session, "session");

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin");
    }
  }, [session, router]);

  if (!session) {
    return <div>Loading...</div>; // or any loading state
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}!</h1>
      <button onClick={() => signOut({ callbackUrl: "/auth/signin" })}>
        Sign Out
      </button>
    </div>
  );
};

export default HomePage;
