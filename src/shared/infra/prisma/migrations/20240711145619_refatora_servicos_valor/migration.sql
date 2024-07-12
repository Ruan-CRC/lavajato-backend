/*
  Warnings:

  - You are about to drop the column `tipoVeiculoId` on the `Servico` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `Servico` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Servico" DROP CONSTRAINT "Servico_tipoVeiculoId_fkey";

-- AlterTable
ALTER TABLE "Servico" DROP COLUMN "tipoVeiculoId",
DROP COLUMN "valor";

-- CreateTable
CREATE TABLE "ServicoValor" (
    "id" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "servicoId" INTEGER NOT NULL,
    "tipoVeiculoId" INTEGER NOT NULL,

    CONSTRAINT "ServicoValor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServicoValor" ADD CONSTRAINT "ServicoValor_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicoValor" ADD CONSTRAINT "ServicoValor_tipoVeiculoId_fkey" FOREIGN KEY ("tipoVeiculoId") REFERENCES "TipoVeiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
