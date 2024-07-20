import { UUID } from 'node:crypto';
import prisma from '../../../../shared/infra/prisma/prisma';
import { CreateUserInterface, UserOutputDTO, InputCreate } from '../../interfaces/createUserInterface';
import { OutputCreateUser } from '../../services/createUser/create';

export default class UsersRepository implements CreateUserInterface {
  async create(data: InputCreate): Promise<OutputCreateUser> {
    const user = await prisma.user.create({
      data: {
        idUser: data.id,
        email: data.email,
        password: data.password,
        telefone: data.telefone,
        endereco: data.endereco,
        veiculos: {
          create: {
            placa: data.veiculos[0].placa,
            tipoVeiculoId: data.veiculos[0].tipo,
          },
        },
      },
    });

    const veiculos = await prisma.veiculo.findMany({
      where: {
        userId: user.id,
      },
    });

    return {
      id: user.idUser as UUID,
      email: user.email,
      telefone: user.telefone ?? undefined,
      endereco: user.endereco ?? undefined,
      veiculos: veiculos.map((veiculo) => ({
        placa: veiculo.placa,
        tipo: veiculo.tipoVeiculoId,
      })),
    };
  }

  async findByEmail(email: string): Promise<UserOutputDTO | boolean> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return false;
    }

    return {
      id: user.id.toString(),
      idUser: user.idUser,
      email: user.email,
      telefone: user.telefone ?? undefined,
      endereco: user.endereco ?? undefined,
    };
  }
}
