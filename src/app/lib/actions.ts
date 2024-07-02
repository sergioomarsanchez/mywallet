"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";
import { AccountData } from "../types/front";

//---------- Users Actions ----------
//Get users
export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  } catch (error) {
    console.error("Failed to fetch users", error);
    return [];
  }
}

// Update User's Role
export async function updateUserRole(id: string, roleType: UserRole) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role: roleType },
    });

    if (updatedUser) {
      revalidatePath("/profile/dashboard");
    }
  } catch (error) {
    console.log(error);
  }
}

//Delete user with their accounts and transactions

export async function deleteUser(userId: string) {
  try {
    // Delete transactions
    await prisma.transaction.deleteMany({
      where: {
        account: {
          userId: userId,
        },
      },
    });
    // Delete accounts
    await prisma.account.deleteMany({
      where: {
        userId: userId,
      },
    });
    // Delete user
    const deleteUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    // Reload users list
    if (deleteUser) {
      revalidatePath("/profile/dashboard");
    }
  } catch (error) {
    console.error("Failed to delete user", error);
    throw new Error("Failed to delete user");
  }
}

// ------------ Auth Actions ------------

//Get providers for auth
export async function getProvidersForServer() {
  const providers = await import("next-auth/react").then((mod) =>
    mod.getProviders()
  );
  return providers;
}

//Sign up a new user
export async function signUpUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  try {
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
  } catch (error) {
    console.error("Failed to create user", error);
    return {};
  }
}

//----------- Account Actions --------

//Create account
export async function createAccount(data: AccountData & { userId: string }) {
  try {
    const newAccount = await prisma.account.create({
      data: {
        accountType: data.accountType,
        balance: data.balance,
        userId: data.userId,
        entityName: data.entityName,
        logo: data.logo,
        currency: data.currency,
      },
    });
    if (newAccount) {
      revalidatePath("/profile/accounts");
      return newAccount;
    }
  } catch (error) {
    console.error("Failed to create account", error);
    return {};
  }
}
//Fetch accounts
export async function fetchAccounts(userId: string) {
  try {
    const accounts = await prisma.account.findMany({
      where: {
        userId: userId,
      },
    });
    if (accounts) {
      return accounts;
    }
  } catch (error) {
    console.error("Failed to fetch accounts", error);
    return [];
  }
}

//Fetch entities data
export async function fetchEntitySuggestions(query: string) {
  try {
    const response = await fetch(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`
    );

    if (!response.ok) {
      throw new Error("Error fetching companies");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching companies", error);
    return [];
  }
}
