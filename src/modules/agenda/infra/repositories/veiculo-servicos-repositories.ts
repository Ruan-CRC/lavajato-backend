import { Agenda } from '@prisma/client';
import { ServicoVeiculoInterface } from '../../interfaces/servicoVeiculoInterface';
import prisma from '@/shared/infra/prisma/prisma';

import getStartOfToday from '@/shared/infra/helpers/zeroHoursToday';
import { CreateInputDTO } from '../../DTOs/createDTO';
import { connect } from 'amqplib';

export default class VeiculoServicosRepository implements ServicoVeiculoInterface {
  async getServicosEmAgendamento(): Promise<{
    id: string;
    veiculoId: number;
    servicoId: number;
    dataInicio: Date;
    dataFim: Date | null;
  }[]> {
    const zeroHoursToday = getStartOfToday();

    const servicosEmAgendamento = await prisma.agenda.findMany({
      where: {
        dataInicio: {
          gte: zeroHoursToday,
        },
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

  async addServicos(props: CreateInputDTO): Promise<any> {
    const { veiculoId, servicoId, dataInicio } = props;

    const agenda = await prisma.agenda.create({
      data: {
        veiculoId,
        dataInicio,
        servicos: {
          create: {
            servico: {
              connect: { id: [3, 5, 7] }
            }
          },
        },
      });

    return agenda;
  }
}
