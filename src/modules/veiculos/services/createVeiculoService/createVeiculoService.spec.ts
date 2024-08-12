import {
  describe, it, expect, vi,
} from 'vitest';
import CreateVeiculoService from './createVeiculoService';
import { VeiculoInterface } from '../../interfaces/veiculoInterface';
import { VeiculoImputDTO, UserImputDTO } from '../DTOs/mainFunctions';

const veiculoInterfaceMock: Partial<VeiculoInterface> = {
  create: vi.fn(),
};

describe('CreateVeiculoService', () => {
  it('deve criar um veículo e retornar o ID quando a criação for bem-sucedida', async () => {
    const dataVeiculo: VeiculoImputDTO = { placa: 'ABC1234', tipo: 'Carro' };
    const dataUser: UserImputDTO = { id: 1 };

    const idVeiculoSimulado = '123456';
    (veiculoInterfaceMock.create as vi.Mock).mockResolvedValue(idVeiculoSimulado);

    const veiculoService = new CreateVeiculoService(veiculoInterfaceMock as VeiculoInterface);

    const resultado = await veiculoService.create(dataVeiculo, dataUser);

    expect(resultado).toBe(idVeiculoSimulado);
    expect(veiculoInterfaceMock.create).toHaveBeenCalledWith({
      placa: dataVeiculo.placa,
      tipo: dataVeiculo.tipo,
      user: dataUser.id,
    });
  });

  it('deve retornar uma mensagem de erro quando a criação do veículo falhar', async () => {
    const dataVeiculo: VeiculoImputDTO = { placa: 'XYZ9876', tipo: 'Moto' };
    const dataUser: UserImputDTO = { id: 2 };

    (veiculoInterfaceMock.create as vi.Mock).mockResolvedValue(null);

    const veiculoService = new CreateVeiculoService(veiculoInterfaceMock as VeiculoInterface);

    const resultado = await veiculoService.create(dataVeiculo, dataUser);

    expect(resultado).toBe('Error creating veiculo');
  });

  it('deve lidar com erros ao criar o veículo', async () => {
    const dataVeiculo: VeiculoImputDTO = { placa: 'LMN4567', tipo: 'Caminhão' };
    const dataUser: UserImputDTO = { id: 3 };

    (veiculoInterfaceMock.create as vi.Mock).mockRejectedValue(new Error('Erro ao criar veículo'));

    const veiculoService = new CreateVeiculoService(veiculoInterfaceMock as VeiculoInterface);

    await expect(veiculoService.create(dataVeiculo, dataUser)).rejects.toThrow('Erro ao criar veículo');
  });
});
