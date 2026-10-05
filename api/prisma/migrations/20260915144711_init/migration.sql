-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'finished');

-- CreateEnum
CREATE TYPE "PaperType" AS ENUM ('glossy', 'matte');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'printing', 'canceled', 'done');

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMP(3),

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "sessionId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrintOrderItem" (
    "id" TEXT NOT NULL,
    "photoId" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "paperType" "PaperType" NOT NULL,
    "showDate" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "printOrderId" TEXT NOT NULL,

    CONSTRAINT "PrintOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrintOrder" (
    "id" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'pending',
    "sessionId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMP(3),

    CONSTRAINT "PrintOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintOrderItem" ADD CONSTRAINT "PrintOrderItem_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintOrderItem" ADD CONSTRAINT "PrintOrderItem_printOrderId_fkey" FOREIGN KEY ("printOrderId") REFERENCES "PrintOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintOrder" ADD CONSTRAINT "PrintOrder_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
