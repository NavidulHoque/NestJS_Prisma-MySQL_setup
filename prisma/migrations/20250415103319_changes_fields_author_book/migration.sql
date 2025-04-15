/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_authorId_fkey`;

-- DropIndex
DROP INDEX `Book_authorId_fkey` ON `Book`;

-- CreateIndex
CREATE UNIQUE INDEX `Book_authorId_key` ON `Book`(`authorId`);

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Author`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
