-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "popularity" INTEGER DEFAULT 0,
ADD COLUMN     "population" INTEGER;
