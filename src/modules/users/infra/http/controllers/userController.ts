import { Request, Response } from 'express';
import { z } from 'zod';
import CreateUserService from '../../../services/createUser/createUserService';
import UsersRepository from '../../repositories/userRepositorie';
import safeParseSchemaModel from '@/shared/infra/helpers/parserZod';

const repo = new UsersRepository();

export default class UserController {
  constructor(
    private createUserService: CreateUserService,
  ) { }

  async create(req: Request, res: Response) {
    const isValidRequest = safeParseSchemaModel(z.object({
      email: z.string().email(),
      password: z.string().min(6),
      veiculos: z.array(z.object({
        placa: z.string().min(6),
        tipo: z.number().int(),
      })),
    }), req.body);

    if (!isValidRequest) {
      return res.status(400).json({ error: isValidRequest });
    }

    const { email, password, veiculos } = req.body;

    const userExistent = await repo.findByEmail(email);
    if (userExistent) {
      return 'Email address already used!';
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
