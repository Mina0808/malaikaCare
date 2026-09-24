/*
  Warnings:

  - You are about to drop the column `type` on the `emergencycontact` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isEmergencyContact` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `emergencycontact` DROP COLUMN `type`;

-- AlterTable
ALTER TABLE `request` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `isEmergencyContact` BOOLEAN NOT NULL;
