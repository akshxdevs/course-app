-- CreateTable
CREATE TABLE "PurchaseToken" (
    "id" TEXT NOT NULL,
    "purchaseToken" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "stuId" TEXT NOT NULL,

    CONSTRAINT "PurchaseToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseToken_purchaseToken_key" ON "PurchaseToken"("purchaseToken");

-- AddForeignKey
ALTER TABLE "PurchaseToken" ADD CONSTRAINT "PurchaseToken_stuId_fkey" FOREIGN KEY ("stuId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
