/*
  Warnings:

  - You are about to drop the column `experienceYears` on the `doctor` table. All the data in the column will be lost.
  - You are about to drop the column `qualifications` on the `doctor` table. All the data in the column will be lost.
  - Added the required column `qualification` to the `doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctor" DROP COLUMN "experienceYears",
DROP COLUMN "qualifications",
ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "qualification" TEXT NOT NULL;
