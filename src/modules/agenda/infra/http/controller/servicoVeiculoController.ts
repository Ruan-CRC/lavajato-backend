import { Request, Response } from 'express';
import { decorators } from 'tsyringe';
import { z } from 'zod';
import { servicosAgendados, validaAgenda } from '@/modules/agenda/utils/factory';
import validaDataWhitSchemaZod from '@/shared/infra/helpers/parserZod';
import itIsTypeofThatInterface from '@/shared/infra/helpers/interfaceIsTypeof';
import { amqpInstance } from '@/shared/core/server';
import { BadRequestError, NotFoundError } from '@/shared/infra/middlewares/errorAbst';
import { AgendaCreateInputDTO, AgendaError } from '../../../entities/agenda.d';

const { injectable } = decorators;

@injectable()
export default class ServicoVeiculoController {
  async servicosEmAgendamento(request: Request, response: Response) {
    const allAgendas = await servicosAgendados.servicosAgendados();

    if (allAgendas.length === 0) {
      throw new NotFoundError({
        errors: [{
          title: 'not_found',
          detail: 'Nenhum serviço agendado!',
          instance: request.baseUrl,
        }],
      });
    }

    return response.status(200).json(allAgendas);
  }

  async addServico(request: Request, response: Response) {
    validaDataWhitSchemaZod(z.object({
      veiculoId: z.number(),
      servicoIds: z.array(z.number()),
      dataInicio: z.string(),
    }), request.body);

    const agendaDadosValidados = await validaAgenda.main(request.body);

    if (itIsTypeofThatInterface<AgendaError>(agendaDadosValidados, 'hasError')) {
      throw new BadRequestError({
        type: 'validation_error',
        errors: agendaDadosValidados.message?.map((message) => ({
          title: 'validation_error',
          detail: message,
          instance: 'agenda/create/',
        })) || [],
      });
    }

    const agenda: AgendaCreateInputDTO = {
      id: agendaDadosValidados,
      veiculoId: request.body.veiculoId,
      servicoIds: request.body.servicoIds,
      dataInicio: request.body.dataInicio,
    };

    const isPublished = await amqpInstance
      .publishInQueue(process.env.RABBITMQ_AGENDA_QUEUE, agenda);

    if (!isPublished) {
      return response.status(400);
    }

    return response.status(200).json({
      message: 'Serviço solicitado!',
      id: agenda.id,
    });
  }
}
