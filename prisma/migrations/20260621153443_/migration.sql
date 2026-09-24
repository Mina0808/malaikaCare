/*
  Warnings:

  - You are about to drop the column `clientId` on the `documents` table. All the data in the column will be lost.
  - Added the required column `requestId` to the `Documents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_clientId_fkey`;

-- AlterTable
ALTER TABLE `documents` DROP COLUMN `clientId`,
    ADD COLUMN `requestId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `Request`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
