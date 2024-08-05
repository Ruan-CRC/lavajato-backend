import { createSeedClient } from "@snaplet/seed";

async function main() {
  console.log('Seed started');
  try {
    const seed = await createSeedClient();
    await seed.$resetDatabase();

    const la = await seed.servico((x) => x(3));

    console.log(la)
  }catch (error) {
    console.log(error);
  }
}

main();
process.exit(0);