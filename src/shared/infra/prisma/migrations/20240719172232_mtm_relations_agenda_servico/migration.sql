-- DropForeignKey
ALTER TABLE "Servico" DROP CONSTRAINT "Servico_agendaId_fkey";

-- CreateTable
CREATE TABLE "_AgendaToServico" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AgendaToServico_AB_unique" ON "_AgendaToServico"("A", "B");

-- CreateIndex
CREATE INDEX "_AgendaToServico_B_index" ON "_AgendaToServico"("B");

-- AddForeignKey
ALTER TABLE "_AgendaToServico" ADD CONSTRAINT "_AgendaToServico_A_fkey" FOREIGN KEY ("A") REFERENCES "veiculos_servicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgendaToServico" ADD CONSTRAINT "_AgendaToServico_B_fkey" FOREIGN KEY ("B") REFERENCES "Servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;
