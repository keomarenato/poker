-- CreateTable
CREATE TABLE "HistoricoParticipacao" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "totalArrecadado" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HistoricoParticipacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CadastroUserToHistoricoParticipacao" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CadastroUserToHistoricoParticipacao_AB_unique" ON "_CadastroUserToHistoricoParticipacao"("A", "B");

-- CreateIndex
CREATE INDEX "_CadastroUserToHistoricoParticipacao_B_index" ON "_CadastroUserToHistoricoParticipacao"("B");

-- AddForeignKey
ALTER TABLE "_CadastroUserToHistoricoParticipacao" ADD CONSTRAINT "_CadastroUserToHistoricoParticipacao_A_fkey" FOREIGN KEY ("A") REFERENCES "CadastroUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CadastroUserToHistoricoParticipacao" ADD CONSTRAINT "_CadastroUserToHistoricoParticipacao_B_fkey" FOREIGN KEY ("B") REFERENCES "HistoricoParticipacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
