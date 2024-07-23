import { Router } from 'express';

import ServicoFactory from '../../../utils/factory';

const router = Router();
const servicoController = ServicoFactory.createServicoController();

router.post('/', (req, res) => servicoController.create(req, res));
router.get('/all', (req, res) => servicoController.all(res));

export default router;
