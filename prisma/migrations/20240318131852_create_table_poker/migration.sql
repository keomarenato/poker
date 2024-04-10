/*
  Warnings:

  - You are about to drop the column `nomeCampeonato` on the `Partida` table. All the data in the column will be lost.
  - Added the required column `campeonatoId` to the `Partida` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Partida" DROP CONSTRAINT "Partida_nomeCampeonato_fkey";

-- DropIndex
DROP INDEX "Campeonato_nome_key";

-- AlterTable
ALTER TABLE "Partida" DROP COLUMN "nomeCampeonato",
ADD COLUMN     "campeonatoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "Campeonato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
