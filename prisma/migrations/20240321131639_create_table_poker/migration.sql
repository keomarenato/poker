/*
  Warnings:

  - You are about to drop the column `dataCampeonato` on the `Partida` table. All the data in the column will be lost.
  - You are about to drop the column `nomeCampeonato` on the `Partida` table. All the data in the column will be lost.
  - You are about to drop the `HistoricoParticipacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Participacao` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `data` to the `Partida` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Partida` table without a default value. This is not possible if the table is not empty.
  - Made the column `campeonatoId` on table `Partida` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "HistoricoParticipacao" DROP CONSTRAINT "HistoricoParticipacao_campeonatoId_fkey";

-- DropForeignKey
ALTER TABLE "HistoricoParticipacao" DROP CONSTRAINT "HistoricoParticipacao_participanteId_fkey";

-- DropForeignKey
ALTER TABLE "Partida" DROP CONSTRAINT "Partida_campeonatoId_fkey";

-- DropForeignKey
ALTER TABLE "_Participacao" DROP CONSTRAINT "_Participacao_A_fkey";

-- DropForeignKey
ALTER TABLE "_Participacao" DROP CONSTRAINT "_Participacao_B_fkey";

-- AlterTable
ALTER TABLE "Partida" DROP COLUMN "dataCampeonato",
DROP COLUMN "nomeCampeonato",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ALTER COLUMN "campeonatoId" SET NOT NULL;

-- DropTable
DROP TABLE "HistoricoParticipacao";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_Participacao";

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "Campeonato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
