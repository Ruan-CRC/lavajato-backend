import { UpdateServicosInterface } from '../interfaces/updateServico';

export default class UpdateServicoService {
  constructor(private updateServico: UpdateServicosInterface) {}

  async update(idVeiculo: number, idServico: number, dataInicio: string, dataFim?: string) {
    const servico = await this.updateServico
      .updateServico(idVeiculo, idServico, dataInicio, dataFim);

    return {
      servicoId: servico.servicoId,
      veiculoId: servico.veiculoId,
      dataInicio: servico.dataInicio,
      dataFim: servico.dataFim,
    };
  }
}
