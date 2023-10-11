/*
  Warnings:

  - You are about to drop the column `animalBreedId` on the `animal` table. All the data in the column will be lost.
  - Added the required column `breedId` to the `animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weightUnitId` to the `animal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "animal" DROP CONSTRAINT "animal_animalBreedId_fkey";

-- AlterTable
ALTER TABLE "animal" DROP COLUMN "animalBreedId",
ADD COLUMN     "breedId" INTEGER NOT NULL,
ADD COLUMN     "weightUnitId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "animalBreed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_weightUnitId_fkey" FOREIGN KEY ("weightUnitId") REFERENCES "unitOfMeasurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
