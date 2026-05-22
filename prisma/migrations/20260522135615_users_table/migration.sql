/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WatchListItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "WatchListItem" DROP CONSTRAINT "WatchListItem_movieId_fkey";

-- DropForeignKey
ALTER TABLE "WatchListItem" DROP CONSTRAINT "WatchListItem_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Movie";

-- DropTable
DROP TABLE "WatchListItem";

-- DropEnum
DROP TYPE "WatchListStatus";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
