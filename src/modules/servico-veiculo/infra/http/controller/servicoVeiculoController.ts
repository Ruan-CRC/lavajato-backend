import { Request, Response } from 'express';

import UpdateServicoService from '@/modules/servico-veiculo/services/updateServicoService';

export default class ServicoVeiculoController {
  constructor(private updateServico: UpdateServicoService) {}

  async update(request: Request, response: Response) {
    const {
      idVeiculo, idServico, dataInicio, dataFim,
    } = request.body;

    const servico = await this.updateServico.update(idVeiculo, idServico, dataInicio, dataFim);

    return response.status(200).json({ servico });
  }
}
