import { ServicoVeiculoInterface } from '../interfaces/servicoVeiculoInterface';
import Agenda from '../entities/agenda';
import { CreateInputDTO, CreateOutputDTO } from '../DTOs/createDTO';

export default class AddServicosService {
  constructor(private servicoVeiculoInterface: ServicoVeiculoInterface) { }

  async add(props: CreateInputDTO): Promise<CreateOutputDTO> {
    // TODO: validacao de veiculo e servico

    const { veiculoId, servicoId, dataInicio } = props;

    const agenda = new Agenda({ veiculoId, servicoId, dataInicio });

    const servico = await this.servicoVeiculoInterface
      .addServicos(agenda.getEntite());
    return servico;
  }
}
