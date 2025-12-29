"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import bcrypt from "bcryptjs";
import { Type, UserRole, Currency } from "@prisma/client";
import { AccountData, ContactData, TransactionData } from "../types/front";
import { Account, Transaction } from "../types/back";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { addDays, endOfMonth, startOfMonth, subMonths } from "date-fns";
import { LatestTransactionRowProps } from "@/components/categories/latestTransactionRow";

const getEmailHTML = (title: string, content: string) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Wallet - ${title} Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      padding: 10px 0;
    }

    .header img {
      max-width: 150px;
    }

    .content {
      padding: 20px;
      color: #333333;
      line-height: 1.6;
    }

    .content h1 {
      color: #4b39c1;
    }

    .content a {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4b39c1;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
    }

    .footer {
      text-align: center;
      padding: 10px 0;
      color: #777777;
      font-size: 12px;
    }

    .footer a {
      color: #4b39c1;
      text-decoration: none;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <img src="https://mywallet-sos.vercel.app/src/app/assets/icons/logo-icon" alt="My Wallet Logo">
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>© 2024 My Wallet. All rights reserved.</p>
      <p>If you did not request this email, please contact us at <a href="mailto:support@mywallet.com">support@mywallet.com</a>.</p>
    </div>
  </div>
</body>

</html>

`;

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

export async function deleteUser(userId: string) {
  try {
    const session = await getServerSession(authOption);

    if (!session) {
      throw new Error("Not authorized");
    }

    // Verificar si el usuario tiene permiso para eliminar el usuario
    const isAuthorized =
      session.user.role === "Admin" || session.user.id === userId;

    if (!isAuthorized) {
      throw new Error("Not authorized to delete this user");
    }

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
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    // Revalidate the path
    revalidatePath("/");

    return { success: true };
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

// Sign up a new user
export async function signUpUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
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
    throw new Error("Failed to create user");
  }
}

//reste password request

export async function requestPasswordReset(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    const token = crypto.randomBytes(20).toString("hex");
    const expiration = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: expiration,
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const content = `<div class="content">\n\n<h1>Password Reset Request</h1>\n\n<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>\n\n<p>Please click the link below to reset your password:</p>\n\n<p><a href="https://mywallet-sos.vercel.app/reset/${token}">Reset Password</a></p>\n\n<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>\n\n</div>`;
    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset",
      html: getEmailHTML("Password reset Request", content),
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error requesting password reset:", error);
    throw new Error("An error occurred while requesting password reset.");
  }
}

//reste password action

export async function resetPassword({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new Error("Password reset token is invalid or has expired");
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    await prisma.user.update({
      where: { email: user.email },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return { message: "Password has been reset" };
  } catch (error) {
    console.error("Error resetting password:", error);
    throw new Error("An error occurred while resetting the password.");
  }
}

//Verify Email
export const verifyEmail = async (token: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      throw new Error("Invalid or expired token");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { isEmailVerified: true },
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    throw new Error("An error occurred while verifying the email.");
  }
};

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
export async function fetchAccounts(userId: string): Promise<Account[] | []> {
  try {
    const accounts: Account[] = await prisma.account.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (accounts) {
      return accounts;
    } else {
      return [];
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

//Fetch entities data EntityDropdown to add entity and logo to an account or transaction
export async function fetchEntitySuggestions(query: string) {
  if (!query || query.length < 2) return [];

  try {
    const response = await fetch(
      `https://api.clearout.io/public/companies/autocomplete?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Error fetching companies from Clearout");
    }

    const json = await response.json();

    const companies = Array.isArray(json.data) ? json.data : [];

    return companies.slice(0, 5).map((item: any) => {
      const domain = item.domain ?? "";

      return {
        name: item.name,
        logo: domain
          ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
          : "",
      };
    });
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

//fetch last 5 debit transactions
export interface LatestTransaction {
  id: string;
  amount: number;
  entityName: string;
  logo: string | null;
  type: string;
  method: string;
  category: string;
  date: Date;
  account: {
    currency: Currency;
    entityName: string;
    logo: string | null;
  };
}

export async function fetchLatestDebitTransactionsByUserId(
  userId: string
): Promise<LatestTransaction[]> {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId, type: "Debit" },
      orderBy: {
        date: "desc",
      },
      take: 5,
      include: {
        account: {
          select: {
            entityName: true,
            logo: true,
            currency: true,
          },
        },
      },
    });
    return transactions;
  } catch (error) {
    console.error("Failed to fetch debit transactions", error);
    return [];
  }
}

//fetch last 5 credit transactions

