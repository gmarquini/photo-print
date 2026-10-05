-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "PrintOrder" DROP CONSTRAINT "PrintOrder_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "PrintOrderItem" DROP CONSTRAINT "PrintOrderItem_photoId_fkey";

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintOrderItem" ADD CONSTRAINT "PrintOrderItem_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintOrder" ADD CONSTRAINT "PrintOrder_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
