import CreateVeiculoService from '../createVeiculoService';
import { CreateVeiculoInterface } from '../../interfaces/createVeiculoInterface';

describe('CreateVeiculoService', () => {
  let createVeiculoService: CreateVeiculoService;
  let mockUsersRepository: jest.Mocked<CreateVeiculoInterface>;

  beforeEach(() => {
    mockUsersRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    createVeiculoService = new CreateVeiculoService(mockUsersRepository);
  });

  it('deve criar um novo veículo com sucesso', async () => {
    mockUsersRepository.create.mockResolvedValue('1');
    const veiculo = await createVeiculoService.create({
      placa: 'ABC-1234',
      tipo: 'carro',
    }, { id: 1 });

    expect(veiculo).toBe('1');
  });

  it('veiculo já registrado', async () => {
    mockUsersRepository.create.mockResolvedValue(false);
    const veiculo = await createVeiculoService.create({
      placa: 'ABC-1234',
      tipo: 'carro',
    }, { id: 1 });

    expect(veiculo).toBe('Error creating veiculo');
  });
});
