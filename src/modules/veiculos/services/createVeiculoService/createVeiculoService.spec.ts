import {
  describe, it, beforeEach, expect,
} from 'vitest';
import CreateVeiculoService from './createVeiculoService';
import { VeiculoInterface } from '../../interfaces/veiculoInterface';

describe('CreateVeiculoService', () => {
  let createVeiculoService: CreateVeiculoService;
  let mockUsersRepository: jest.Mocked<VeiculoInterface>;

  beforeEach(() => {
    mockUsersRepository = {
      index: jest.fn(),
      all: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    createVeiculoService = new CreateVeiculoService(mockUsersRepository);
  });

  it.skip('deve criar um novo veículo com sucesso', async () => {
    mockUsersRepository.create.mockResolvedValue('1');
    const veiculo = await createVeiculoService.create({
      placa: 'ABC-1234',
      tipo: 'carro',
    }, { id: 1 });

    expect(veiculo).toBe('1');
  });

  it.skip('veiculo já registrado', async () => {
    mockUsersRepository.create.mockResolvedValue(false);
    const veiculo = await createVeiculoService.create({
      placa: 'ABC-1234',
      tipo: 'carro',
    }, { id: 1 });

    expect(veiculo).toBe('Error creating veiculo');
  });
});
