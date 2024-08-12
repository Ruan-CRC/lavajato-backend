import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { Request } from 'express';
import validaDataWhitSchemaZod from './parserZod';

describe('validaDataWhitSchemaZod', () => {
  it('deve retornar true para dados válidos', () => {
    const schema = z.object({
      veiculoId: z.number(),
      servicoIds: z.array(z.number()),
      dataInicio: z.string(),
    });

    const requestMock = {
      body: {
        veiculoId: 1,
        servicoIds: [1, 2, 3],
        dataInicio: '2024-08-12T10:00:00Z',
      },
    } as Request;

    const result = validaDataWhitSchemaZod(schema, requestMock.body);

    expect(result).toBe(true);
  });

  it('deve retornar um array de erros para dados inválidos', () => {
    const schema = z.object({
      veiculoId: z.number(),
      servicoIds: z.array(z.number()),
      dataInicio: z.string(),
    });

    const requestMock = {
      body: {
        veiculoId: 'not-a-number',
        servicoIds: [1, 'not-a-number'],
        dataInicio: 12345,
      },
    } as Request;

    const result = validaDataWhitSchemaZod(schema, requestMock.body);

    if (Array.isArray(result)) {
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('message');
    } else {
      throw new Error('Expected an array of errors but received a different type');
    }
  });

  it('deve lidar com erros inesperados corretamente', () => {
    const schema = z.object({
      veiculoId: z.number(),
      servicoIds: z.array(z.number()),
      dataInicio: z.string(),
    });

    const requestMock = {
      body: {} as any,
    } as Request;

    const result = validaDataWhitSchemaZod(schema, requestMock.body);

    if (Array.isArray(result)) {
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('message');
    } else {
      expect(result).toBe(false);
    }
  });
});
