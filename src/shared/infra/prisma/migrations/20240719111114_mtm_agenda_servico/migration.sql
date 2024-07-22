/*
  Warnings:

  - You are about to drop the `_AgendaToServico` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AgendaToServico" DROP CONSTRAINT "_AgendaToServico_A_fkey";

-- DropForeignKey
ALTER TABLE "_AgendaToServico" DROP CONSTRAINT "_AgendaToServico_B_fkey";

-- DropTable
DROP TABLE "_AgendaToServico";

-- CreateTable
CREATE TABLE "AgendaServico" (
    "agendaId" TEXT NOT NULL,
    "servicoId" INTEGER NOT NULL,

    CONSTRAINT "AgendaServico_pkey" PRIMARY KEY ("agendaId","servicoId")
);

-- AddForeignKey
ALTER TABLE "AgendaServico" ADD CONSTRAINT "AgendaServico_agendaId_fkey" FOREIGN KEY ("agendaId") REFERENCES "veiculos_servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgendaServico" ADD CONSTRAINT "AgendaServico_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
