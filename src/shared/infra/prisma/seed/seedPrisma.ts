import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const placas = ['XYZ1234', 'ABC5678'];

async function main() {
  await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      password: 'password',
    },
  });
  await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      password: 'password',
    },
  });
  await prisma.veiculo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      placa: placas[0],
      tipo: 'carro',
      user: {
        connect: { email: 'bob@prisma.io' },
      },
    },
  });
  await prisma.veiculo.upsert({
    where: { id: 2 },
    update: {},
    create: {
      placa: placas[1],
      tipo: 'moto',
      user: {
        connect: { email: 'alice@prisma.io' },
      },
    },
  });

  const veiculos = await prisma.veiculo.findMany({
    where: {
      placa: {
        in: placas,
      },
    },
    select: {
      id: true,
      placa: true,
    },
  });

  if (veiculos.length !== placas.length) {
    throw new Error('Nem todos os veículos foram encontrados');
  }

  // Passo 2: Fazer o upsert do serviço e conectar ao veículo usando o id obtido
  await prisma.servico.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      nome: 'Troca de óleo',
      descricao: 'Troca de óleo do motor',
      valor: 100,
      veiculos: {
        create: {
          veiculoId: veiculos[0].id,
          dataInicio: new Date(),
        },
      },
    },
  });
  await prisma.servico.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      nome: 'Lavagem completa',
      descricao: 'Lava a lataria e o motor do veículo',
      valor: 150,
      veiculos: {
        create: {
          veiculoId: veiculos[1].id,
          dataInicio: new Date(),
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
