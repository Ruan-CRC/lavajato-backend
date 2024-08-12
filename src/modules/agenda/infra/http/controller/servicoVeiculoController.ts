import { Request, Response } from 'express';
import { container, decorators } from 'tsyringe';
import { z } from 'zod';
import validaDataWhitSchemaZod from '@/shared/infra/helpers/parserZod';
import itIsTypeofThatInterface from '@/shared/infra/helpers/interfaceIsTypeof';
import ServicosAgendados from '@/modules/agenda/services/servicosAgendados/servicosAgendados';
import AddServicosService from '@/modules/agenda/services/addServicos/addServicos';
import { amqpInstance } from '@/shared/core/server';
import { BadRequestError, NotFoundError } from '@/shared/infra/middlewares/errorAbst';
import ValidaAgenda from '@/modules/agenda/services/validaAgenda/validaAgenda';
import { AgendaError } from '../../../entities/agenda.d';
import VeiculoServicosRepository from '../../repositories/veiculo-servicos-repositories';

container.register('ServicoVeiculoInterface', {
  useClass: VeiculoServicosRepository,
});

const { injectable } = decorators;
const servicosAgendados = container.resolve(ServicosAgendados);
const addServicosService = container.resolve(AddServicosService);

@injectable()
export default class ServicoVeiculoController {
  constructor(
    private validaAgenda: ValidaAgenda,
  ) {}

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

    const agendaDadosValidados = await this.validaAgenda.main(request.body);

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

    const agenda = await addServicosService.add(request.body);

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
