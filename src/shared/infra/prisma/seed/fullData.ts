import { createSeedClient } from '@snaplet/seed';

async function main() {
  const seed = await createSeedClient();
  await seed.$resetDatabase();

  await seed.user((x) => x(2));
  await seed.tipoVeiculo((x) => x(3));
  await seed.veiculo((x) => x(3));
  await seed.servico((x) => x(3));
  await seed.servicoValor((x) => x(6));
  await seed.agenda((x) => x(3));
}

main();
