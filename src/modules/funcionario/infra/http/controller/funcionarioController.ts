import { Request, Response } from 'express';
import { decorators } from 'tsyringe';
import { z } from 'zod';
import { createFuncionarioService } from '../../../utils/factory';
import validaDataWhitSchemaZod from '@/shared/infra/helpers/parserZod';

const { injectable } = decorators;

@injectable()
class FuncionarioController {
  async funcionarios(request: Request, response: Response) {
    validaDataWhitSchemaZod(z.object({
      cpf: z.string(),
      email: z.string().email().nullable(),
      password: z.string(),
      telefone: z.string().nullable(),
      endereco: z.string().nullable(),
      funcaoId: z.number(),
    }), request.body);

    await createFuncionarioService.main(request.body);

    return response.status(201).json({ message: 'Funcionário criado com sucesso!' });
  }
}

export default FuncionarioController;
