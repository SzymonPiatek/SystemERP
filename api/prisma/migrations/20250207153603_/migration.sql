/*
  Warnings:

  - You are about to drop the column `isResetingPassword` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isResetingPassword",
ADD COLUMN     "isPasswordReseting" BOOLEAN NOT NULL DEFAULT false;
