import { container } from 'tsyringe';
import ServicosAgendados from '@/modules/agenda/services/servicosAgendados/servicosAgendados';
import AddServicosService from '@/modules/agenda/services/addServicos/addServicos';

import VeiculoServicosRepository from '../infra/repositories/veiculo-servicos-repositories';

container.register('ServicoVeiculoInterface', {
  useClass: VeiculoServicosRepository,
});

export const servicosAgendados = container.resolve(ServicosAgendados);
export const addServicosService = container.resolve(AddServicosService);
