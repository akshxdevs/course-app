-- CreateTable
CREATE TABLE "Cert" (
    "id" TEXT NOT NULL,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "courseName" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "stuName" TEXT NOT NULL,
    "stuId" TEXT NOT NULL,

    CONSTRAINT "Cert_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cert" ADD CONSTRAINT "Cert_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cert" ADD CONSTRAINT "Cert_stuId_fkey" FOREIGN KEY ("stuId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
