import { Category, Method, Type, UserRole } from "@prisma/client";
import { Currency } from "@prisma/client";
import { AccountType } from "@prisma/client";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Account = {
  id: string;
  accountType: AccountType;
  balance: number;
  userId: string;
  entityName: string;
  logo?: string | null;
  currency: Currency;
  createdAt: Date;
  updatedAt: Date;
};

export type Transaction = {
  id: string;
  accountId: string;
  userId: string;
  amount: number;
  entityName: string;
  logo?: string | null;
  type: Type;
  method: Method;
  category: Category;
  date: Date;
};
