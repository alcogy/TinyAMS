/*
  Warnings:

  - You are about to drop the `Break` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[date,userId]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Attendance` ADD COLUMN `breakIn` DATETIME(3) NULL,
    ADD COLUMN `breakOut` DATETIME(3) NULL;

-- DropTable
DROP TABLE `Break`;

-- CreateIndex
CREATE UNIQUE INDEX `Attendance_date_userId_key` ON `Attendance`(`date`, `userId`);
