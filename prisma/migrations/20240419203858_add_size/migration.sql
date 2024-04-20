/*
  Warnings:

  - Made the column `size` on table `orderitem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `orderitem` MODIFY `size` ENUM('S', 'M', 'L', 'XL') NOT NULL;
