-- DropForeignKey
ALTER TABLE "Partida" DROP CONSTRAINT "Partida_campeonatoId_fkey";

-- AlterTable
ALTER TABLE "Partida" ALTER COLUMN "campeonatoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "Campeonato"("id") ON DELETE SET NULL ON UPDATE CASCADE;
