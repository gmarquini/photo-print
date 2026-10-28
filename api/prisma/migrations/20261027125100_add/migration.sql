/*
  Warnings:

  - You are about to drop the column `keyword` on the `PrintOrderItem` table. All the data in the column will be lost.
  - Added the required column `keyword` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PrintOrderItem" DROP COLUMN "keyword";

-- AlterTable
ALTER TABLE "session" ADD COLUMN     "keyword" TEXT NOT NULL;
