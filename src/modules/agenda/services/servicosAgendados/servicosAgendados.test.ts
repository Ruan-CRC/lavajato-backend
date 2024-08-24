import {
  describe, it, expect, vi,
} from 'vitest';
import ServicosAgendados from './servicosAgendados';
import { ServicoVeiculoInterface } from '../../interfaces/servicoVeiculoInterface';

describe('ServicosAgendados', () => {
  it('deve retornar a lista de serviços em agendamento', async () => {
    const servicoVeiculoInterfaceMock: ServicoVeiculoInterface = {
      getServicosEmAgendamento: vi.fn().mockResolvedValue([
        { id: 1, nome: 'Serviço A' },
        { id: 2, nome: 'Serviço B' },
      ]),
      updateServico: vi.fn(),
      addServicos: vi.fn(),
    };

    const servicosAgendados = new ServicosAgendados(servicoVeiculoInterfaceMock);

    const result = await servicosAgendados.servicosAgendados();

    expect(result).toEqual([
      { id: 1, nome: 'Serviço A' },
      { id: 2, nome: 'Serviço B' },
    ]);
    expect(servicoVeiculoInterfaceMock.getServicosEmAgendamento).toHaveBeenCalledOnce();
  });

  it('deve retornar uma lista vazia quando não há serviços em agendamento', async () => {
    const servicoVeiculoInterfaceMock: ServicoVeiculoInterface = {
      getServicosEmAgendamento: vi.fn().mockResolvedValue([]),
      updateServico: vi.fn(),
      addServicos: vi.fn(),
    };

    const servicosAgendados = new ServicosAgendados(servicoVeiculoInterfaceMock);

    const result = await servicosAgendados.servicosAgendados();

    expect(result).toEqual([]);
    expect(servicoVeiculoInterfaceMock.getServicosEmAgendamento).toHaveBeenCalledOnce();
  });
});
