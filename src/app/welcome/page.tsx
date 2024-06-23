"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const WelcomePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin");
    }
  }, [session, router]);

  return (
    <div>
      <h1>Welcome, {session?.user?.name}!</h1>
      <button onClick={() => signOut({ callbackUrl: "/auth/signin" })}>
        Sign Out
      </button>
    </div>
  );
};

export default WelcomePage;
