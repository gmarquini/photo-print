/*
  Warnings:

  - You are about to drop the column `sessionId` on the `PrintOrderItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PrintOrderItem" DROP CONSTRAINT "PrintOrderItem_sessionId_fkey";

-- AlterTable
ALTER TABLE "PrintOrderItem" DROP COLUMN "sessionId";
