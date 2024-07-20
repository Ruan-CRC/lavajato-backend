/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `TipoVeiculo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TipoVeiculo_nome_key" ON "TipoVeiculo"("nome");
