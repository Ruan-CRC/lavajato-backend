/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-syntax */
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  for (const dat of data) {
    const res = http.post('http://localhost:3333/api/v1/agenda/create', JSON.stringify(dat), {
      headers: { 'Content-Type': 'application/json' },
    });

    check(res, {
      'status is 200': (r) => r.status === 200,
      'resposta é agendado': (r) => r.json().message === 'Serviço solicitado!',
    });
  }
}

const data = [
  {
    veiculoId: 3,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-05T18:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-05T20:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-05T22:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-06T00:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-06T02:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-06T04:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-06T06:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-06T08:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-06T10:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-06T12:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-06T14:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-06T16:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-06T18:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-06T20:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-06T22:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-07T00:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-07T02:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-07T04:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-07T06:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-07T08:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-07T10:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-07T12:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-07T14:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-07T16:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-07T18:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-07T20:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-07T22:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-08T00:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-08T02:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-08T04:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-08T06:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-08T08:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-08T10:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-08T12:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-08T14:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-08T16:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-08T18:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-08T20:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-08T22:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-09T00:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-09T02:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-09T04:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-09T06:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-09T08:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-09T10:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-09T12:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-09T14:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-09T16:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-09T18:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-09T20:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-09T22:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-10T00:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-10T02:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-10T04:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-10T06:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-10T08:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-10T10:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-10T12:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-10T14:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-10T16:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-10T18:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-10T20:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-10T22:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-11T00:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-11T02:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-11T04:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-11T06:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-11T08:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-11T10:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-11T12:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-11T14:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-11T16:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-11T18:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-11T20:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-11T22:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-12T00:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-12T02:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-12T04:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-12T06:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-12T08:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-12T10:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-12T12:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-12T14:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-12T16:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-12T18:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-12T20:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-12T22:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-13T00:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-13T02:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-13T04:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-13T06:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-13T08:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-13T10:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-13T12:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-13T14:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-13T16:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-13T18:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-13T20:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-13T22:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-14T00:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-14T02:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-14T04:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-14T06:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-14T08:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-14T10:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-14T12:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-14T14:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-14T16:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-14T18:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-14T20:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-14T22:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-15T00:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-15T02:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-15T04:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-15T06:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-15T08:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-15T10:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-15T12:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-15T14:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-15T16:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-15T18:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-15T20:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-15T22:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-16T00:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-16T02:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-16T04:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-16T06:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-16T08:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-16T10:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-16T12:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-16T14:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-16T16:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-16T18:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-16T20:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-16T22:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-17T00:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-17T02:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-17T04:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-17T06:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-17T08:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-17T10:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-17T12:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-17T14:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-17T16:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-17T18:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-17T20:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-17T22:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-18T00:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-18T02:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-18T04:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-18T06:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-18T08:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-18T10:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-18T12:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-18T14:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-18T16:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-18T18:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-18T20:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-18T22:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-19T00:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-19T02:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-19T04:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-19T06:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-19T08:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-19T10:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-19T12:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-19T14:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-19T16:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-19T18:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-19T20:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-19T22:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-20T00:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-20T02:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-20T04:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-20T06:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-20T08:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-20T10:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-20T12:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-20T14:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-20T16:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-20T18:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-20T20:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-20T22:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-21T00:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-21T02:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-21T04:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-21T06:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-21T08:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-21T10:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-21T12:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-21T14:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-21T16:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-21T18:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-21T20:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-21T22:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-22T00:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-22T02:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-22T04:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-22T06:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-22T08:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-22T10:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-22T12:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-22T14:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-22T16:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-22T18:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-22T20:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-22T22:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-23T00:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-23T02:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-23T04:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-23T06:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-23T08:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-23T10:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-23T12:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-23T14:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-23T16:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-23T18:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-23T20:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-23T22:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-24T00:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-24T02:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-24T04:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-24T06:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-24T08:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-24T10:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-24T12:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-24T14:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-24T16:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-24T18:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-24T20:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-24T22:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-25T00:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-25T02:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-25T04:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-25T06:02:28.958Z',
  },
  {
    veiculoId: 2,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-25T08:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-25T10:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-25T12:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-25T14:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-25T16:02:28.958Z',
  },
  {
    veiculoId: 1,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-25T18:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-25T20:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-25T22:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-26T00:02:28.958Z',
  },
  {
    veiculoId: 7,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-26T02:02:28.958Z',
  },
  {
    veiculoId: 6,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-26T04:02:28.958Z',
  },
  {
    veiculoId: 5,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-26T06:02:28.958Z',
  },
  {
    veiculoId: 8,
    servicoIds: [
      1,
    ],
    dataInicio: '2024-08-26T08:02:28.958Z',
  },
  {
    veiculoId: 3,
    servicoIds: [
      2,
    ],
    dataInicio: '2024-08-26T10:02:28.958Z',
  },
  {
    veiculoId: 4,
    servicoIds: [
      3,
    ],
    dataInicio: '2024-08-26T12:02:28.958Z',
  },
];
