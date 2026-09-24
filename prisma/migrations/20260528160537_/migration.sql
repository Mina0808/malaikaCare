/*
  Warnings:

  - You are about to drop the column `clientEmail` on the `request` table. All the data in the column will be lost.
  - You are about to drop the column `clientFirstName` on the `request` table. All the data in the column will be lost.
  - You are about to drop the column `clientLastName` on the `request` table. All the data in the column will be lost.
  - You are about to drop the column `clientPhone` on the `request` table. All the data in the column will be lost.
  - You are about to drop the `emergencycontact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `emergencycontact` DROP FOREIGN KEY `EmergencyContact_userId_fkey`;

-- AlterTable
ALTER TABLE `request` DROP COLUMN `clientEmail`,
    DROP COLUMN `clientFirstName`,
    DROP COLUMN `clientLastName`,
    DROP COLUMN `clientPhone`,
    ADD COLUMN `benefactorId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `emergencycontact`;

-- CreateTable
CREATE TABLE `OtherContact` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `beneficiaryOfId` VARCHAR(191) NULL,
    `emergencyOfId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_benefactorId_fkey` FOREIGN KEY (`benefactorId`) REFERENCES `OtherContact`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OtherContact` ADD CONSTRAINT `OtherContact_beneficiaryOfId_fkey` FOREIGN KEY (`beneficiaryOfId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OtherContact` ADD CONSTRAINT `OtherContact_emergencyOfId_fkey` FOREIGN KEY (`emergencyOfId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
