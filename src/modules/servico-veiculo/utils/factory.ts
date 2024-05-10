import ServicoVeiculoController from '../infra/http/controller/servicoVeiculoController';
import VeiculoServicosRepository from '../infra/repositories/veiculo-servicos-repositories';
import AddServicosService from '../services/addServicos';
import UpdateServicoService from '../services/updateServicoService';

export default class ServicoVeiculoFactory {
  static createServicoVeiculoController() {
    const repositorie = new VeiculoServicosRepository();
    const updateService = new UpdateServicoService(repositorie);
    const addService = new AddServicosService(repositorie);
    const servicoVeiculoController = new ServicoVeiculoController(updateService, addService);

    return servicoVeiculoController;
  }
}
