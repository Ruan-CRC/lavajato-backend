import {
  describe, it, expect, vi,
} from 'vitest';
import { randomUUID } from 'node:crypto';
import Agenda from './agenda';
import { AgendaInput } from './agenda.d';

vi.mock('node:crypto', () => ({
  randomUUID: vi.fn(),
}));

describe('Agenda', () => {
  it('deve criar uma instância de Agenda com UUID gerado automaticamente', () => {
    const mockUUID = '9d22abe9-5837-4153-8795-7d48aee70951';
    (randomUUID as vi.Mock).mockReturnValue(mockUUID);

    const input: AgendaInput = {
      veiculoId: 1,
      servicoIds: [1, 2],
      dataInicio: new Date('2024-08-12T10:00:00Z'),
      dataFim: new Date('2024-08-12T12:00:00Z'),
    };

    const agenda = new Agenda(input);
    const entidade = agenda.getEntidade();

    expect(randomUUID).toHaveBeenCalled();
    expect(entidade.id).toBe(mockUUID);
    expect(entidade.servicoIds).toEqual(input.servicoIds);
    expect(entidade.veiculoId).toBe(input.veiculoId);
    expect(entidade.dataInicio).toEqual(input.dataInicio);
    expect(entidade.dataFim).toEqual(input.dataFim);
  });

  it('deve criar uma instância de Agenda com UUID fornecido', () => {
    (randomUUID as vi.Mock).mockReset();

    const input: AgendaInput = {
      id: '9d22abe9-5837-4153-8795-7d48aee70951',
      veiculoId: 1,
      servicoIds: [1, 2],
      dataInicio: new Date('2024-08-12T10:00:00Z'),
      dataFim: new Date('2024-08-12T12:00:00Z'),
    };

    const agenda = new Agenda(input);
    const entidade = agenda.getEntidade();

    expect(randomUUID).toHaveBeenCalled();
    expect(entidade.id).toBe(input.id);
    expect(entidade.servicoIds).toEqual(input.servicoIds);
    expect(entidade.veiculoId).toBe(input.veiculoId);
    expect(entidade.dataInicio).toEqual(input.dataInicio);
    expect(entidade.dataFim).toEqual(input.dataFim);
  });

  it('deve converter datas de início e fim para objetos Date', () => {
    const input: AgendaInput = {
      veiculoId: 1,
      servicoIds: [1, 2],
      dataInicio: '2024-08-12T10:00:00Z' as unknown as Date,
      dataFim: '2024-08-12T12:00:00Z' as unknown as Date,
    };

    const agenda = new Agenda(input);
    const entidade = agenda.getEntidade();

    expect(entidade.dataInicio).toBeInstanceOf(Date);
    expect(entidade.dataFim).toBeInstanceOf(Date);
  });
});
