/*
  Warnings:

  - Added the required column `nip` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regon` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "nip" TEXT NOT NULL,
ADD COLUMN     "regon" TEXT NOT NULL,
ALTER COLUMN "voivodeship" DROP NOT NULL,
ALTER COLUMN "district" DROP NOT NULL,
ALTER COLUMN "commune" DROP NOT NULL,
ALTER COLUMN "apartmentNumber" DROP NOT NULL;
