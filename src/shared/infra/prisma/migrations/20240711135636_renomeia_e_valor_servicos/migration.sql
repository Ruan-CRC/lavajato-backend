/*
  Warnings:

  - You are about to drop the column `tipo` on the `Veiculo` table. All the data in the column will be lost.
  - You are about to drop the `VeiculoServico` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipoVeiculoId` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoVeiculoId` to the `Veiculo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TiposVeiculosEnum" AS ENUM ('carro', 'moto', 'caminhao', 'onibus', 'van', 'buggy');

-- DropForeignKey
ALTER TABLE "VeiculoServico" DROP CONSTRAINT "VeiculoServico_servicoId_fkey";

-- DropForeignKey
ALTER TABLE "VeiculoServico" DROP CONSTRAINT "VeiculoServico_veiculoId_fkey";

-- AlterTable
ALTER TABLE "Servico" ADD COLUMN     "tipoVeiculoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Veiculo" DROP COLUMN "tipo",
ADD COLUMN     "tipoVeiculoId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "VeiculoServico";

-- DropEnum
DROP TYPE "TiposVeiculos";

-- CreateTable
CREATE TABLE "veiculos_servicos" (
    "id" TEXT NOT NULL,
    "veiculoId" INTEGER NOT NULL,
    "servicoId" INTEGER NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3),

    CONSTRAINT "veiculos_servicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoVeiculo" (
    "id" SERIAL NOT NULL,
    "nome" "TiposVeiculosEnum" NOT NULL,

    CONSTRAINT "TipoVeiculo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_tipoVeiculoId_fkey" FOREIGN KEY ("tipoVeiculoId") REFERENCES "TipoVeiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_tipoVeiculoId_fkey" FOREIGN KEY ("tipoVeiculoId") REFERENCES "TipoVeiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "veiculos_servicos" ADD CONSTRAINT "veiculos_servicos_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "veiculos_servicos" ADD CONSTRAINT "veiculos_servicos_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
