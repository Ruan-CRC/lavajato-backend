import { container } from 'tsyringe';
import CreateFuncionarioService from '../services/create/createFuncionarioService';
import FuncionarioRepository from '../infra/repositories/funcionarioRepositories';

container.register('FuncionarioInterface', {
  useClass: FuncionarioRepository,
});

// eslint-disable-next-line import/prefer-default-export
export const createFuncionarioService = container.resolve(CreateFuncionarioService);
