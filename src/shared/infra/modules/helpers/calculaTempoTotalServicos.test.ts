import {
  describe, it, expect, vi,
} from 'vitest';
import ServicoRepository from '@/modules/servicos/infra/repositories/servicosRepositorie';
import calculaTempoTotalServicos from './calculaTempoTotalServicos';

vi.mock('@/modules/servicos/infra/repositories/servicosRepositorie');

describe('calculaTempoTotalServicos', () => {
  it('deve calcular o tempo total corretamente com base nos serviços', async () => {
    const mockServicos = [
      {
        servicoValor: [{ tempo: 30 }, { tempo: 45 }],
      },
      {
        servicoValor: [{ tempo: 60 }],
      },
      {
        servicoValor: [{ tempo: 20 }, { tempo: 10 }],
      },
    ];

    (ServicoRepository.prototype.getById as vi.Mock).mockResolvedValue(mockServicos);

    const servicosIds = [1, 2, 3];
    const resultado = await calculaTempoTotalServicos(servicosIds);

    const tempoTotalEsperado = 30 + 45 + 60 + 20 + 10;

    expect(resultado).toBe(tempoTotalEsperado);
  });

  it('deve retornar 0 se não houver serviços', async () => {
    (ServicoRepository.prototype.getById as vi.Mock).mockResolvedValue([]);

    const servicosIds: number[] = [];
    const resultado = await calculaTempoTotalServicos(servicosIds);

    expect(resultado).toBe(0);
  });

  it('deve retornar 0 se os serviços não tiverem valores de tempo', async () => {
    const mockServicos = [
      {
        servicoValor: [{ tempo: 0 }],
      },
      {
        servicoValor: [{ tempo: 0 }],
      },
    ];

    (ServicoRepository.prototype.getById as vi.Mock).mockResolvedValue(mockServicos);

    const servicosIds = [1, 2];
    const resultado = await calculaTempoTotalServicos(servicosIds);

    expect(resultado).toBe(0);
  });

  it('deve lidar com erros de serviço', async () => {
    (ServicoRepository.prototype.getById as vi.Mock).mockRejectedValue(new Error('Erro ao obter serviços'));

    const servicosIds = [1, 2];

    await expect(calculaTempoTotalServicos(servicosIds)).rejects.toThrow('Erro ao obter serviços');
  });
});
