import ServicoVeiculoController from '../infra/http/controller/servicoVeiculoController';
import VeiculoServicosRepository from '../infra/repositories/veiculo-servicos-repositories';
import UpdateServicoService from '../services/updateServicoService';

export default class ServicoVeiculoFactory {
  static createServicoVeiculoController() {
    const repositorie = new VeiculoServicosRepository();
    const service = new UpdateServicoService(repositorie);
    const servicoVeiculoController = new ServicoVeiculoController(service);

    return servicoVeiculoController;
  }
}
