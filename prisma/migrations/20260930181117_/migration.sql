/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Professional` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Professional_email_key` ON `Professional`(`email`);
