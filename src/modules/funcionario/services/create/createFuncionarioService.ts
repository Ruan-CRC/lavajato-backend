import { decorators } from 'tsyringe';
import { FuncionarioInterface, CreateFuncionario } from '../../interfaces/funcionariosInteraface';

const { injectable, inject } = decorators;

@injectable()
export default class CreateFuncionarioService {
  constructor(
    @inject('FuncionarioInterface') private funcionarioInterface: FuncionarioInterface,
  ) {}

  async main(props: CreateFuncionario) {
    await this.funcionarioInterface.create(props);
  }
}
