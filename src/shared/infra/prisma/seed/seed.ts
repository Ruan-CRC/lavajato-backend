import { createSeedClient } from '@snaplet/seed';
import { PrismaClient } from '@prisma/client';

import { WebSocket } from 'ws';

const prisma = new PrismaClient();

async function associateServiceToVehicle(ws: WebSocket) {
  try {
    const veiculos = await prisma.veiculo.findMany({ take: 4 });
    const servicos = await prisma.servico.findMany();

    veiculos.forEach(async (veiculo, index) => {
      const randomServico = servicos[Math.floor(Math.random() * servicos.length)];
      const agendamento = new Date();
      agendamento.setHours(agendamento.getHours() + (index * 4));

      const payload = await prisma.veiculoServico.create({
        data: {
          veiculoId: veiculo.id,
          servicoId: randomServico.id,
          dataInicio: agendamento,
        },
      });

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(payload));
      } else {
        ws.on('open', () => {
          ws.send(JSON.stringify(payload));
        });
      }
    });
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

  setInterval(async () => {
    await associateServiceToVehicle(ws);
  }, 10000);
}

export default main;
