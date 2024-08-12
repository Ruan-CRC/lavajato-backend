import {
  describe, it, beforeEach, expect,
} from 'vitest';
import GetVeiculoService from './getVeiculoService';
import { VeiculoInterface } from '../../interfaces/veiculoInterface';

describe('GetVeiculoService', () => {
  let getVeiculoService: GetVeiculoService;
  let mockUsersRepository: jest.Mocked<VeiculoInterface>;

  beforeEach(() => {
    mockUsersRepository = {
      index: jest.fn(),
      all: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    getVeiculoService = new GetVeiculoService(mockUsersRepository);
  });

  it.skip('deve criar um novo veículo com sucesso', async () => {
    mockUsersRepository.index.mockResolvedValue({
      id: '1',
      placa: 'AVF-1245',
      tipo: 'carro',
      userId: 1,
    });
    const veiculo = await getVeiculoService.get('1');

    expect(veiculo).toBe({
      id: '1',
      placa: 'AVF-1245',
      tipo: 'carro',
      userId: 1,
    });
  });

  it.skip('veiculo já registrado', async () => {
    mockUsersRepository.index.mockResolvedValue(false);
    const veiculo = await getVeiculoService.get('1');

    expect(veiculo).toBe('veiculo não encontrado');
  });
});
