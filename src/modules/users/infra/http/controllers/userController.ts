import { Request, Response } from 'express';
import { z } from 'zod';
import CreateUserService from '../../../services/createUser/createUserService';
import { CreateUserInterface } from '../../../interfaces/createUserInterface';
import safeParseSchemaModel from '@/shared/infra/helpers/parserZod';

export default class UserController {
  constructor(
    private createUserService: CreateUserService,
    private usersRepository: CreateUserInterface,
  ) { }

  async create(req: Request, res: Response) {
    const isValidRequest = safeParseSchemaModel(z.object({
      email: z.string().email(),
      password: z.string().min(6),
      veiculo: z.array(z.object({
        placa: z.string().min(6),
        tipo: z.number().int(),
      })),
    }), req.body);

    if (!isValidRequest) {
      return res.status(400).json({ error: isValidRequest });
    }

    const { email, password, veiculo } = req.body;

    const userExistent = await this.usersRepository.findByEmail(email);
    if (userExistent) {
      return 'Email address already used!';
    }

    const user = await this.createUserService.create({
      email,
      password,
      veiculo,
    });

    return res.json({ user });
  }
}
