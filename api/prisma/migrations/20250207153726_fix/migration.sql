/*
  Warnings:

  - You are about to drop the column `isPasswordReseting` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isPasswordReseting",
ADD COLUMN     "isPasswordResetting" BOOLEAN NOT NULL DEFAULT false;
