/*
  Warnings:

  - You are about to drop the column `userID` on the `Attendance` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Attendance` DROP COLUMN `userID`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;
