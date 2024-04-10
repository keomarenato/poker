/*
  Warnings:

  - You are about to drop the column `data` on the `Partida` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Partida" DROP COLUMN "data";

-- CreateTable
CREATE TABLE "_Participacao" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Participacao_AB_unique" ON "_Participacao"("A", "B");

-- CreateIndex
CREATE INDEX "_Participacao_B_index" ON "_Participacao"("B");

-- AddForeignKey
ALTER TABLE "_Participacao" ADD CONSTRAINT "_Participacao_A_fkey" FOREIGN KEY ("A") REFERENCES "CadastroUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Participacao" ADD CONSTRAINT "_Participacao_B_fkey" FOREIGN KEY ("B") REFERENCES "Campeonato"("id") ON DELETE CASCADE ON UPDATE CASCADE;
