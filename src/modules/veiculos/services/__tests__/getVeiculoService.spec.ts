import GetVeiculoService from '../getVeiculoService';
import { CreateVeiculoInterface } from '../../interfaces/createVeiculoInterface';

describe('GetVeiculoService', () => {
  let getVeiculoService: GetVeiculoService;
  let mockUsersRepository: jest.Mocked<CreateVeiculoInterface>;

  beforeEach(() => {
    mockUsersRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    getVeiculoService = new GetVeiculoService(mockUsersRepository);
  });

  it('deve criar um novo veículo com sucesso', async () => {
    mockUsersRepository.findById.mockResolvedValue({
      id: '1',
      placa: 'AVF-1245',
      tipo: 'carro',
      userId: 1,
    });
    const veiculo = await getVeiculoService.get('1');

    expect(veiculo).toBe('1');
  });

  it('veiculo já registrado', async () => {
    mockUsersRepository.findById.mockResolvedValue(false);
    const veiculo = await getVeiculoService.get('1');

    expect(veiculo).toBe('veiculo não encontrado');
  });
});
