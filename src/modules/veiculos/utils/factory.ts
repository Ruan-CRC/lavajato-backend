import VeiculoController from '../infra/http/controller/veiculoController';
import CreateVeiculoService from '../services/createVeiculoService/createVeiculoService';
import VeiculoRepository from '../infra/repositories/veiculoRepositorie';
import GetVeiculoService from '../services/getVeiculoService/getVeiculoService';
import AllVeiculosService from '../services/allVeiculosService/allVeiculosService';

export default class VeiculoFactory {
  static createVeiculoController() {
    const veiculoRepository = new VeiculoRepository();
    const createVeiculoService = new CreateVeiculoService(veiculoRepository);
    const getVeiculoService = new GetVeiculoService(veiculoRepository);
    const allVeiculosService = new AllVeiculosService(veiculoRepository);
    return new VeiculoController(createVeiculoService, getVeiculoService, allVeiculosService);
  }
}
