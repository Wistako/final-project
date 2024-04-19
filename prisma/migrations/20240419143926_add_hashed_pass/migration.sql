/*
  Warnings:

  - Added the required column `hashedPassword` to the `Password` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `password` ADD COLUMN `hashedPassword` VARCHAR(191) NOT NULL;
