import { Agenda } from '@prisma/client';
import { ServicoVeiculoInterface } from '../../interfaces/servicoVeiculoInterface';
import prisma from '@/shared/infra/prisma/prisma';

export default class VeiculoServicosRepository implements ServicoVeiculoInterface {
  async getServicosEmAgendamento(): Promise<{
    id: string; veiculoId: number; servicoId: number; dataInicio: Date; dataFim: Date | null;
  }[]> {
    const servicosEmAgendamento = await prisma.agenda.findMany({
      where: {
        dataFim: null,
      },
    });
    return servicosEmAgendamento;
  }

  async updateServico(
    idServico: string,
    dataInicio?: string,
    dataFim?: string,
  ): Promise<Agenda> {
    const servico = await prisma.agenda.update({
      where: {
        id: idServico,
      },
      data: {
        dataInicio,
        dataFim,
      },
    });

    return {
      id: servico.id,
      veiculoId: servico.veiculoId,
      servicoId: servico.servicoId,
      dataInicio: servico.dataInicio,
      dataFim: servico.dataFim,
    };
  }

  async addServicos(veiculoId: number, servicoId: number, dataInicio?: string): Promise<any> {
    const agenda = await prisma.agenda.create({
      data: {
        veiculoId,
        servicoId,
        dataInicio: dataInicio || new Date(),
      },
    });

    return agenda;
  }
}
