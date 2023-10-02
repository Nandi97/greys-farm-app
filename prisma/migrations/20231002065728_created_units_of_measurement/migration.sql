-- CreateTable
CREATE TABLE "UOM" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "initial" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),

    CONSTRAINT "UOM_pkey" PRIMARY KEY ("id")
);
