import { createSeedClient } from '@snaplet/seed';
// eslint-disable-next-line import/no-extraneous-dependencies
import { copycat } from '@snaplet/copycat';
import { randomUUID } from 'node:crypto';

export default async function main() {
  const seed = await createSeedClient({
    connect: true,
  });

  await seed.$resetDatabase();

  await seed.tipoVeiculo((x) => x(2));
  await seed.user((x) => x(3, (ctx) => ({
    idUser: randomUUID(),
    email: copycat.email(ctx.seed, {
      domain: '@gmail.com',
    }),
    password: '123456',
  })));
  await seed.veiculo((x) => x(5));
  await seed.servico((x) => x(3));
  await seed.servicoMetadados((x) => x(12));
}

main();
