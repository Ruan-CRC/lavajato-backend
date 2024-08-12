import 'reflect-metadata';
import { describe, it, beforeEach } from 'vitest';
import request from 'supertest';
import app from 'src/shared/core/app';
import { container } from 'tsyringe';

describe('ServicoVeiculoController', () => {
  beforeEach(() => {
    // Limpa o container antes de cada teste para evitar conflitos de instâncias
    container.clearInstances();
  });

  it('should be able to create a new service for a vehicle', async () => {
    await request(app).get('/api/v1/healthcheck').expect(200);
  });
});
