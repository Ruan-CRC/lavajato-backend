import { createSeedClient } from '@snaplet/seed';
import dayjs from 'dayjs';
import * as http from 'node:http';
import prisma from '../prisma';

const horasEntreServicos = 2;

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      // console.log('Resposta do backend:', responseData);
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

  const veiclos = await prisma.veiculo.findMany();
  const servcos = await prisma.servico.findMany();
  await seed.servicoMetadados((x) => x(12));

  let agendamento: Date | number = new Date();
  let i = 250;

  const intervalId = setInterval(async () => {
    if (i === 0) {
      clearInterval(intervalId);
      return;
    }

    const date = new Date(agendamento);
    const formattedDate = dayjs(date).toISOString();

    const veiculoId = veiclos[getRandomIntInRange(0, veiclos.length - 1)];
    const servicoId = servcos[getRandomIntInRange(0, servcos.length - 1)];

    postData(JSON.stringify({
      veiculoId: veiculoId.id,
      servicoIds: [servicoId.id],
      dataInicio: new Date(formattedDate),
    }));

    agendamento = new Date(agendamento).valueOf() + horasEntreServicos * 60 * 60 * 1000;

    i -= 1;
  }, 500);
}
