/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `type` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `method` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `category` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `accountType` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `currency` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'User');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'ARS', 'EUR', 'NZD');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('Checking', 'Savings', 'CreditCard');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Housing', 'Transportation', 'Food', 'Entertainment', 'Utilities', 'Insurance', 'Healthcare', 'DebtRepayment', 'Savings', 'Investments', 'Taxes', 'Salary', 'FreelanceContractWork', 'RentalIncome', 'Gifts', 'Other');

-- CreateEnum
CREATE TYPE "Method" AS ENUM ('Debit', 'Credit', 'Cash');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Debit', 'Credit');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_accountId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "accountType",
ADD COLUMN     "accountType" "AccountType" NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Account_id_seq";

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "accountId" SET DATA TYPE TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'Debit',
DROP COLUMN "method",
ADD COLUMN     "method" "Method" NOT NULL DEFAULT 'Debit',
DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'Other',
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Transaction_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "avatar" TEXT,
ALTER COLUMN "id" SET DEFAULT concat('usr_', replace((gen_random_uuid())::text, '-'::text, ''::text)),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'User',
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
