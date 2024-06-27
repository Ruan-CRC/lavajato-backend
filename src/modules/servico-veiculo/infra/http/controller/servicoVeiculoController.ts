import { Request, Response } from 'express';

import UpdateServicoService from '@/modules/servico-veiculo/services/updateServicoService';
import AddServicosService from '@/modules/servico-veiculo/services/addServicos';
import ServicosAgendados from '@/modules/servico-veiculo/services/servicosAgendados';

export default class ServicoVeiculoController {
  constructor(
    private updateServico: UpdateServicoService,
    private addServicoService: AddServicosService,
    private servicosAgendados: ServicosAgendados,
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

  async addServico(req: Request, res: Response) {
    const { veiculoId, servicoId } = req.body;

    try {
      const servico = await this.addServicoService.add(veiculoId, servicoId);

      return res.status(201).json({ message: 'Serviço adicionado com sucesso!', servico });
    } catch (err) {
      return res.status(404).json({ error: (err as Error).message });
    }
  }
}
