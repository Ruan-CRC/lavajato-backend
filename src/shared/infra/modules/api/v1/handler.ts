import { Router } from 'express';

import usersRouter from '@/modules/users/infra/http/routers/users.routers';
import veiculoRouter from '@/modules/veiculos/infra/http/routers/veiculoRouters';
import servicosRouter from '@/modules/servicos/infra/http/routers/servicosRouters';
import agendaRouter from '@/modules/agenda/infra/http/routers/agendaRouter';

const router = Router();

router.use('/api/v1/user', usersRouter);
router.use('/api/v1/veiculo', veiculoRouter);
router.use('/api/v1/servico', servicosRouter);
router.use('/api/v1/agenda', agendaRouter);

export default router;