export async function fetchLatestCreditTransactionsByUserId(
  userId: string
): Promise<LatestTransaction[]> {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId, type: "Credit" },
      orderBy: {
        date: "desc",
      },
      take: 5,
      include: {
        account: {
          select: {
            entityName: true,
            logo: true,
            currency: true,
          },
        },
      },
    });
    return transactions;
  } catch (error) {
    console.error("Failed to fetch credit transactions", error);
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
    // Convertir la fecha de cadena a objeto Date si es necesario
    let dateToDB =
      typeof newData.date === "string" ? new Date(newData.date) : newData.date;

    // Calcular el cambio en el balance
    let balanceUpdate = 0;

    if (oldType === newData.type) {
      // Si el tipo no ha cambiado, solo ajustar por la diferencia en el monto
      if (newData.type === "Debit") {
        balanceUpdate = oldAmount - newData.amount; // restar la diferencia
      } else if (newData.type === "Credit") {
        balanceUpdate = newData.amount - oldAmount; // sumar la diferencia
      }
    } else {
      // Si el tipo ha cambiado, ajustar por el monto antiguo y el nuevo monto
      if (newData.type === "Debit") {
        balanceUpdate = -oldAmount - newData.amount; // el viejo era Credit, restar ambos montos
      } else if (newData.type === "Credit") {
        balanceUpdate = oldAmount + newData.amount; // el viejo era Debit, sumar ambos montos
      }
    }

    // Usar una transacción para asegurar atomicidad
    await prisma.$transaction(async (prisma) => {
      const updatedTransaction = await prisma.transaction.update({
        where: { id: transactionId },
        data: { ...newData, date: dateToDB },
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

    // Revalidar el camino
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

// ------- Overview --------

//Get user overviwe by credit, debit, grouped by currency

export async function getUserOverview(userId: string) {
  // Obtener las cuentas del usuario junto con las transacciones y las monedas
  const accounts = await prisma.account.findMany({
    where: { userId },
    include: {
      transactions: true,
    },
  });

  const now = new Date();

  // Fechas para el mes pasado
  const startOfLastMonth = addDays(startOfMonth(subMonths(now, 1)), -1);
  const endOfLastMonth = addDays(endOfMonth(subMonths(now, 1)), -1);

  // Fechas para el mes actual
  const startOfCurrentMonth = addDays(startOfMonth(now), -1);
  const endOfCurrentMonth = addDays(endOfMonth(now), -1);

  // Estructurar los datos del overview
  const overview = accounts.map((account) => {
    const currentMonthIncome = account.transactions
      .filter(
        (transaction) =>
          transaction.type === "Credit" &&
          transaction.date >= startOfCurrentMonth &&
          transaction.date <= endOfCurrentMonth
      )
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const currentMonthExpense = account.transactions
      .filter(
        (transaction) =>
          transaction.type === "Debit" &&
          transaction.date >= startOfCurrentMonth &&
          transaction.date <= endOfCurrentMonth
      )
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const lastMonthIncome = account.transactions
      .filter(
        (transaction) =>
          transaction.type === "Credit" &&
          transaction.date >= startOfLastMonth &&
          transaction.date <= endOfLastMonth
      )
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const lastMonthExpense = account.transactions
      .filter(
        (transaction) =>
          transaction.type === "Debit" &&
          transaction.date >= startOfLastMonth &&
          transaction.date <= endOfLastMonth
      )
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const balance = account.balance;

    return {
      currency: account.currency,
      balance,
      currentMonthIncome,
      currentMonthExpense,
      lastMonthIncome,
      lastMonthExpense,
      accountName: account.entityName,
      accountLogo: account.logo,
      accountId: account.id,
    };
  });

  return overview;
}

//get balances for each currency

export async function getUserBalanceByCurrency(userId: string) {
  try {
    const accounts = await prisma.account.findMany({
      where: { userId },
      include: { transactions: true },
    });

    // Agrupar balances y cuentas por currency
    const balanceByCurrency = accounts.reduce((acc, account) => {
      const { currency, balance } = account;
      if (!acc[currency]) {
        acc[currency] = { balance: 0, accountsCount: 0, transactions: [] };
      }
      acc[currency].balance += balance;
      acc[currency].accountsCount += 1;
      acc[currency].transactions.push(...account.transactions);
      return acc;
    }, {} as Record<Currency, { balance: number; accountsCount: number; transactions: Transaction[] }>);

    return { accounts, balanceByCurrency };
  } catch (error) {
    console.error("Error al obtener los balances por currency:", error);
    throw new Error("Error al obtener los balances por currency");
  }
}

//get currency list and total balance per currency
export async function getTotalBalanceByCurrency(userId: string) {
  try {
    const accounts = await prisma.account.findMany({
      where: { userId },
      include: { transactions: true },
    });

    const balanceByCurrency = accounts.reduce((acc, account) => {
      const { currency, balance } = account;
      if (!acc[currency]) {
        acc[currency] = { balance: 0, accountsCount: 0, transactions: [] };
      }
      acc[currency].balance += balance;
      acc[currency].accountsCount += 1;
      acc[currency].transactions.push(...account.transactions);
      return acc;
    }, {} as Record<string, { balance: number; accountsCount: number; transactions: any[] }>);

    return { accounts, balanceByCurrency };
  } catch (error) {
    console.error("Error al obtener los balances por currency:", error);
    throw new Error("Error al obtener los balances por currency");
  }
}

//currency exchange
export async function getExchangeRates() {
  const response = await fetch(
    "https://api.exchangerate-api.com/v4/latest/USD"
  );
  const data = await response.json();
  return data.rates;
}

// get data to show chart
export async function getMonthlyMovements(accountId: string) {
  const now = new Date();
  const lastYear = new Date(now.getFullYear() - 1, now.getMonth() + 1, 1); // Set to the start of the month last year

  // Get last year transactions
  const transactions = await prisma.transaction.findMany({
    where: {
      accountId: accountId,
      date: {
        gte: lastYear,
      },
    },
  });

  // Structure data
  const data = new Array(12).fill(0).map((_, index) => {
    const date = new Date(
      lastYear.getFullYear(),
      lastYear.getMonth() + index,
      1
    );
    return {
      month: date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      }),
      income: 0,
      expense: 0,
    };
  });

  transactions.forEach((transaction) => {
    const transactionDate = new Date(addDays(transaction.date, 1));
    const monthIndex =
      (transactionDate.getFullYear() - lastYear.getFullYear()) * 12 +
      transactionDate.getMonth() -
      lastYear.getMonth();

    if (transaction.type === "Credit") {
      data[monthIndex].income += transaction.amount;
    } else {
      data[monthIndex].expense += transaction.amount;
    }
  });

  return data;
}

// get data for category charts
const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(Date.UTC(year, month, 1));
};

const getLastDayOfMonth = (year: number, month: number) => {
  return new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));
};

