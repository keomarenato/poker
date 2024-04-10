/*
  Warnings:

  - You are about to drop the `_CadastroUserToHistoricoParticipacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CadastroUserToHistoricoParticipacao" DROP CONSTRAINT "_CadastroUserToHistoricoParticipacao_A_fkey";

-- DropForeignKey
ALTER TABLE "_CadastroUserToHistoricoParticipacao" DROP CONSTRAINT "_CadastroUserToHistoricoParticipacao_B_fkey";

-- AlterTable
ALTER TABLE "HistoricoParticipacao" ADD COLUMN     "campeonatoId" INTEGER,
ADD COLUMN     "participanteId" INTEGER,
ALTER COLUMN "data" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "totalArrecadado" DROP NOT NULL;

-- DropTable
DROP TABLE "_CadastroUserToHistoricoParticipacao";

-- AddForeignKey
ALTER TABLE "HistoricoParticipacao" ADD CONSTRAINT "HistoricoParticipacao_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "CadastroUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoParticipacao" ADD CONSTRAINT "HistoricoParticipacao_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "Campeonato"("id") ON DELETE SET NULL ON UPDATE CASCADE;
