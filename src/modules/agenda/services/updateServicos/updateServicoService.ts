import { ServicoVeiculoInterface } from '../../interfaces/servicoVeiculoInterface';

export default class UpdateServicoService {
  constructor(private updateServico: ServicoVeiculoInterface) { }

  async update(idVeiculo: number, idServico: number, dataInicio: string, dataFim?: string) {
    const servico = await this.updateServico
      .updateServico(idVeiculo, idServico, dataInicio);

    return {
      servicoId: servico.servicoId,
      veiculoId: servico.veiculoId,
      dataInicio: servico.dataInicio,
      dataFim: servico.dataFim,
    };
  }
}
