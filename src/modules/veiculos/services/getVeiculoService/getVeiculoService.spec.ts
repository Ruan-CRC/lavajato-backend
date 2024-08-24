import {
  describe, it, expect, vi,
} from 'vitest';
import GetVeiculoService from './getVeiculoService';
import { VeiculoInterface } from '../../interfaces/veiculoInterface';

const veiculoInterfaceMock: Partial<VeiculoInterface> = {
  index: vi.fn(),
};

describe('GetVeiculoService', () => {
  it('deve retornar o veículo quando encontrado', async () => {
    const veiculoMock = {
      id: '1',
      modelo: 'Fusca',
      ano: 1960,
    };

    (veiculoInterfaceMock.index as vi.Mock).mockResolvedValue(veiculoMock);

    const veiculoService = new GetVeiculoService(veiculoInterfaceMock as VeiculoInterface);

    const resultado = await veiculoService.get('1');

    expect(resultado).toEqual(veiculoMock);
  });

  it('deve retornar uma mensagem de erro quando o veículo não for encontrado', async () => {
    (veiculoInterfaceMock.index as vi.Mock).mockResolvedValue(null);

    const veiculoService = new GetVeiculoService(veiculoInterfaceMock as VeiculoInterface);

    const resultado = await veiculoService.get('1');

    expect(resultado).toBe('veiculo não encontrado');
  });

  it('deve lidar com erros ao buscar o veículo', async () => {
    (veiculoInterfaceMock.index as vi.Mock).mockRejectedValue(new Error('Erro ao buscar veículo'));

    const veiculoService = new GetVeiculoService(veiculoInterfaceMock as VeiculoInterface);

    await expect(veiculoService.get('1')).rejects.toThrow('Erro ao buscar veículo');
  });
});
