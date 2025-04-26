/*
  Warnings:

  - You are about to drop the column `object` on the `Canvas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Canvas" DROP COLUMN "object",
ADD COLUMN     "data" JSONB;
