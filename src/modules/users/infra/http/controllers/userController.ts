import { Request, Response } from 'express';
import CreateUserService from '../../../services/createUserService';

export default class UserController {
  constructor(private createUserService: CreateUserService) {}

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = await this.createUserService.create({
      name,
      email,
      password,
    });

    return res.json(user);
  }
}
