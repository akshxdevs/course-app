/*
  Warnings:

  - You are about to drop the column `particalExcercise` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `stuId` on the `Course` table. All the data in the column will be lost.
  - The `enrolledCount` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `practicalExcercise` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_stuId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "particalExcercise",
DROP COLUMN "stuId",
ADD COLUMN     "practicalExcercise" DOUBLE PRECISION NOT NULL,
DROP COLUMN "enrolledCount",
ADD COLUMN     "enrolledCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "_Enrollments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Enrollments_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Enrollments_B_index" ON "_Enrollments"("B");

-- AddForeignKey
ALTER TABLE "_Enrollments" ADD CONSTRAINT "_Enrollments_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Enrollments" ADD CONSTRAINT "_Enrollments_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
