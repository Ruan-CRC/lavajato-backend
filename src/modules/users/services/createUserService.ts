import bcryptjs from 'bcryptjs';
import { CreateUserInterface } from '../interfaces/createUserInterface';

interface RequestUser {
  name: string;
  email: string;
  password: string;
  telefone?: string
  endereco?: string
}

export default class CreateUserService {
  constructor(private usersRepository: CreateUserInterface) {}

  async create({ name, email, password }: RequestUser) {
    /*
    const userExistent = await this.usersRepository.findByEmail(email);

    if (userExistent) {
      throw new Error('Email address already used.');
    }
    */

    const hashedPassword = await new Promise<string>((resolve, reject) => {
      bcryptjs.genSalt(6, (err: any, salt: any) => {
        bcryptjs.hash(password, salt, (_err: any, hash: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      });
    });

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: user.idUser,
      name: user.name,
      email: user.email,
      telefone: user.telefone ?? undefined,
      endereco: user.endereco ?? undefined,
    };
  }
}
