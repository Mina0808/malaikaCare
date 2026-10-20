/*
  Warnings:

  - You are about to drop the `_clienttointervention` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `patientId` to the `Intervention` table without a default value. This is not possible if the table is not empty.
  - Made the column `professionalId` on table `intervention` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `_clienttointervention` DROP FOREIGN KEY `_ClientToIntervention_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clienttointervention` DROP FOREIGN KEY `_ClientToIntervention_B_fkey`;

-- DropForeignKey
ALTER TABLE `intervention` DROP FOREIGN KEY `Intervention_professionalId_fkey`;

-- AlterTable
ALTER TABLE `intervention` ADD COLUMN `patientId` VARCHAR(191) NOT NULL,
    MODIFY `professionalId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `professional` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `assistant` BOOLEAN NULL,
    ADD COLUMN `diplomas` BOOLEAN NULL,
    ADD COLUMN `speciality` VARCHAR(191) NULL,
    ADD COLUMN `workAddress` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `request` MODIFY `clientId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_clienttointervention`;

-- AddForeignKey
ALTER TABLE `Intervention` ADD CONSTRAINT `Intervention_professionalId_fkey` FOREIGN KEY (`professionalId`) REFERENCES `Professional`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Intervention` ADD CONSTRAINT `Intervention_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
