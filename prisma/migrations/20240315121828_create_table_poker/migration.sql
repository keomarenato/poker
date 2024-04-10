/*
  Warnings:

  - Added the required column `nome` to the `Campeonato` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campeonato" ADD COLUMN     "nome" TEXT NOT NULL;
