import bcryptjs from 'bcryptjs';
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
    if (props.veiculos.length === 0) {
      throw new Error('Pelo menos um veículo é necessário');
    }

    if (!props.email) {
      throw new Error('Email is required');
    }

    if (!props.password) {
      throw new Error('Password is required');
    }

    const hashedPassword = await new Promise<string>((resolve, reject) => {
      bcryptjs.genSalt(6, (err: any, salt: any) => {
        bcryptjs.hash(props.password, salt, (_err: any, hash: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      });
    });

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
