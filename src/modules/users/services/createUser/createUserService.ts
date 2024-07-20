import { CreateUserInterface } from '../../interfaces/createUserInterface';
import { InputCreateUser, OutputCreateUser } from './create.d';
import User from '../../entities/user';

export default class CreateUserService {
  constructor(private usersRepository: CreateUserInterface) { }

  async create({ email, password, veiculos }: InputCreateUser): Promise<OutputCreateUser> {
    const userEntite = new User({
      email,
      password,
      veiculos,
    });

    const user = await this.usersRepository.create(userEntite.getEntity());

    return {
      id: user.id,
      email: user.email,
      telefone: user.telefone ?? undefined,
      endereco: user.endereco ?? undefined,
      veiculos: user.veiculos,
    };
  }
}
