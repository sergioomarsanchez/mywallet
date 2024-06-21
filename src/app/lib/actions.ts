'use server'

import { getProviders, ClientSafeProvider } from "next-auth/react";

export async function getProvidersForServer(): Promise<Record<string, ClientSafeProvider>> {
  const providers = await getProviders();
  return providers || {};
}
