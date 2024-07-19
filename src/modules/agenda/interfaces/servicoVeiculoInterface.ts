import { CreateInputDTO, CreateOutputDTO } from '../DTOs/createDTO';

export interface ServicoVeiculoInterface {
  updateServico(
    idServico: string, dataInicio?: string, dataFim?: string
  ): Promise<CreateOutputDTO>
  addServicos(props: CreateInputDTO): Promise<CreateOutputDTO>
  getServicosEmAgendamento(): Promise<CreateOutputDTO[]>
}
