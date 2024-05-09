/*
  Warnings:

  - The required column `idUser` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `tipo` on the `Veiculo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TiposVeiculos" AS ENUM ('carro', 'moto', 'caminhao', 'onibus', 'van', 'buggy');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "idUser" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Veiculo" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TiposVeiculos" NOT NULL;
