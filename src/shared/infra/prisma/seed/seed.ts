import { createSeedClient } from '@snaplet/seed';
import { PrismaClient } from '@prisma/client';

import { WebSocket } from 'ws';

const prisma = new PrismaClient();

const horasEntreServicos = 4;

async function associateServiceToVehicle(ws: WebSocket, data: Date = new Date()) {
  try {
    const veiculos = await prisma.veiculo.findMany();
    const servicos = await prisma.servico.findMany();

    const randomServico = servicos[Math.floor(Math.random() * servicos.length)];
    const randomVeiculo = veiculos[Math.floor(Math.random() * veiculos.length)];

    const payload = await prisma.agenda.create({
      data: {
        veiculoId: randomVeiculo.id,
        servicoId: randomServico.id,
        dataInicio: data,
      },
    });

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload));
    } else {
      ws.on('open', () => {
        ws.send(JSON.stringify(payload));
      });
    }
  } catch (error) {
    console.error('Error associating service to vehicles:', error);
  }
}

async function main(ws: WebSocket) {
  const seed = await createSeedClient();
  await seed.$resetDatabase();

  await seed.user((x) => x(10));
  await seed.veiculo((x) => x(10));
  await seed.servico((x) => x(5));

  let agendamento: Date | number = new Date();

  let i = 25;

  const intervalId = setInterval(async () => {
    if (i === 0) {
      clearInterval(intervalId);
      return;
    }

    await associateServiceToVehicle(ws, new Date(agendamento));
    agendamento = new Date(agendamento).valueOf() + horasEntreServicos * 60 * 60 * 1000;

    i -= 1;
  }, 10000);
}

export default main;
