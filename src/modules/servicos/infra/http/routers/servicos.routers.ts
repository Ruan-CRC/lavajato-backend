import { Router } from 'express';

import ServicoFactory from '../../../utils/factory';

const router = Router();
const servicoController = ServicoFactory.createServicoController();

router.post('/create', (req, res) => servicoController.create(req, res));

export default router;
