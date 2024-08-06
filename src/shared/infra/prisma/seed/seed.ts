import { createSeedClient, servicoScalars, veiculoScalars } from '@snaplet/seed';
// eslint-disable-next-line import/no-extraneous-dependencies
import { copycat } from '@snaplet/copycat';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';
import * as http from 'node:http';

const horasEntreServicos = 2;
const veiculosInMemory: veiculoScalars[] = [];
const servicosInMemory: servicoScalars[] = [];

function getRandomIntInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function postData(data: string) {
  const options = {
    hostname: 'localhost',
    port: 3333, // Ou 443 para HTTPS
    path: '/api/v1/agenda/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };

  const req = http.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      console.log('Resposta do backend:', responseData);
    });
  });

  req.on('error', (error) => {
    console.error('Erro na solicitação:', error);
  });

  req.write(data);
  req.end();
}

export default async function main() {
  const seed = await createSeedClient({
    connect: true,
  });
  await seed.$resetDatabase();

  await seed.tipoVeiculo((x) => x(3));
  await seed.user((x) => x(5, (ctx) => ({
    idUser: randomUUID(),
    email: copycat.email(ctx.seed, {
      domain: '@gmail.com',
    }),
    password: '123456',
  })));
  const { veiculo } = await seed.veiculo((x) => x(8));
  const { servico } = await seed.servico((x) => x(3));
  await seed.servicoMetadados((x) => x(12));

  veiculosInMemory.push(...veiculo);
  servicosInMemory.push(...servico);

  let agendamento: Date | number = new Date();
  let i = 250;

  const intervalId = setInterval(async () => {
    if (i === 0) {
      clearInterval(intervalId);
      return;
    }

    const date = new Date(agendamento);
    const formattedDate = dayjs(date).toISOString();

    const veiculoId = veiculosInMemory[getRandomIntInRange(0, veiculosInMemory.length - 1)];
    const servicoId = servicosInMemory[getRandomIntInRange(0, servicosInMemory.length - 1)];

    postData(JSON.stringify({
      veiculoId: veiculoId.id,
      servicoIds: [servicoId.id],
      dataInicio: new Date(formattedDate),
    }));

    agendamento = new Date(agendamento).valueOf() + horasEntreServicos * 60 * 60 * 1000;

    i -= 1;
  }, 500);
}

main().catch((error) => {
  console.error(error);
});
