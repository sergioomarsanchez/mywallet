'use server'

import { getProviders, ClientSafeProvider } from "next-auth/react";
import prisma from "./prisma";
import bcrypt from "bcryptjs";

export async function signUpUser(email: string, password: string, firstName: string, lastName: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    },
  });

  return user;
}

export async function getProvidersForServer() {
  const providers = await import("next-auth/react").then((mod) => mod.getProviders());
  return providers;
}
