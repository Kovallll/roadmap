/*
  Warnings:

  - Added the required column `title` to the `Canvas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Canvas" ADD COLUMN     "title" TEXT NOT NULL;
