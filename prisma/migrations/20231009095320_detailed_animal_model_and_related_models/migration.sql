-- AlterTable
ALTER TABLE "animal" ADD COLUMN     "birthWeight" DOUBLE PRECISION,
ADD COLUMN     "calvingInterval" INTEGER,
ADD COLUMN     "damId" INTEGER,
ADD COLUMN     "growthRate" DOUBLE PRECISION,
ADD COLUMN     "healthRecord" TEXT,
ADD COLUMN     "isPregnant" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastCalvingDate" TIMESTAMP(3),
ADD COLUMN     "locationId" INTEGER,
ADD COLUMN     "pregnancyDueDate" TIMESTAMP(3),
ADD COLUMN     "sireId" INTEGER;

-- CreateTable
CREATE TABLE "treatment" (
    "id" SERIAL NOT NULL,
    "animalId" INTEGER NOT NULL,
    "treatmentDate" TIMESTAMP(3) NOT NULL,
    "treatmentType" TEXT NOT NULL,
    "dosage" DOUBLE PRECISION,
    "unitId" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "treatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "milkProduction" (
    "id" SERIAL NOT NULL,
    "animalId" INTEGER NOT NULL,
    "productionDate" TIMESTAMP(3),
    "quantity" DOUBLE PRECISION NOT NULL,
    "unitId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "milkProduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "markerId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weightRecord" (
    "id" SERIAL NOT NULL,
    "animalId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "measurementDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "weightRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "breedingMethod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "breedingMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "breeding" (
    "id" SERIAL NOT NULL,
    "cowId" INTEGER NOT NULL,
    "matingDate" TIMESTAMP(3) NOT NULL,
    "bullId" INTEGER NOT NULL,
    "breedingMethodId" INTEGER NOT NULL,
    "pregnancy" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),
    "animalId" INTEGER,

    CONSTRAINT "breeding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "location_markerId_key" ON "location"("markerId");

-- AddForeignKey
ALTER TABLE "treatment" ADD CONSTRAINT "treatment_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment" ADD CONSTRAINT "treatment_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "unitOfMeasurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milkProduction" ADD CONSTRAINT "milkProduction_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milkProduction" ADD CONSTRAINT "milkProduction_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "unitOfMeasurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_sireId_fkey" FOREIGN KEY ("sireId") REFERENCES "animal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_damId_fkey" FOREIGN KEY ("damId") REFERENCES "animal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weightRecord" ADD CONSTRAINT "weightRecord_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "breeding" ADD CONSTRAINT "breeding_cowId_fkey" FOREIGN KEY ("cowId") REFERENCES "animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "breeding" ADD CONSTRAINT "breeding_bullId_fkey" FOREIGN KEY ("bullId") REFERENCES "animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "breeding" ADD CONSTRAINT "breeding_breedingMethodId_fkey" FOREIGN KEY ("breedingMethodId") REFERENCES "breedingMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "breeding" ADD CONSTRAINT "breeding_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
