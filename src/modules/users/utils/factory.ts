import UserController from '../infra/http/controllers/userController';
import CreateUserService from '../services/createUser/createUserService';
import UsersRepository from '@/modules/users/infra/repositories/userRepositorie';

export default class UserFactory {
  static createUserRepository(): UsersRepository {
    return new UsersRepository();
  }

  static createUserService(): CreateUserService {
    return new CreateUserService(this.createUserRepository());
  }

  static createUserController(): UserController {
    return new UserController(this.createUserService());
  }
}
