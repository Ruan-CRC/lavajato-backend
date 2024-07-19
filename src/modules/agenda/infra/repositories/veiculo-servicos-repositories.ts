import { Agenda } from '@prisma/client';
import { ServicoVeiculoInterface } from '../../interfaces/servicoVeiculoInterface';
import prisma from '@/shared/infra/prisma/prisma';

import getStartOfToday from '@/shared/infra/helpers/zeroHoursToday';
import { CreateInputDTO, CreateOutputDTO } from '../../DTOs/createDTO';

export default class VeiculoServicosRepository implements ServicoVeiculoInterface {
  async getServicosEmAgendamento(): Promise<CreateOutputDTO[]> {
    const zeroHoursToday = getStartOfToday();

    const agendas = await prisma.agenda.findMany({
      select: {
        id: true,
        veiculoId: true,
        servicos: true,
        dataInicio: true,
        dataFim: true,
      },
      where: {
        dataInicio: {
          gte: zeroHoursToday,
        },
      },
    });

    return agendas;
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

  async addServicos(props: CreateInputDTO): Promise<any> {
    const { veiculoId, servicoId, dataInicio } = props;

    const agenda = await prisma.agenda.create({
      data: {
        veiculoId,
        servicoId,
        dataInicio,
      },
    });

    return agenda;
  }
}
