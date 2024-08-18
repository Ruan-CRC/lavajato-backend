import prisma from '../../prisma/prisma';

async function temFuncionarioDisponivel(dataInicio: Date, dataFim: Date): Promise<number[]> {
  const funcionariosComConflito = await prisma.agenda.findMany({
    where: {
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
    select: {
      funcionarioId: true,
    },
  });

  const idsComConflito = funcionariosComConflito.map((agenda) => agenda.funcionarioId);

  const funcionariosDisponiveis = await prisma.funcionario.findMany({
    where: {
      id: {
        notIn: idsComConflito,
      },
    },
    select: {
      id: true,
    },
  });

  return funcionariosDisponiveis.map((funcionario) => funcionario.id);
}

export default temFuncionarioDisponivel;
