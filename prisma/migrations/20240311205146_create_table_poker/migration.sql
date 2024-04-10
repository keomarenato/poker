/*
  Warnings:

  - You are about to drop the `cadastroUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "PokerMove" ADD COLUMN     "cadastroUserId" INTEGER;

-- DropTable
DROP TABLE "cadastroUser";

-- CreateTable
CREATE TABLE "CadastroUser" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "fone" INTEGER NOT NULL,
    "cpf" INTEGER NOT NULL,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "localidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,

    CONSTRAINT "CadastroUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PokerMove" ADD CONSTRAINT "PokerMove_cadastroUserId_fkey" FOREIGN KEY ("cadastroUserId") REFERENCES "CadastroUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
