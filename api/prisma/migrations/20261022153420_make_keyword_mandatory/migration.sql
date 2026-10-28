/*
  Warnings:

  - Made the column `keyword` on table `PrintOrderItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PrintOrderItem" ALTER COLUMN "keyword" SET NOT NULL;
