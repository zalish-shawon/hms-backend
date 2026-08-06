/*
  Warnings:

  - You are about to drop the column `currentWorkplace` on the `doctor` table. All the data in the column will be lost.
  - Added the required column `currentWorkingPlace` to the `doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctor" DROP COLUMN "currentWorkplace",
ADD COLUMN     "currentWorkingPlace" TEXT NOT NULL;
