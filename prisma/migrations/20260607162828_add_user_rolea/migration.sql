-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin', 'demo');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'demo';
