import { Servico } from '@prisma/client';
import { ServicosWithMetadados, InputServicosWithMetadados } from '../services/createServicos/createServico';

export default interface ServicosInterface {
  create(data: InputServicosWithMetadados): Promise<ServicosWithMetadados>;
  all(): Promise<Servico[]>;
  getById(id: number[]): Promise<ServicosWithMetadados[] | null>;
}
