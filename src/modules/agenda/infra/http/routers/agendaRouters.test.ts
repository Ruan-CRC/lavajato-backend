import request from 'supertest';
import {
  assert, describe, expectTypeOf, it,
} from 'vitest';
import { app } from '@/shared/core/server';
import { AgendasAll } from '@/modules/agenda/interfaces/servicoVeiculoInterface';

describe('GET /user', () => {
  it('retornar um array de dados', () => {
    request(app)
      .get('/api/v1/agenda/servicos-agendos')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expectTypeOf(response.body).toMatchTypeOf<AgendasAll[]>();
      });
  });
});

describe('POST /user', () => {
  it('should return 200 OK', () => {
    request(app)
      .post('/api/v1/agenda/create')
      .send({
        veiculoId: 2,
        servicoIds: [2],
        dataInicio: 'Fri Aug 14 2024 16:59:02 GMT-0300',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        assert.include(response.body, { message: 'Agenda criada com sucesso!' });
      });
  });
});
