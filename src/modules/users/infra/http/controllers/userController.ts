import { Request, Response } from 'express';
import { z } from 'zod';
import CreateUserService from '../../../services/createUserService';

export default class UserController {
  constructor(private createUserService: CreateUserService) { }

  async create(req: Request, res: Response) {
    const schema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = req.body;
    const { error } = schema.safeParse({ name, email, password });
    if (error) {
      return res.status(400).json({ error: error.errors });
    }

    const user = await this.createUserService.create({
      name,
      email,
      password,
    });

    return res.json({ user });
  }
}
