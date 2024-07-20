/*
  Warnings:

  - A unique constraint covering the columns `[dataInicio]` on the table `veiculos_servicos` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "veiculos_servicos" ALTER COLUMN "dataInicio" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "veiculos_servicos_dataInicio_key" ON "veiculos_servicos"("dataInicio");
