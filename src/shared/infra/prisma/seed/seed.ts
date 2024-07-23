import { createSeedClient } from '@snaplet/seed';
// eslint-disable-next-line import/no-extraneous-dependencies
import { copycat } from '@snaplet/copycat';

import { randomUUID } from 'node:crypto';
import { PrismaClient } from '@prisma/client';

import { websocketInstance } from '@/shared/core/server';

const prisma = new PrismaClient();
const horasEntreServicos = 4;

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
  await seed.veiculo((x) => x(8));
  await seed.servico((x) => x(3));
  await seed.servicoMetadados((x) => x(12));
  await seed.agenda((x) => x(2));

  let agendamento: Date | number = new Date();
  let i = 25;

  const intervalId = setInterval(async () => {
    if (i === 0) {
      clearInterval(intervalId);
      return;
    }

    await seed.agenda((x) => x(1, {
      dataInicio: new Date(agendamento),
      dataFim: new Date(new Date(agendamento).valueOf() + 1 * 60 * 60 * 1000),
    }));

    agendamento = new Date(agendamento).valueOf() + horasEntreServicos * 60 * 60 * 1000;

    const payload = await prisma.agenda.findFirst({
      orderBy: {
        dataInicio: 'desc',
      },
    });

    const socketInstance = websocketInstance.socket;

    socketInstance.emit('agenda:create', payload);

    i -= 1;
  }, 5000);

  await prisma.$disconnect();
}
