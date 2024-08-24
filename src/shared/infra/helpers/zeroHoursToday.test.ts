import {
  describe, it, expect, vi,
} from 'vitest';
import getStartOfToday from './zeroHoursToday';

describe('getStartOfToday', () => {
  it('deve retornar a data do início do dia com hora 00:00:00.000', () => {
    const result = getStartOfToday();
    const now = new Date();

    // Cria uma nova data representando o início do dia atual
    const expected = new Date(now.setHours(0, 0, 0, 0));

    // Verifica se o resultado é uma instância de Date
    expect(result).toBeInstanceOf(Date);

    // Verifica se a hora, minuto, segundo e milissegundo são zero
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);

    // Verifica se o resultado é igual à data esperada
    expect(result.getTime()).toBe(expected.getTime());
  });

  it('deve retornar a data do início do dia no formato correto para uma data específica', () => {
    // Define uma data fixa para testar
    const fixedDate = new Date('2024-08-12T15:30:00Z');
    const fixedStartOfDay = new Date(fixedDate.setHours(0, 0, 0, 0));

    // Mocka a função Date para retornar a data fixa
    const originalDate = global.Date;
    global.Date = vi.fn(() => fixedDate) as unknown as typeof Date;

    const result = getStartOfToday();

    // Restaura a função Date original
    global.Date = originalDate;

    expect(result.getTime()).toBe(fixedStartOfDay.getTime());
  });
});
