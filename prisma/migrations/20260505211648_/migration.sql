/*
  Warnings:

  - You are about to drop the column `quoteId` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the `quote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_quoteId_fkey`;

-- DropForeignKey
ALTER TABLE `quote` DROP FOREIGN KEY `Quote_userId_fkey`;

-- AlterTable
ALTER TABLE `documents` DROP COLUMN `quoteId`;

-- DropTable
DROP TABLE `quote`;
