import { Request, Response } from 'express';

import UpdateServicoService from '@/modules/agenda/services/updateServicoService';
import AddServicosService from '@/modules/agenda/services/addServicos';
import ServicosAgendados from '@/modules/agenda/services/servicosAgendados';
import AmqpInterface from '@/shared/services/rabbitMQ/amqpInterface';

export default class ServicoVeiculoController {
  constructor(
    private updateServico: UpdateServicoService,
    private addServicoService: AddServicosService,
    private servicosAgendados: ServicosAgendados,
    private rabbitmqService: AmqpInterface,
  ) { }

  async servicosEmAgendamento(request: Request, response: Response) {
    const data = await this.servicosAgendados.servicosAgendados();

    return response.status(200).json({ data });
  }

  async update(request: Request, response: Response) {
    const {
      idVeiculo, idServico, dataInicio, dataFim,
    } = request.body;

    const servico = await this.updateServico.update(idVeiculo, idServico, dataInicio, dataFim);

    return response.status(200).json({ servico });
  }

  async addServico(request: Request, response: Response) {
    this.rabbitmqService.publishInQueue(process.env.RABBITMQ_AGENDA_QUEUE, request.body);

    return response.status(200);
  }
}
