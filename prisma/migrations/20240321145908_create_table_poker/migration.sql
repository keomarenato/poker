/*
  Warnings:

  - Added the required column `bairro` to the `CadastroUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `CadastroUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `CadastroUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fone` to the `CadastroUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localidade` to the `CadastroUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logradouro` to the `CadastroUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `CadastroUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `CadastroUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CadastroUser" ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "cpf" INTEGER NOT NULL,
ADD COLUMN     "fone" INTEGER NOT NULL,
ADD COLUMN     "localidade" TEXT NOT NULL,
ADD COLUMN     "logradouro" TEXT NOT NULL,
ADD COLUMN     "numero" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL;
