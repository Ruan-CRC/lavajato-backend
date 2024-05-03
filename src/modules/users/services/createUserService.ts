import { CreateUserInterface } from '../repositoriesInterface/createUserInterface';

const bcryptjs = require('bcryptjs');

interface RequestUser {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  constructor(private usersRepository: CreateUserInterface) {}

  async create({ name, email, password }: RequestUser) {
    const userExistent = await this.usersRepository.findByEmail(email);

    if (userExistent) {
      throw new Error('Email address already used.');
    }

    const hashedPassword = bcryptjs.genSalt(6, (err: any, salt: any) => {
      bcryptjs.hash(password, salt, (_err: any, hash: any) => hash);
    });

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return { user };
  }
}
