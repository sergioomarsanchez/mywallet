"use client"
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

function Home() {

    const { data: session } = useSession();
    // const router = useRouter();
  
    // useEffect(() => {
    //   if (!session) {
    //     router.push("/");
    //   }
    // }, [session, router]);

  return (
    <div>
      <span>Home</span>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
    </div>
  );
}

export default Home;
