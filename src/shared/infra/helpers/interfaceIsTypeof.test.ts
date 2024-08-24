import { describe, it, expect } from 'vitest';
import itIsTypeofThatInterface from './interfaceIsTypeof';

interface TestInterface {
  id: number;
  name: string;
}

describe('itIsTypeofThatInterface', () => {
  it('deve retornar true se a propriedade existir no objeto e o tipo for correspondente', () => {
    const obj = {
      id: 1,
      name: 'Test',
    };

    const result = itIsTypeofThatInterface<TestInterface>(obj, 'name');

    expect(result).toBe(true);
  });

  it('deve retornar false se a propriedade não existir no objeto', () => {
    const obj = {
      id: 1,
    };

    const result = itIsTypeofThatInterface<TestInterface>(obj, 'name');

    expect(result).toBe(false);
  });

  it('deve retornar false se a propriedade não estiver no objeto', () => {
    const obj = {
      id: 1,
      age: 25,
    };

    const result = itIsTypeofThatInterface<TestInterface>(obj, 'name');

    expect(result).toBe(false);
  });
});
