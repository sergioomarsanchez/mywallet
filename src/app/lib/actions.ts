"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import bcrypt from "bcryptjs";
import { Type, UserRole } from "@prisma/client";
import { AccountData, TransactionData } from "../types/front";
import { Account, Transaction } from "../types/back";

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

//Edit account
export async function updateAccount(data: AccountData & { id: string }) {
  try {
    const updatedAccount = await prisma.account.update({
      where: {
        id: data.id,
      },
      data: {
        accountType: data.accountType,
        balance: data.balance,
        entityName: data.entityName,
        logo: data.logo,
        currency: data.currency,
      },
    });
    if (updatedAccount) {
      revalidatePath("/profile/accounts");
      return updatedAccount;
    }
  } catch (error) {
    console.error("Failed to update account", error);
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
      orderBy: {
        createdAt: "desc",
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

//Delete Account
export async function deleteAccount(accountId: string) {
  try {
    // Delete transactions
    await prisma.transaction.deleteMany({
      where: {
        account: {
          id: accountId,
        },
      },
    });
    // Delete account
    const deleteAccount = await prisma.account.delete({
      where: {
        id: accountId,
      },
    });
    // Reload account list
    if (deleteAccount) {
      revalidatePath("/profile/accounts");
    }
  } catch (error) {
    console.error("Failed to delete account", error);
    throw new Error("Failed to delete account");
  }
}

//Fetch account to show in Account detail page
export async function fetchAccountById(
  accountId: string
): Promise<Account | null> {
  try {
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });
    return account;
  } catch (error) {
    console.error("Failed to fetch account", error);
    return null;
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

//---------- Transactions actions ---------

export async function fetchTransactionsByAccountId(
  accountId: string
): Promise<Transaction[] | null> {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { accountId },
      orderBy: {
        date: "desc",
      },
    });
    return transactions;
  } catch (error) {
    console.error("Failed to fetch account", error);
    return [];
  }
}

//Add transaction
export async function addTransaction(
  data: TransactionData,
  userId: string,
  accountId: string
) {
  try {
    // Comienza una transacción en la base de datos
    const result = await prisma.$transaction(async (prisma) => {
      // Crea la nueva transacción
      const transaction = await prisma.transaction.create({
        data: {
          accountId,
          userId,
          amount: data.amount,
          entityName: data.entityName,
          logo: data.logo,
          type: data.type,
          method: data.method,
          category: data.category,
          date: new Date(data.date),
        },
      });

      // Calcula el nuevo balance en función del tipo de transacción
      const balanceUpdate = data.type === "Debit" ? -data.amount : data.amount;

      // Actualiza el balance de la cuenta
      await prisma.account.update({
        where: { id: accountId },
        data: {
          balance: {
            increment: balanceUpdate,
          },
        },
      });

      return transaction;
    });

    // Revalida el camino para actualizar los datos en la página
    revalidatePath("profile/accounts");

    return result;
  } catch (error) {
    console.error("Failed to add transaction", error);
    throw new Error("Failed to add transaction");
  }
}

//update transaction
export async function updateTransaction(
  transactionId: string,
  accountId: string,
  newData: TransactionData,
  oldAmount: number,
  oldType: Type
) {
  try {
    // Convert date string to Date object
    if (typeof newData.date === "string") {
      newData.date = new Date(newData.date);
    }

    // Calcula el cambio en el balance
    let balanceUpdate = 0;
    if (newData.type === "Debit") {
      if (oldType === "Credit") {
        balanceUpdate = -oldAmount - newData.amount; // Cambio de crédito a débito
      } else {
        balanceUpdate = -oldAmount + newData.amount; // Actualización de débito
      }
    } else if (newData.type === "Credit") {
      if (oldType === "Debit") {
        balanceUpdate = oldAmount - newData.amount; // Cambio de débito a crédito
      } else {
        balanceUpdate = oldAmount + newData.amount; // Actualización de crédito
      }
    }

    // Usa una transacción para asegurar atomicidad
    await prisma.$transaction(async (prisma) => {
      const updatedTransaction = await prisma.transaction.update({
        where: { id: transactionId },
        data: newData,
      });

      if (updatedTransaction) {
        await prisma.account.update({
          where: { id: accountId },
          data: {
            balance: {
              increment: balanceUpdate,
            },
          },
        });
      }
    });

    // Revalida el camino
    revalidatePath("/profile/accounts");
  } catch (error) {
    console.error("Error al actualizar la transacción", error);
    throw new Error("Error al actualizar la transacción");
  }
}

//Delete Transaction

export async function deleteTransaction(
  transactionId: string,
  accountId: string,
  amount: number,
  type: Type
) {
  const balanceUpdate = type === "Debit" ? amount : -amount;

  try {
    // Use a transaction to ensure atomicity
    await prisma.$transaction(async (prisma) => {
      // Delete transaction
      await prisma.transaction.delete({
        where: {
          id: transactionId,
        },
      });

      // Update account balance
      await prisma.account.update({
        where: { id: accountId },
        data: {
          balance: {
            increment: balanceUpdate,
          },
        },
      });
    });

    // Revalidate the path to refresh the account list
    revalidatePath("/profile/accounts");
  } catch (error) {
    console.error("Failed to delete transaction", error);
    throw new Error("Failed to delete transaction");
  }
}
