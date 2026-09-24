/*
  Warnings:

  - Made the column `phone` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `country` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL,
    MODIFY `city` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL;
