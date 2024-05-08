import VeiculoController from '../infra/http/controller/veiculoController';
import CreateVeiculoService from '../services/createVeiculo';
import VeiculoRepository from '../infra/repositories/veiculoRepositorie';

export default class VeiculoFactory {
  static createVeiculoController() {
    const veiculoRepository = new VeiculoRepository();
    const createVeiculoService = new CreateVeiculoService(veiculoRepository);
    return new VeiculoController(createVeiculoService);
  }
}
