/*
  Warnings:

  - You are about to drop the `ServicoValor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServicoValor" DROP CONSTRAINT "ServicoValor_servicoValorId_fkey";

-- DropForeignKey
ALTER TABLE "ServicoValor" DROP CONSTRAINT "ServicoValor_tipoVeiculoId_fkey";

-- DropTable
DROP TABLE "ServicoValor";

-- CreateTable
CREATE TABLE "ServicoMetadados" (
    "id" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "tempo" TIMESTAMP(3) NOT NULL,
    "tipoVeiculoId" INTEGER NOT NULL,
    "servicoValorId" INTEGER NOT NULL,

    CONSTRAINT "ServicoMetadados_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServicoMetadados" ADD CONSTRAINT "ServicoMetadados_servicoValorId_fkey" FOREIGN KEY ("servicoValorId") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicoMetadados" ADD CONSTRAINT "ServicoMetadados_tipoVeiculoId_fkey" FOREIGN KEY ("tipoVeiculoId") REFERENCES "TipoVeiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
