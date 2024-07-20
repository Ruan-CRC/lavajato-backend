/*
  Warnings:

  - Changed the type of `tempo` on the `ServicoMetadados` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ServicoMetadados" DROP COLUMN "tempo",
ADD COLUMN     "tempo" INTEGER NOT NULL;
