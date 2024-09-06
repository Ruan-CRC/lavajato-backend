import { Request, Response } from 'express';
import { decorators } from 'tsyringe';
import { z } from 'zod';
import dayjs from 'dayjs';
import { servicosAgendados } from '@/modules/agenda/utils/factory';
import validaDataWhitSchemaZod from '@/shared/infra/helpers/parserZod';
import { amqpInstance } from '@/shared/core/server';
import { BadRequestError, NotFoundError } from '@/shared/infra/middlewares/errorAbst';
import ValidaAgenda from '@/modules/agenda/services/validaAgenda/validaAgenda';

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
      dataInicio: z.number(),
      socket: z.string(),
    }), request.body);

    const {
      veiculoId, servicoIds, dataInicio, socket,
    } = request.body;

    const inTimezoneDataInicio = dayjs(dataInicio).subtract(3, 'hour').toDate();

    const valida = new ValidaAgenda();
    const agendaDadosValidados = await valida.main({
      veiculoId,
      servicoIds,
      dataInicio: inTimezoneDataInicio,
    });

    if (valida.error.hasError === true) {
      throw new BadRequestError({
        type: 'validation_error',
        errors: valida.error.message?.map((message) => ({
          title: 'dados inválidos',
          detail: message,
          instance: 'agenda/create/',
        })) || [],
      });
    }

    const isPublished = await amqpInstance
      .publishInQueue(process.env.RABBITMQ_AGENDA_QUEUE, {
        id: agendaDadosValidados,
        veiculoId,
        servicoIds,
        dataInicio: inTimezoneDataInicio,
        socket,
      });

    if (!isPublished) {
      throw new BadRequestError({
        type: 'fila de serviço',
        errors: [{
          title: 'fila de serviço cheia!',
          detail: 'Tente novamente mais tarde!',
          instance: 'agenda/create/',
        }],
      });
    }

    return response.status(202).json({
      message: 'Serviço solicitado!',
      id: agendaDadosValidados,
    });
  }
}
