import { VeiculoServico } from '@prisma/client';
import { ServicoVeiculoInterface } from '../../interfaces/servicoVeiculoInterface';
import prisma from '@/shared/infra/prisma/prisma';

export default class VeiculoServicosRepository implements ServicoVeiculoInterface {
  async getServicosEmAgendamento(): Promise<{
    veiculoId: number; servicoId: number; dataInicio: Date; dataFim: Date | null;
  }[]> {
    const servicosEmAgendamento = await prisma.veiculoServico.findMany({
      where: {
        dataFim: null,
      },
    });
    return servicosEmAgendamento;
  }

  async updateServico(
    idVeiculo: number,
    idServico: number,
    dataInicio: string,
    dataFim?: string,
  ): Promise<VeiculoServico> {
    const servico = await prisma.veiculoServico.update({
      where: {
        veiculoId_servicoId_dataInicio: {
          veiculoId: idVeiculo,
          servicoId: idServico,
          dataInicio,
        },
      },
      data: {
        dataInicio,
        dataFim,
      },
    });

    return {
      veiculoId: servico.veiculoId,
      servicoId: servico.servicoId,
      dataInicio: servico.dataInicio,
      dataFim: servico.dataFim,
    };
  }

  async addServicos(veiculoId: number, servicoId: number): Promise<any> {
    const agenda = await prisma.veiculoServico.create({
      data: {
        veiculoId,
        servicoId,
        dataInicio: new Date(),
      },
    });

    return agenda;
  }
}
