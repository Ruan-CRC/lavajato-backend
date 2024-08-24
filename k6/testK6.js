/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

const data = new SharedArray('seedData', (() => {
  // eslint-disable-next-line no-restricted-globals, no-undef
  const f = JSON.parse(open('./seedData.json'));
  return f; // f must be an array[]
}));

export const options = {
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: data.length,
      iterations: 1,
      maxDuration: '1m',
    },
  },
};

export default function () {
  const index = __VU - 1;
  const dat = data[index];

  const body = JSON.stringify(dat);
  const res = http.post('http://localhost:3333/api/v1/agenda/create', body, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'status é 200 ou 400': (r) => ((r.status === 200) || (r.status === 400)),
  });

  // Pause entre as requisições para simular o comportamento de um usuário real
  sleep(1);
}
