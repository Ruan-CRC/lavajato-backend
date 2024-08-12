import { Router } from 'express';

import ServicoFactory from '../../../utils/factory';

const servicosRouter = Router();
const servicoController = ServicoFactory.createServicoController();

servicosRouter.post('/', (req, res) => servicoController.create(req, res));
servicosRouter.get('/all', (req, res) => servicoController.all(res));

export default servicosRouter;
