/*
  Warnings:

  - You are about to drop the column `servicoId` on the `ServicoValor` table. All the data in the column will be lost.
  - Added the required column `servicoValorId` to the `ServicoValor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ServicoValor" DROP CONSTRAINT "ServicoValor_servicoId_fkey";

-- AlterTable
ALTER TABLE "ServicoValor" DROP COLUMN "servicoId",
ADD COLUMN     "servicoValorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "veiculos_servicos" ALTER COLUMN "dataInicio" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ServicoValor" ADD CONSTRAINT "ServicoValor_servicoValorId_fkey" FOREIGN KEY ("servicoValorId") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
