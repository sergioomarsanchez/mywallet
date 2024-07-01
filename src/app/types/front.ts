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