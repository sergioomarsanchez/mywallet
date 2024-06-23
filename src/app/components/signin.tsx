"use client";

import { signIn, ClientSafeProvider } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type SignInProps = {
  providers: Record<string, ClientSafeProvider>;
};

export default function SignIn({ providers }: SignInProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/welcome");
      }
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <div>
        {Object.keys(providers).length > 0 ? (
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          ))
        ) : (
          <div>No providers available</div>
        )}
      </div>
    </div>
  );
}
