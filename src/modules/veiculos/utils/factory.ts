import VeiculoController from '../infra/http/controller/veiculoController';
import CreateVeiculoService from '../services/createVeiculoService';
import VeiculoRepository from '../infra/repositories/veiculoRepositorie';
import GetVeiculoService from '../services/getVeiculoService';
import AllVeiculosService from '../services/allVeiculosService';

export default class VeiculoFactory {
  static createVeiculoController() {
    const veiculoRepository = new VeiculoRepository();
    const createVeiculoService = new CreateVeiculoService(veiculoRepository);
    const getVeiculoService = new GetVeiculoService(veiculoRepository);
    const allVeiculosService = new AllVeiculosService(veiculoRepository);
    return new VeiculoController(createVeiculoService, getVeiculoService, allVeiculosService);
  }
}
