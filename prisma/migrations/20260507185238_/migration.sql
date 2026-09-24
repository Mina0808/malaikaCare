/*
  Warnings:

  - You are about to drop the column `label` on the `referentiel` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `referentiel` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `referentiel` table. All the data in the column will be lost.
  - You are about to drop the column `callingCode` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `confirmed` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `verifiedAt` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to drop the `passwordtoken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientId` to the `Documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Referentiel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Referentiel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategory` to the `Referentiel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `request` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestStatus` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestText` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `passwordtoken` DROP FOREIGN KEY `PasswordToken_userId_fkey`;

-- AlterTable
ALTER TABLE `documents` ADD COLUMN `clientId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `referentiel` DROP COLUMN `label`,
    DROP COLUMN `type`,
    DROP COLUMN `value`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `subCategory` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `callingCode`,
    DROP COLUMN `confirmed`,
    DROP COLUMN `verifiedAt`,
    ADD COLUMN `request` VARCHAR(191) NOT NULL,
    ADD COLUMN `requestStatus` VARCHAR(191) NOT NULL,
    ADD COLUMN `requestText` VARCHAR(191) NOT NULL,
    MODIFY `country` VARCHAR(191) NULL,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(191) NOT NULL,
    MODIFY `role` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `passwordtoken`;

-- DropTable
DROP TABLE `services`;

-- CreateTable
CREATE TABLE `OtherContact` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OtherContact` ADD CONSTRAINT `OtherContact_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
