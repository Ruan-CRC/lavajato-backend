import {
  describe, it, expect, afterEach, beforeEach, vi,
} from 'vitest';
import ValidaAgenda from './validaAgenda';
import { AgendaCreateInputDTO } from '../../entities/agenda.d';

describe('ValidaAgenda', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  it('deve retornar erro quando a agenda é criada fora do horário de expediente', async () => {
    const validaAgenda = new ValidaAgenda();

    const input: AgendaCreateInputDTO = {
      veiculoId: 1,
      servicoIds: [1, 2],
      dataInicio: new Date('2024-08-12T07:00:00Z'),
    };

    const result = validaAgenda.main(input);

    expect(result).toEqual({
      hasError: true,
      message: ['Horário fora do expediente'],
    });
  });

  it('deve retornar true quando a agenda é criada dentro do horário de expediente', async () => {
    const validaAgenda = new ValidaAgenda();

    const input: AgendaCreateInputDTO = {
      veiculoId: 1,
      servicoIds: [1, 2],
      dataInicio: new Date('2024-08-12T10:00:00Z'),
    };

    const result = validaAgenda.main(input);

    expect(result).toBeTypeOf('string');
  });
});
