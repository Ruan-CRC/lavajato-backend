import { Request, Response } from 'express';

import { z } from 'zod';
import validaDataWhitSchemaZod from '@/shared/infra/helpers/parserZod';

import UpdateServicoService from '@/modules/agenda/services/updateServicos/updateServicoService';
import AddServicosService from '@/modules/agenda/services/addServicos/addServicos';
import ServicosAgendados from '@/modules/agenda/services/servicosAgendados/servicosAgendados';

import { amqpInstance } from '@/shared/core/server';
import { NotFoundError } from '@/shared/infra/middlewares/errorAbst';

export default class ServicoVeiculoController {
  constructor(
    private updateServico: UpdateServicoService,
    private addServicoService: AddServicosService,
    private servicosAgendados: ServicosAgendados,
  ) { }

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
    validaDataWhitSchemaZod(z.object({
      veiculoId: z.string(),
      servicoIds: z.string(),
      dataInicio: z.string(),
    }), request.body);

    const isPublished = await amqpInstance
      .publishInQueue(process.env.RABBITMQ_AGENDA_QUEUE, request.body);

    if (!isPublished) {
      return response.status(400);
    }

    return response.status(200).json({ message: 'Serviço adicionado com sucesso!' });
  }
}
