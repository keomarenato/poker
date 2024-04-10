/*
  Warnings:

  - You are about to drop the `Presenca` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Presenca" DROP CONSTRAINT "Presenca_campeonatoId_fkey";

-- DropForeignKey
ALTER TABLE "Presenca" DROP CONSTRAINT "Presenca_usuarioId_fkey";

-- DropTable
DROP TABLE "Presenca";
