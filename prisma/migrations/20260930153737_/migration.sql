/*
  Warnings:

  - You are about to drop the column `targetPage` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `benefactorId` on the `request` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `request` table. All the data in the column will be lost.
  - You are about to drop the `othercontact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `referentiel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientId` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_userId_fkey`;

-- DropForeignKey
ALTER TABLE `othercontact` DROP FOREIGN KEY `OtherContact_beneficiaryOfId_fkey`;

-- DropForeignKey
ALTER TABLE `othercontact` DROP FOREIGN KEY `OtherContact_emergencyOfId_fkey`;

-- DropForeignKey
ALTER TABLE `request` DROP FOREIGN KEY `Request_benefactorId_fkey`;

-- DropForeignKey
ALTER TABLE `request` DROP FOREIGN KEY `Request_userId_fkey`;

-- AlterTable
ALTER TABLE `documents` DROP COLUMN `targetPage`,
    DROP COLUMN `userId`,
    ADD COLUMN `clientId` VARCHAR(191) NULL,
    MODIFY `requestId` INTEGER NULL;

-- AlterTable
ALTER TABLE `request` DROP COLUMN `benefactorId`,
    DROP COLUMN `userId`,
    ADD COLUMN `clientId` VARCHAR(191) NOT NULL,
    ADD COLUMN `contactEmail` VARCHAR(191) NULL,
    ADD COLUMN `contactFirstName` VARCHAR(191) NULL,
    ADD COLUMN `contactLastName` VARCHAR(191) NULL,
    ADD COLUMN `contactPhone` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `othercontact`;

-- DropTable
DROP TABLE `referentiel`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Client` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `gender` BOOLEAN NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `pathology` VARCHAR(191) NULL,
    `autonomy` BOOLEAN NOT NULL,
    `comments` TEXT NULL,
    `contactLastName` VARCHAR(191) NULL,
    `contactFirstName` VARCHAR(191) NULL,
    `contactEmail` VARCHAR(191) NULL,
    `contactPhone` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `professionalId` VARCHAR(191) NULL,

    UNIQUE INDEX `Client_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Professional` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Intervention` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `service` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `professionalId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClientToIntervention` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ClientToIntervention_AB_unique`(`A`, `B`),
    INDEX `_ClientToIntervention_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_professionalId_fkey` FOREIGN KEY (`professionalId`) REFERENCES `Professional`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Intervention` ADD CONSTRAINT `Intervention_professionalId_fkey` FOREIGN KEY (`professionalId`) REFERENCES `Professional`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClientToIntervention` ADD CONSTRAINT `_ClientToIntervention_A_fkey` FOREIGN KEY (`A`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClientToIntervention` ADD CONSTRAINT `_ClientToIntervention_B_fkey` FOREIGN KEY (`B`) REFERENCES `Intervention`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
