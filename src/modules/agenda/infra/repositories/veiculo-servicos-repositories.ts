import { UUID } from 'node:crypto';
import { Agenda } from '@prisma/client';
import { ServicoVeiculoInterface, AddServicoInput } from '../../interfaces/servicoVeiculoInterface';
import prisma from '@/shared/infra/prisma/prisma';

import getStartOfToday from '@/shared/infra/helpers/zeroHoursToday';

import { AgendaOutput } from '../../entities/agenda.d';

export default class VeiculoServicosRepository implements ServicoVeiculoInterface {
  async getServicosEmAgendamento(): Promise<any[]> {
    const zeroHoursToday = getStartOfToday();

    const agendas = await prisma.agenda.findMany({
      select: {
        id: true,
        veiculoId: true,
        dataInicio: true,
        dataFim: true,
        servicos: {
          select: {
            id: true,
            nome: true,
            servicoValor: {
              select: {
                valor: true,
              },
            },
          },
        },
      },
      where: {
        dataInicio: {
          gte: zeroHoursToday,
        },
      },
    });

    return agendas.map((agenda) => ({
      id: agenda.id,
      veiculoId: agenda.veiculoId,
      dataInicio: agenda.dataInicio,
      dataFim: agenda.dataFim,
      servicos: agenda.servicos.map((servico) => ({
        id: servico.id,
        nome: servico.nome,
        valor: servico.servicoValor[0].valor,
      })),
    }));
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
      dataInicio: servico.dataInicio,
      dataFim: servico.dataFim,
    };
  }

  async addServicos(props: AddServicoInput): Promise<AgendaOutput> {
    const {
      id, veiculoId, servicoIds, dataInicio, dataFim,
    } = props;

    const agenda = await prisma.agenda.create({
      data: {
        id,
        dataInicio,
        dataFim,
        veiculo: {
          connect: {
            id: veiculoId,
          },
        },
        servicos: {
          connect: servicoIds.map((servicoId) => ({ id: servicoId })),
        },
      },
    });

    const output: AgendaOutput = {
      id: agenda.id as UUID,
      veiculoId: agenda.veiculoId,
      servicoIds,
      dataInicio: agenda.dataInicio,
      dataFim: agenda.dataFim,
    };

    return output;
  }
}
