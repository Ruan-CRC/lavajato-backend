import { Router } from 'express';

import usersRouters from '@/modules/users/infra/http/routers/usersRouters';
import veiculoRouter from '@/modules/veiculos/infra/http/routers/veiculoRouters';
import servicosRouter from '@/modules/servicos/infra/http/routers/servicosRouters';
import agendaRouters from '@/modules/agenda/infra/http/routers/agendaRouters';

const handlerRouters = Router();

handlerRouters.use('/api/v1/user', usersRouters);
handlerRouters.use('/api/v1/agenda', agendaRouters);
handlerRouters.use('/api/v1/veiculo', veiculoRouter);
handlerRouters.use('/api/v1/servico', servicosRouter);

export default handlerRouters;
