import VeiculoRepository from '../infra/repositories/veiculoRepositorie';

export default class GetVeiculoService {
  constructor(private veiculosRepository: VeiculoRepository) { }

  async get(id: string) {
    const veiculo = await this.veiculosRepository.findById(id);

    if (!veiculo) {
      return 'veiculo não encontrado';
    }

    return veiculo;
  }
}
