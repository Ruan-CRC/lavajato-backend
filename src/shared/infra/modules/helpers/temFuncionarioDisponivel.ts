import prisma from '../../prisma/prisma';

async function temFuncionarioDisponivel(dataInicio: Date, dataFim: Date): Promise<number[]> {
  const funcionariosDisponiveis = await prisma.funcionario.findMany({
    where: {
      agendas: {
        none: {
          OR: [
            {
              dataInicio: {
                lte: dataFim,
              },
              dataFim: {
                gte: dataInicio,
              },
            },
          ],
        },
      },
    },
    select: {
      id: true,
    },
  });

  return funcionariosDisponiveis.map((funcionario) => funcionario.id);
}

export default temFuncionarioDisponivel;
