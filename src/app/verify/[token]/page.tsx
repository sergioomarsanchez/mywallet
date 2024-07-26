"use client";
import { useParams } from "next/navigation";
import VerifyEmail from "@/components/verifyEmail";

export default function VerifyPage() {
  const params = useParams();
  const token = params.token as string;

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">Email Verification</h1>
      <VerifyEmail token={token} />
    </div>
  );
}
