import ServicoController from '../infra/http/controller/servicosController';
import ServicoRepository from '../infra/repositories/servicosRepositorie';
import CreateServicoService from '../services/createServicos/createServicoServices';
import AllService from '../services/allServicos';

export default class ServicoFactory {
  static createServicoController() {
    const servicoRepository = new ServicoRepository();
    const createServicoService = new CreateServicoService(servicoRepository);
    const allService = new AllService(servicoRepository);
    return new ServicoController(createServicoService, allService);
  }
}
