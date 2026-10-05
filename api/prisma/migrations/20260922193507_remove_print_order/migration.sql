/*
  Warnings:

  - You are about to drop the column `printOrderId` on the `PrintOrderItem` table. All the data in the column will be lost.
  - You are about to drop the `PrintOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Status" ADD VALUE 'sent';
ALTER TYPE "Status" ADD VALUE 'canceled';

-- DropForeignKey
ALTER TABLE "PrintOrder" DROP CONSTRAINT "PrintOrder_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "PrintOrderItem" DROP CONSTRAINT "PrintOrderItem_printOrderId_fkey";

-- AlterTable
ALTER TABLE "PrintOrderItem" DROP COLUMN "printOrderId",
ADD COLUMN     "sessionId" TEXT;

-- DropTable
DROP TABLE "PrintOrder";

-- DropEnum
DROP TYPE "OrderStatus";

-- AddForeignKey
ALTER TABLE "PrintOrderItem" ADD CONSTRAINT "PrintOrderItem_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
