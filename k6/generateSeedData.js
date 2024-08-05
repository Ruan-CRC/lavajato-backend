// eslint-disable-next-line import/no-unresolved
import { createSeedClient } from '@snaplet/seed';
// eslint-disable-next-line import/no-extraneous-dependencies
import { copycat } from '@snaplet/copycat';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';
import fs from 'fs/promises';

const horasEntreServicos = 2;
const veiculosInMemory = [];
const servicosInMemory = [];

function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
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

  let agendamento = new Date();
  const agendamentos = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 250; i++) {
    const date = new Date(agendamento);
    const formattedDate = dayjs(date).toISOString();

    const veiculoId = veiculosInMemory[getRandomIntInRange(0, veiculosInMemory.length - 1)];
    const servicoId = servicosInMemory[getRandomIntInRange(0, servicosInMemory.length - 1)];

    agendamentos.push({
      veiculoId: veiculoId.id,
      servicoIds: [servicoId.id],
      dataInicio: new Date(formattedDate),
    });

    agendamento = new Date(agendamento).valueOf() + horasEntreServicos * 60 * 60 * 1000;
  }

  await fs.writeFile('seedData.json', JSON.stringify(agendamentos, null, 2));
}

main().catch((error) => {
  console.error(error);
});
