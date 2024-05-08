import ServicoController from '../infra/http/controller/servicosController';
import ServicoRepository from '../infra/repositories/servicosRepositorie';
import CreateServicoService from '../services/createServicos';

export default class ServicoFactory {
  static createServicoController() {
    const servicoRepository = new ServicoRepository();
    const createServicoService = new CreateServicoService(servicoRepository);
    return new ServicoController(createServicoService);
  }
}
