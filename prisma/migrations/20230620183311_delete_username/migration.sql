/*
  Warnings:

  - You are about to drop the column `username` on the `account` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "account_username_key";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "username";
