-- CreateTable
CREATE TABLE "Wishlist" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "courseImg" TEXT NOT NULL,
    "courseDescription" TEXT NOT NULL,
    "courseRating" DOUBLE PRECISION NOT NULL,
    "hoursOfcontent" DOUBLE PRECISION NOT NULL,
    "CoursePrice" DOUBLE PRECISION NOT NULL,
    "stuId" TEXT NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_stuId_fkey" FOREIGN KEY ("stuId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
