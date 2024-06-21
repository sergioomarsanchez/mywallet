"use client"
import { signIn, ClientSafeProvider } from "next-auth/react";

type SignInProps = {
  providers: Record<string, ClientSafeProvider>;
};

export default function SignIn({ providers }: SignInProps) {
  return (
    <>
      {Object.keys(providers).length > 0 ? (
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(providers.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))
      ) : (
        <div>No providers available</div>
      )}
    </>
  );
}
  