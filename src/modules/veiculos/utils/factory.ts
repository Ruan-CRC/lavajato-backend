import VeiculoController from '../infra/http/controller/veiculoController';
import CreateVeiculoService from '../services/createVeiculoService';
import VeiculoRepository from '../infra/repositories/veiculoRepositorie';
import GetVeiculoService from '../services/getVeiculoService';

export default class VeiculoFactory {
  static createVeiculoController() {
    const veiculoRepository = new VeiculoRepository();
    const createVeiculoService = new CreateVeiculoService(veiculoRepository);
    const getVeiculoService = new GetVeiculoService(veiculoRepository);
    return new VeiculoController(createVeiculoService, getVeiculoService);
  }
}
