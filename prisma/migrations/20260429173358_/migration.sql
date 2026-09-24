/*
  Warnings:

  - You are about to drop the column `nom` on the `documents` table. All the data in the column will be lost.
  - Added the required column `name` to the `Documents` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `documents` DROP COLUMN `nom`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `targetPage` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('INDIVIDUAL', 'ADMIN') NOT NULL;
