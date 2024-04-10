/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Campeonato` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Partida" (
    "id" SERIAL NOT NULL,
    "nomeCampeonato" TEXT NOT NULL,
    "dataCampeonato" TIMESTAMP(3) NOT NULL,
    "valorTotal" DOUBLE PRECISION,

    CONSTRAINT "Partida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ParticipantesPartida" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ParticipantesPartida_AB_unique" ON "_ParticipantesPartida"("A", "B");

-- CreateIndex
CREATE INDEX "_ParticipantesPartida_B_index" ON "_ParticipantesPartida"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Campeonato_nome_key" ON "Campeonato"("nome");

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_nomeCampeonato_fkey" FOREIGN KEY ("nomeCampeonato") REFERENCES "Campeonato"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParticipantesPartida" ADD CONSTRAINT "_ParticipantesPartida_A_fkey" FOREIGN KEY ("A") REFERENCES "CadastroUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParticipantesPartida" ADD CONSTRAINT "_ParticipantesPartida_B_fkey" FOREIGN KEY ("B") REFERENCES "Partida"("id") ON DELETE CASCADE ON UPDATE CASCADE;
