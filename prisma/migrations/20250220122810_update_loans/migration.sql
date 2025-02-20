/*
  Warnings:

  - You are about to drop the column `address` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `creditScore` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `employment` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `income` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Client` table. All the data in the column will be lost.
  - Added the required column `name` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Made the column `clientId` on table `Loan` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_clientId_fkey";

-- DropIndex
DROP INDEX "Client_email_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "address",
DROP COLUMN "createdAt",
DROP COLUMN "creditScore",
DROP COLUMN "dateOfBirth",
DROP COLUMN "email",
DROP COLUMN "employment",
DROP COLUMN "firstName",
DROP COLUMN "income",
DROP COLUMN "lastName",
DROP COLUMN "phone",
DROP COLUMN "updatedAt",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Loan" ALTER COLUMN "clientId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
