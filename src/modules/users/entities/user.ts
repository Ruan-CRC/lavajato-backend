import bcrypt from 'bcryptjs';
import { UUID, randomUUID } from 'node:crypto';
import { UserCreateInput, UserCreateOutput } from './user.d';

class User {
  private id: UUID;

  private props: UserCreateInput;

  constructor(props: UserCreateInput) {
    this.id = randomUUID();
    this.props = props;

    this.validateAndInitialize(props);
  }

  private async validateAndInitialize(props: UserCreateInput): Promise<void> {
    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(props.password, salt);

    this.props = {
      ...props,
      password: hashedPassword,
    };
  }

  getEntity(): UserCreateOutput {
    return {
      id: this.id,
      email: this.props.email,
      password: this.props.password,
      telefone: this.props.telefone,
      endereco: this.props.endereco,
      veiculos: this.props.veiculos,
    };
  }
}

export default User;
