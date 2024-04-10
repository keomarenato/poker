/*
  Warnings:

  - You are about to drop the `PokerMove` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PokerMove" DROP CONSTRAINT "PokerMove_cadastroUserId_fkey";

-- DropTable
DROP TABLE "PokerMove";

-- CreateTable
CREATE TABLE "Campeonato" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valorTotal" DOUBLE PRECISION,

    CONSTRAINT "Campeonato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presenca" (
    "id" SERIAL NOT NULL,
    "campeonatoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "presente" BOOLEAN NOT NULL,

    CONSTRAINT "Presenca_pkey" PRIMARY KEY ("id")
);

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
ALTER TABLE "Presenca" ADD CONSTRAINT "Presenca_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "Campeonato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presenca" ADD CONSTRAINT "Presenca_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "CadastroUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Participacao" ADD CONSTRAINT "_Participacao_A_fkey" FOREIGN KEY ("A") REFERENCES "CadastroUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Participacao" ADD CONSTRAINT "_Participacao_B_fkey" FOREIGN KEY ("B") REFERENCES "Campeonato"("id") ON DELETE CASCADE ON UPDATE CASCADE;
