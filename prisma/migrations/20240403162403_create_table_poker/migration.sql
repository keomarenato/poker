/*
  Warnings:

  - Changed the type of `cpf` on the `CadastroUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `fone` on the `CadastroUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CadastroUser" DROP COLUMN "cpf",
ADD COLUMN     "cpf" INTEGER NOT NULL,
DROP COLUMN "fone",
ADD COLUMN     "fone" INTEGER NOT NULL;
