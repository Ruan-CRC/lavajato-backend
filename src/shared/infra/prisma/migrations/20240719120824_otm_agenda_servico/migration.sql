/*
  Warnings:

  - You are about to drop the `AgendaServico` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `agendaId` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AgendaServico" DROP CONSTRAINT "AgendaServico_agendaId_fkey";

-- DropForeignKey
ALTER TABLE "AgendaServico" DROP CONSTRAINT "AgendaServico_servicoId_fkey";

-- AlterTable
ALTER TABLE "Servico" ADD COLUMN     "agendaId" TEXT NOT NULL;

-- DropTable
DROP TABLE "AgendaServico";

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_agendaId_fkey" FOREIGN KEY ("agendaId") REFERENCES "veiculos_servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
