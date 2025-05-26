-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'STUDENT', 'DUMMY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "UserRole" "UserRole" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "stuName" TEXT NOT NULL,
    "stuImg" TEXT NOT NULL,
    "stuUserName" TEXT NOT NULL,
    "stuPassword" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "UserRole" "UserRole" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "admName" TEXT NOT NULL,
    "admImg" TEXT NOT NULL,
    "admUserName" TEXT NOT NULL,
    "admPassword" TEXT NOT NULL,
    "UserRole" "UserRole" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "courseImg" TEXT NOT NULL,
    "courseDescription" TEXT NOT NULL,
    "courseRating" DOUBLE PRECISION NOT NULL,
    "hoursOfcontent" DOUBLE PRECISION NOT NULL,
    "particalExcercise" DOUBLE PRECISION NOT NULL,
    "CoursePrice" DOUBLE PRECISION NOT NULL,
    "tutorId" TEXT NOT NULL,
    "enrolledCount" TEXT NOT NULL,
    "stuId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_stuUserName_key" ON "Student"("stuUserName");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_admUserName_key" ON "Admin"("admUserName");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_stuId_fkey" FOREIGN KEY ("stuId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
