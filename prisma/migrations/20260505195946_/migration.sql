/*
  Warnings:

  - Added the required column `userEmail` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userFirstName` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userLastName` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPhone` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Made the column `text` on table `quote` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `quote` ADD COLUMN `userEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `userFirstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `userLastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `userPhone` VARCHAR(191) NOT NULL,
    MODIFY `text` VARCHAR(191) NOT NULL;
