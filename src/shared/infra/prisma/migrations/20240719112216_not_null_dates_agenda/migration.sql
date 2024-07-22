/*
  Warnings:

  - Made the column `dataInicio` on table `veiculos_servicos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dataFim` on table `veiculos_servicos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "veiculos_servicos" ALTER COLUMN "dataInicio" SET NOT NULL,
ALTER COLUMN "dataFim" SET NOT NULL;
