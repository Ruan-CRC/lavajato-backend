import { createSeedClient } from '@snaplet/seed';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const seed: any = createSeedClient();

  // Reset the database
  await seed.$resetDatabase();

  // Seed users, vehicles, and services
  await seed.user((x: (arg0: number) => any) => x(10));
  await seed.veiculo((x: (arg0: number) => any) => x(10));
  await seed.servico((x: (arg0: number) => any) => x(5));

  console.log('Database seeded successfully!');

  // Function to associate services to vehicles
  const associateServiceToVehicle = async () => {
    try {
      const veiculos = await prisma.veiculo.findMany();
      const servicos = await prisma.servico.findMany();

      veiculos.forEach(async (veiculo) => {
        const randomServico = servicos[Math.floor(Math.random() * servicos.length)];
        await prisma.veiculoServico.create({
          data: {
            veiculoId: veiculo.id,
            servicoId: randomServico.id,
            dataInicio: new Date().setHours(2).toString(),
          },
        });
      });

      console.log('Service associated to vehicles successfully!');
    } catch (error) {
      console.error('Error associating service to vehicles:', error);
    }
  };

  // Run the association function every 2 minutes
  setInterval(associateServiceToVehicle, 60000);
};

main();
