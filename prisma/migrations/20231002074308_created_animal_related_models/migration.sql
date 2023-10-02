/*
  Warnings:

  - You are about to drop the `UOM` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UOM";

-- CreateTable
CREATE TABLE "unitOfMeasurement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "initial" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "unitOfMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gender" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),

    CONSTRAINT "gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animalType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "animalType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animalCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "animalTypeId" INTEGER,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "animalCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animalBreed" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "animalCategoryId" INTEGER,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "animalBreed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animal" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "image" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "genderId" INTEGER NOT NULL,
    "animalBreedId" INTEGER NOT NULL,
    "bornAt" TIMESTAMPTZ(3),
    "purchasedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "animal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "animalCategory" ADD CONSTRAINT "animalCategory_animalTypeId_fkey" FOREIGN KEY ("animalTypeId") REFERENCES "animalType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animalBreed" ADD CONSTRAINT "animalBreed_animalCategoryId_fkey" FOREIGN KEY ("animalCategoryId") REFERENCES "animalCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_animalBreedId_fkey" FOREIGN KEY ("animalBreedId") REFERENCES "animalBreed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
