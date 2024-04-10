/*
  Warnings:

  - You are about to drop the column `bairro` on the `CadastroUser` table. All the data in the column will be lost.
  - You are about to drop the column `cep` on the `CadastroUser` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `CadastroUser` table. All the data in the column will be lost.
  - You are about to drop the column `fone` on the `CadastroUser` table. All the data in the column will be lost.
  - You are about to drop the column `localidade` on the `CadastroUser` table. All the data in the column will be lost.
  - You are about to drop the column `logradouro` on the `CadastroUser` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `CadastroUser` table. All the data in the column will be lost.
  - You are about to drop the column `uf` on the `CadastroUser` table. All the data in the column will be lost.
  - You are about to drop the column `valorTotal` on the `Partida` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CadastroUser" DROP COLUMN "bairro",
DROP COLUMN "cep",
DROP COLUMN "cpf",
DROP COLUMN "fone",
DROP COLUMN "localidade",
DROP COLUMN "logradouro",
DROP COLUMN "numero",
DROP COLUMN "uf";

-- AlterTable
ALTER TABLE "Partida" DROP COLUMN "valorTotal";

-- CreateTable
CREATE TABLE "RegistroCampeonato" (
    "id" SERIAL NOT NULL,
    "campeonatoId" INTEGER NOT NULL,
    "detalhes" TEXT NOT NULL,

    CONSTRAINT "RegistroCampeonato_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegistroCampeonato_campeonatoId_key" ON "RegistroCampeonato"("campeonatoId");

-- AddForeignKey
ALTER TABLE "RegistroCampeonato" ADD CONSTRAINT "RegistroCampeonato_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "Campeonato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
