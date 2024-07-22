import bcryptjs from 'bcryptjs';
import CreateUserService from './createUserService';
import { CreateUserInterface } from '../../interfaces/createUserInterface';

jest.mock('bcryptjs');

describe('CreateUserService', () => {
  let createUserService: CreateUserService;
  let mockUsersRepository: jest.Mocked<CreateUserInterface>;

  beforeEach(() => {
    mockUsersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };
    createUserService = new CreateUserService(mockUsersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um novo usuário com sucesso', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const hashedPassword = 'hashedpassword123';
    (bcryptjs.genSalt as jest.Mock).mockImplementation((rounds, callback) => {
      callback(null, 'salt');
    });
    (bcryptjs.hash as jest.Mock).mockImplementation((password, salt, callback) => {
      callback(null, hashedPassword);
    });

    mockUsersRepository.create.mockResolvedValue({
      id: '1',
      idUser: 'sdgdfgadfheyerywreyf',
      name: userData.name,
      email: userData.email,
      telefone: undefined,
      endereco: undefined,
    });

    const result = await createUserService.create(userData);

    expect(result).toEqual({
      id: 'sdgdfgadfheyerywreyf',
      name: userData.name,
      email: userData.email,
      telefone: undefined,
      endereco: undefined,
    });
    expect(mockUsersRepository.create).toHaveBeenCalledWith({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });
  });

  it('deve lançar um erro se o email já estiver em uso', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    mockUsersRepository.findByEmail.mockResolvedValue({
      id: '1',
      idUser: 'sdasdasd',
      name: userData.name,
      email: userData.email,
      telefone: undefined,
      endereco: undefined,
    });

    await expect(createUserService.create(userData)).rejects.toThrow('Email address already used.');
  });

  it('deve lançar um erro se o hashing da senha falhar', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    (bcryptjs.genSalt as jest.Mock).mockImplementation((rounds, callback) => {
      callback(new Error('Salt generation failed'), null);
    });

    await expect(createUserService.create(userData)).rejects.toThrow('Salt generation failed');
  });
});
