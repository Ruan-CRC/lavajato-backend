import {
  describe, it, expect, vi,
  beforeAll,
} from 'vitest';
import { container } from 'tsyringe';
import AddServicosService from './addServicos';
import { ServicoVeiculoInterface } from '../../interfaces/servicoVeiculoInterface';
import { AgendaOutput } from '../../entities/agenda.d';

const mockServicoVeiculoInterface: ServicoVeiculoInterface = {
  addServicos: vi.fn(async (agenda) => agenda),
  updateServico: vi.fn(),
  getServicosEmAgendamento: vi.fn(),
};

vi.mock('../../entities/agenda', () => ({
  default: vi.fn().mockImplementation((props) => ({
    getEntidade: () => props,
  })),
}));

describe('AddServicosService', () => {
  beforeAll(() => {
    container.registerInstance('ServicoVeiculoInterface', mockServicoVeiculoInterface);
  });

  it('deve adicionar serviços à agenda e retornar a agenda atualizada', async () => {
    const addServicosService = container.resolve(AddServicosService);

    const input: AgendaOutput = {
      id: '9d22abe9-5837-4153-8795-7d48aee70951',
      veiculoId: 1,
      servicoIds: [1, 2, 3],
      dataInicio: new Date('2024-08-12T10:00:00Z'),
      dataFim: new Date('2024-08-12T12:00:00Z'),
    };

    const result = await addServicosService.add(input);

    expect(mockServicoVeiculoInterface.addServicos).toHaveBeenCalledWith(input);
    expect(result).toEqual(input);
  });
});
