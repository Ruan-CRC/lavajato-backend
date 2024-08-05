import { Request, Response } from 'express';

import { z } from 'zod';
import validaDataWhitSchemaZod from '@/shared/infra/helpers/parserZod';

import UpdateServicoService from '@/modules/agenda/services/updateServicos/updateServicoService';
import AddServicosService from '@/modules/agenda/services/addServicos/addServicos';
import ServicosAgendados from '@/modules/agenda/services/servicosAgendados/servicosAgendados';

import { amqpInstance } from '@/shared/core/server';
import { BadRequestError, NotFoundError } from '@/shared/infra/middlewares/errorAbst';
import ValidaAgenda from '@/modules/agenda/services/validaAgenda/validaAgenda';
import { AgendaError } from '../../../entities/agenda.d';

export default class ServicoVeiculoController {
  private validaAgenda: ValidaAgenda;

  constructor(
    private updateServico: UpdateServicoService,
    private addServicoService: AddServicosService,
    private servicosAgendados: ServicosAgendados,
  ) {
    this.validaAgenda = new ValidaAgenda();
  }

  async servicosEmAgendamento(request: Request, response: Response) {
    const allAgendas = await this.servicosAgendados.servicosAgendados();

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

  async update(request: Request, response: Response) {
    const {
      idVeiculo, idServico, dataInicio, dataFim,
    } = request.body;

    const servico = await this.updateServico.update(idVeiculo, idServico, dataInicio, dataFim);

    return response.status(200).json({ servico });
  }

  async addServico(request: Request, response: Response) {
    try {
      validaDataWhitSchemaZod(z.object({
        veiculoId: z.number(),
        servicoIds: z.array(z.number()),
        dataInicio: z.string(),
      }), request.body);

      const servico = await this.validaAgenda.add(request.body);

      if (this.isAgendaError(servico)) {
        if (servico.hasError) {
          throw new BadRequestError({
            type: 'validation_error',
            errors: servico.message?.map((message) => ({
              title: 'validation_error',
              detail: message,
              instance: 'agenda/create',
            })) || [],
          });
        }
      }

      const isPublished = await amqpInstance
        .publishInQueue(process.env.RABBITMQ_AGENDA_QUEUE, request.body);

      if (!isPublished) {
        return response.status(400);
      }

      return response.status(200).json({ message: 'Serviço solicitado!' });
    } catch (error) {
      console.log(error);
    }
  }

  isAgendaError(servico: boolean | AgendaError): servico is AgendaError {
    return (servico as AgendaError).hasError !== undefined;
  }
}