type CreditCategoryKeys =
  | "Salary"
  | "FreelanceContractWork"
  | "RentalIncome"
  | "Gifts"
  | "Investments"
  | "Other";

type DebitCategoryKeys =
  | "Housing"
  | "Transportation"
  | "Food"
  | "Gifts"
  | "Entertainment"
  | "Utilities"
  | "Insurance"
  | "Healthcare"
  | "DebtRepayment"
  | "Savings"
  | "Taxes"
  | "Other";

type Categories = {
  income: Record<CreditCategoryKeys, number>;
  spending: Record<DebitCategoryKeys, number>;
};

export async function getCategoryMovements(
  userId: string,
  month: Date,
  currency: string
) {
  const start = getFirstDayOfMonth(month.getUTCFullYear(), month.getUTCMonth());
  const end = getLastDayOfMonth(month.getUTCFullYear(), month.getUTCMonth());

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: start,
        lte: end,
      },
      account: {
        currency: currency as Currency,
      },
    },
    include: {
      account: true,
    },
  });

  const categories: Categories = {
    income: {
      Salary: 0,
      FreelanceContractWork: 0,
      RentalIncome: 0,
      Gifts: 0,
      Investments: 0,
      Other: 0,
    },
    spending: {
      Gifts: 0,
      Housing: 0,
      Transportation: 0,
      Food: 0,
      Entertainment: 0,
      Utilities: 0,
      Insurance: 0,
      Healthcare: 0,
      DebtRepayment: 0,
      Savings: 0,
      Taxes: 0,
      Other: 0,
    },
  };

  transactions.forEach((transaction) => {
    const creditCategoryKey = transaction.category as CreditCategoryKeys;
    const debitCategoryKey = transaction.category as DebitCategoryKeys;

    if (transaction.type === "Credit") {
      if (creditCategoryKey in categories.income) {
        categories.income[creditCategoryKey] += transaction.amount;
      } else {
        categories.income.Other += transaction.amount;
      }
    } else {
      if (debitCategoryKey in categories.spending) {
        categories.spending[debitCategoryKey] += transaction.amount;
      } else {
        categories.spending.Other += transaction.amount;
      }
    }
  });

  return categories;
}

//-------- Contact form ---------
export async function sendContactMessage(data: ContactData) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const content = `<div class="content">\n\n
    <h1>New Message from My Wallet</h1>\n\n
    <p>You have received a new message from the contact form on My Wallet website.</p>\n\n
    <p><strong>Name:</strong> ${data.name}</p>\n\n
    <p><strong>Email:</strong> ${data.email}</p>\n\n
    <p><strong>Message:</strong></p>\n\n
    <p>${data.message}</p>\n\n
  </div>`;
    const mailOptions = {
      to: process.env.EMAIL_USER,
      from: process.env.EMAIL_USER,
      subject: "Contact Form Message",
      html: getEmailHTML("Contact form From My Wallet", content),
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw new Error("An error occurred while sending the contact message.");
  }
}
