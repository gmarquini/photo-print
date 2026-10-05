/*
  Warnings:

  - Made the column `sessionId` on table `PrintOrderItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PrintOrderItem" DROP CONSTRAINT "PrintOrderItem_sessionId_fkey";

-- AlterTable
ALTER TABLE "PrintOrderItem" ALTER COLUMN "sessionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PrintOrderItem" ADD CONSTRAINT "PrintOrderItem_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
