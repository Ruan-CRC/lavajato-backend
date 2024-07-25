import { Request, Response } from 'express';
import { z } from 'zod';
import CreateUserService from '../../../services/createUser/createUserService';
import UsersRepository from '../../repositories/userRepositorie';
import validaDataWhitSchemaZod from '@/shared/infra/helpers/parserZod';
import { NotFoundError } from '@/shared/infra/middlewares/errorAbst';

const repo = new UsersRepository();

export default class UserController {
  constructor(
    private createUserService: CreateUserService,
  ) { }

  async create(req: Request, res: Response) {
    validaDataWhitSchemaZod(z.object({
      email: z.string().email(),
      password: z.string().min(6),
      veiculos: z.array(z.object({
        placa: z.string().min(7).max(7),
        tipo: z.number().int(),
      })),
    }), req.body);

    const { email, password, veiculos } = req.body;

    const userExistent = await repo.findByEmail(email);

    if (userExistent) {
      throw new NotFoundError({
        errors: [{
          title: 'user_already_exists',
          detail: `Usuário já cadastrado: ${email}`,
          instance: req.baseUrl,
        }],
      });
    }

    // TODO: verificar se o veiculo já está cadastrado

    const user = await this.createUserService.create({
      email,
      password,
      veiculos,
    });
    return res.json({ user });
  }
}
