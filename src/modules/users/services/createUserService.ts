import bcryptjs from 'bcryptjs';
import { CreateUserInterface } from '../interfaces/createUserInterface';

interface RequestUser {
  name: string;
  email: string;
  password: string;
}

interface CreateOutputUserDTO {
  id: number
  name: string
  email: string
  telefone?: string
  endereco?: string
}

export default class CreateUserService {
  constructor(private usersRepository: CreateUserInterface) {}

  async create({ name, email, password }: RequestUser): Promise<CreateOutputUserDTO> {
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

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: (await user).id,
      name: (await user).name,
      email: (await user).email,
      telefone: (await user).telefone ?? undefined,
      endereco: (await user).endereco ?? undefined,
    };
  }
}
