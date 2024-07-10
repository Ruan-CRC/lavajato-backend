import { Request, Response } from 'express';
import { z } from 'zod';
import CreateUserService from '../../../services/createUserService';
import safeParseSchemaModel from '@/shared/infra/helpers/parserZod';

export default class UserController {
  constructor(private createUserService: CreateUserService) { }

  async create(req: Request, res: Response) {
    const isValidRequest = safeParseSchemaModel(z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    }), req.body);

    if (!isValidRequest) {
      return res.status(400).json({ error: isValidRequest });
    }

    const { name, email, password } = req.body;

    const user = await this.createUserService.create({
      name,
      email,
      password,
    });

    return res.json({ user });
  }
}
