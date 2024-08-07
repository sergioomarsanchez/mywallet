// types/front/authSchemas.ts
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Password must contain at least one special character",
  });

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: passwordSchema,
});

export type SignInData = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: passwordSchema,
});

export type SignUpData = z.infer<typeof signUpSchema>;

export const accountSchema = z.object({
  accountType: z.enum(["Checking", "Savings", "CreditCard"]),
  balance: z.number().nonnegative(),
  entityName: z.string().min(1),
  logo: z.string().url().optional(),
  currency: z.enum(["USD", "ARS", "EUR", "NZD"]),
});

export type AccountData = z.infer<typeof accountSchema>;

export const transactionSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  entityName: z.string().min(1, "Entity name is required"),
  logo: z.string().optional(),
  type: z.enum(["Debit", "Credit"]),
  method: z.enum(["Debit", "Credit", "Cash"]),
  category: z.enum([
    "Housing",
    "Transportation",
    "Food",
    "Entertainment",
    "Utilities",
    "Insurance",
    "Healthcare",
    "DebtRepayment",
    "Savings",
    "Investments",
    "Taxes",
    "Salary",
    "FreelanceContractWork",
    "RentalIncome",
    "Gifts",
    "Other",
  ]),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
});

export type TransactionData = z.infer<typeof transactionSchema>;

export interface OverviewData {
  currency: string;
  balance: number;
  currentMonthIncome: number;
  currentMonthExpense: number;
  lastMonthIncome: number;
  lastMonthExpense: number;
  accountName: string;
  accountLogo?: string | null;
  accountId?: string;
}

export const resetPasswordRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ResetPasswordRequestData = z.infer<
  typeof resetPasswordRequestSchema
>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;


export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export type ContactData = z.infer<typeof contactSchema>