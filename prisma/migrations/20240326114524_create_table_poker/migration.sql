/*
  Warnings:

  - Added the required column `data` to the `Partida` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Partida" ADD COLUMN     "data" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "valor" DOUBLE PRECISION;
