/*
  Warnings:

  - You are about to drop the column `optionName` on the `Option` table. All the data in the column will be lost.
  - Added the required column `name` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "optionName",
ADD COLUMN     "name" TEXT NOT NULL;
